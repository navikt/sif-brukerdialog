import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import cookieParser from 'cookie-parser';
import { Express, Response } from 'express';
import path from 'node:path';
import { appEnvSchema } from '../env.schema.js';
import config from './serverConfig.js';
import fs from 'fs';

export const setupAndServeHtml = async (app: Express) => {
    // When deployed, the built frontend is copied into the public directory. If running BFF locally the index.html will not exist.
    const spaFilePath = path.resolve('./public', 'index.html');

    // Only add vite-mode to dev environment
    if (config.app.env === 'dev') {
        addLocalViteServerHandlerWithDecorator(app);
    }

    const html = config.app.skipDecorator ? fs.readFileSync(spaFilePath, 'utf-8') : await injectDecorator(spaFilePath);

    const envs = appEnvSchema.safeParse({
        ENV: `${config.app.env}`,
        APP_VERSION: `${config.app.version}`,
        PUBLIC_PATH: `${config.app.publicPath}`,
        GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
        ...config.app.proxyEnvVariables,
        ...config.app.publicEnvVariables,
    });

    if (!envs.success) {
        console.error('Invalid environment variables:', envs.error.format());
        process.exit(1); // Exit the server if validation fails
    }

    const renderedHtml = html.replaceAll('{{{APP_SETTINGS}}}', JSON.stringify(envs.data));

    app.get(/^\/(?!.*dist).*$/, async (_request, response) => {
        return response.send(renderedHtml);
    });
};

async function injectDecorator(filePath: string) {
    return injectDecoratorServerSide({
        env: config.app.env,
        filePath,
        params: {
            simple: true,
        },
    });
}

function addLocalViteServerHandlerWithDecorator(app: Express) {
    const viteDevelopmentServerPath = path.resolve('.', 'vite-dev-server.html');

    app.use(cookieParser());
    app.get('/vite-on', (_, response) => {
        setViteCookie(response, true);
        return response.redirect('/');
    });
    app.get('/vite-off', (_, response) => {
        setViteCookie(response, false);
        return response.redirect('/');
    });
    app.get('*', async (request, response, next) => {
        const localViteServerIsEnabled = request.cookies['use-local-vite-server'] === 'true';
        if (localViteServerIsEnabled) {
            const html = await injectDecorator(viteDevelopmentServerPath);

            return response.send(html);
        }
        return next();
    });
}

function setViteCookie(response: Response, cookieValue: boolean) {
    response.cookie('use-local-vite-server', cookieValue, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
    });
}
