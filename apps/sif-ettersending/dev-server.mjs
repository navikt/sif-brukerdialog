import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import mustacheExpress from 'mustache-express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import dotenv from 'dotenv';
import fs from 'fs';
import { getAppSettings } from './dev/AppSettings.mjs';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
server.disable('x-powered-by');
server.use(compression());
server.use(express.json());

server.set('views', __dirname);
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

const injectDecorator = (filePath) =>
    injectDecoratorServerSide({
        env: 'dev',
        filePath,
        params: { simple: true },
    });

const startServer = async () => {
    server.get('/health/isAlive', (_, res) => res.sendStatus(200));
    server.get('/health/isReady', (_, res) => res.sendStatus(200));

    const indexHtmlPath = path.resolve(__dirname, 'index.html');
    const htmlWithDecorator = await injectDecorator(indexHtmlPath);

    const APP_SETTINGS = {
        APP_VERSION: `${process.env.APP_VERSION}`,
        PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
        ...getAppSettings(),
    };

    const renderedHtml = htmlWithDecorator.replaceAll('{{{APP_SETTINGS}}}', JSON.stringify(APP_SETTINGS));
    fs.writeFileSync(path.resolve(__dirname, 'index-decorated.html'), renderedHtml);

    const proxy = createProxyMiddleware({
        target: 'http://localhost:8089/',
        changeOrigin: true,
        logger: console,
        on: { proxyReq: fixRequestBody },
    });

    server.use(`${process.env.PUBLIC_PATH}/api/k9-brukerdialog`, proxy);
    server.use(`${process.env.PUBLIC_PATH}/api/k9-sak-innsyn`, proxy);

    const vite = await createViteServer({
        root: __dirname,
        server: {
            middlewareMode: true,
            port: 8080,
            open: './index-decorated.html',
        },
        logLevel: 'silent',
    });

    server.get(/^\/(?!.*dist).*$/, (req, res, next) => {
        const fullPath = path.resolve(__dirname, decodeURIComponent(req.path.substring(1)));
        const insideRoot = fullPath.startsWith(__dirname);
        const fileExists = fs.existsSync(fullPath);

        if (!insideRoot || (!fileExists && !req.url.startsWith('/@')) || req.url === '/') {
            req.url = '/index-decorated.html';
        }
        next();
    });

    server.use(vite.middlewares);

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`✅ App listening on http://localhost:${port}`);
    });
};

startServer();
