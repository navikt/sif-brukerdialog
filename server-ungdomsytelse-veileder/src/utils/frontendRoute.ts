import { Express } from 'express';
import path from 'node:path';
import fs from 'fs';
import { getToken, parseAzureUserToken } from '@navikt/oasis';
import { appEnvSchema } from '../env.schema.js';
import serverConfig from './serverConfig.js';
import logger from './log.js';

export const setupAndServeHtml = async (app: Express) => {
    // When deployed, the built frontend is copied into the public directory. If running BFF locally the index.html will not exist.
    const spaFilePath = path.resolve('./public', 'index.html');

    const html = fs.readFileSync(spaFilePath, 'utf-8');

    const envs = appEnvSchema.safeParse({
        ENV: `${serverConfig.app.env}`,
        APP_VERSION: `${serverConfig.app.version}`,
        PUBLIC_PATH: `${serverConfig.app.publicPath}`,
        GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
        ...serverConfig.app.proxyEnvVariables,
        ...serverConfig.app.publicEnvVariables,
    });

    if (!envs.success) {
        logger.error('Invalid environment variables:', envs.error.format());
        process.exit(1); // Exit the server if validation fails
    }

    const renderedHtml = html.replaceAll('{{{APP_SETTINGS}}}', JSON.stringify(envs.data));

    app.get('/me', (request, response) => {
        const token = getToken(request);
        if (token) {
            const parse = parseAzureUserToken(token);
            if (parse.ok) {
                response.json({
                    name: parse.preferred_username,
                    NAVIdent: parse.NAVident,
                });
            } else {
                logger.error('Failed to parse Azure user token', parse.error);
            }
        }
        response.json({});
    });

    app.get(/^\/(?!.*dist).*$/, async (request, response) => {
        const token = getToken(request);
        let userInfo = {};
        if (token) {
            const parse = parseAzureUserToken(token);
            if (parse.ok) {
                userInfo = {
                    preferred_username: parse.preferred_username,
                    NAVident: parse.NAVident,
                };
            } else {
                logger.error('Failed to parse Azure user token', parse.error);
            }
        }
        const responseHtml = renderedHtml.replaceAll('{{{USER_INFO}}}', JSON.stringify(userInfo));
        response.send(responseHtml);
    });
};
