import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import { Express } from 'express';
import path from 'node:path';
import { z } from 'zod';
import { appEnvSchema } from '../env.schema.js';
import config from './serverConfig.js';

/** Reads the NAIS pod-runtime env vars and returns HTML meta tags for @nais/apm browser config resolution. */
function naisMetaTags(): string {
    const naisEnv = (name: string): string | undefined => {
        const val = process.env[name];
        return val === '' || val === undefined ? undefined : val;
    };
    const tags: Array<{ name: string; content: string }> = [];
    const app = naisEnv('NAIS_APP_NAME');
    const namespace = naisEnv('NAIS_TEAM') ?? naisEnv('NAIS_NAMESPACE');
    const environment = naisEnv('NAIS_CLUSTER_NAME');
    const telemetryUrl = naisEnv('NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL');
    if (app) tags.push({ name: 'nais-app', content: app });
    if (namespace) tags.push({ name: 'nais-team', content: namespace });
    if (environment) tags.push({ name: 'nais-cluster', content: environment });
    if (telemetryUrl) tags.push({ name: 'nais-telemetry-url', content: telemetryUrl });
    return tags.map(({ name, content }) => `    <meta name="${name}" content="${content}">`).join('\n');
}

export const setupAndServeHtml = async (app: Express) => {
    // When deployed, the built frontend is copied into the public directory. If running BFF locally the index.html will not exist.
    const spaFilePath = path.resolve('./public', 'index.html');

    const html = await injectDecorator(spaFilePath, config.app.fullDekorator);

    const envs = appEnvSchema.safeParse({
        ENV: `${config.app.env}`,
        APP_VERSION: `${config.app.version}`,
        PUBLIC_PATH: `${config.app.publicPath}`,
        GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
        ...config.app.proxyEnvVariables,
        ...config.app.publicEnvVariables,
    });

    if (!envs.success) {
        console.error('Invalid environment variables:', z.treeifyError(envs.error));
        process.exit(1); // Exit the server if validation fails
    }

    const renderedHtml = html
        .replaceAll('{{{APP_SETTINGS}}}', JSON.stringify(envs.data))
        .replace('</head>', `${naisMetaTags()}\n</head>`);

    app.get(/^\/(?!.*dist).*$/, async (_request, response) => {
        response.send(renderedHtml);
    });
};

async function injectDecorator(filePath: string, fullDecorator: boolean = false) {
    return injectDecoratorServerSide({
        env: config.app.env,
        filePath,
        params: {
            simple: fullDecorator === false,
        },
    });
}
