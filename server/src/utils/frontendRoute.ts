import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import cookieParser from 'cookie-parser';
import { Express, Response } from 'express';
import path from 'node:path';
import config, { getPublicEnvVariables } from './serverConfig.js';

export const setupAndServeHtml = async (app: Express) => {
    // When deployed, the built frontend is copied into the public directory. If running BFF locally the index.html will not exist.
    const spaFilePath = path.resolve('./public', 'index.html');

    // Only add vite-mode to dev environment
    if (config.app.env === 'dev') {
        addLocalViteServerHandlerWithDecorator(app);
    }

    const html = await injectDecorator(spaFilePath);

    const renderedHtml = html.replaceAll(
        '{{{APP_SETTINGS}}}',
        JSON.stringify({
            ENV: `${config.app.env}`,
            APP_VERSION: `${config.app.version}`,
            PUBLIC_PATH: `${config.app.publicPath}`,
            GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
            K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,
            K9_BRUKERDIALOG_PROSESSERING_API_URL: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL}`,
            K9_SAK_INNSYN_FRONTEND_PATH: `${process.env.K9_SAK_INNSYN_FRONTEND_PATH}`,
            SIF_INNSYN_FRONTEND_PATH: `${process.env.SIF_INNSYN_FRONTEND_PATH}`,
            UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: `${process.env.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH}`,
            ...getPublicEnvVariables(),
        }),
    );

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
            enforceLogin: false,
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
