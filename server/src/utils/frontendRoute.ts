import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import { Router } from 'express';
import path from 'node:path';
import { appEnvSchema } from '../env.schema.js';
import config from './serverConfig.js';

export const setupAndServeHtml = async (router: Router) => {
    // When deployed, the built frontend is copied into the public directory. If running BFF locally the index.html will not exist.
    const spaFilePath = path.resolve('./public', 'index.html');

    /** Legg dekoratøren til i index.html */
    const html = await injectDecoratorServerSide({
        env: config.app.env,
        filePath: spaFilePath,
        params: {
            simple: config.app.fullDekorator === false,
        },
    });

    /** Hent ut envs som skal inn i APP_SETTINGS */
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

    router.get('*', async (_, response) => {
        response.send(renderedHtml);
    });
};
