import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import mustacheExpress from 'mustache-express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import dotenv from 'dotenv';
import fs from 'fs';
import getAppSettings from './mock/AppSettings.cjs'; // behold .cjs hvis den må være CJS
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
server.use(express.json());
server.disable('x-powered-by');
server.use(compression());

server.set('views', `${__dirname}`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'no-referrer');
    res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
    next();
});

async function injectDecorator(filePath) {
    return injectDecoratorServerSide({
        env: 'dev',
        filePath,
        params: {
            simple: true,
        },
    });
}

const startServer = async () => {
    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    const indexHtmlPath = path.resolve(__dirname, 'index.html');

    const htmlWithDecoratorInjected = await injectDecorator(indexHtmlPath);

    const renderedHtml = htmlWithDecoratorInjected.replaceAll(
        '{{{APP_SETTINGS}}}',
        JSON.stringify({
            APP_VERSION: process.env.APP_VERSION ?? '',
            PUBLIC_PATH: process.env.PUBLIC_PATH ?? '',
            ...getAppSettings(),
        }),
    );

    server.use(
        `${process.env.PUBLIC_PATH}/api/k9-brukerdialog`,
        createProxyMiddleware({
            target: 'http://localhost:8089/',
            changeOrigin: true,
            logger: console,
            on: {
                proxyReq: fixRequestBody,
            },
        }),
    );

    fs.writeFileSync(path.resolve(__dirname, 'index-decorated.html'), renderedHtml);

    const vite = await createViteServer({
        root: __dirname,
        server: {
            middlewareMode: true,
            port: 8080,
            open: './index-decorated.html',
        },
    });

    server.get(/^\/(?!.*dist).*$/, (req, res, next) => {
        const ROOT_DIR = path.resolve(__dirname);
        const fullPath = path.resolve(ROOT_DIR, decodeURIComponent(req.path.substring(1)));

        if (!fullPath.startsWith(ROOT_DIR)) {
            res.status(403).send('Forbidden');
            return;
        }

        const fileExists = fs.existsSync(fullPath);

        if ((!fileExists && !req.url.startsWith('/@')) || req.url === '/') {
            req.url = '/index-decorated.html';
        }
        next();
    });

    server.use(vite.middlewares);

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

startServer();
