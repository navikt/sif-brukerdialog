import { Express } from 'express';
import path from 'node:path';
import fs from 'fs';
import { getToken, parseAzureUserToken } from '@navikt/oasis';

export const setupAndServeHtml = async (app: Express) => {
    // When deployed, the built frontend is copied into the public directory. If running BFF locally the index.html will not exist.
    const spaFilePath = path.resolve('./public', 'index.html');

    const html = fs.readFileSync(spaFilePath, 'utf-8');

    // const envs = appEnvSchema.safeParse({
    //     ENV: `${config.app.env}`,
    //     APP_VERSION: `${config.app.version}`,
    //     PUBLIC_PATH: `${config.app.publicPath}`,
    //     GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    //     ...config.app.proxyEnvVariables,
    //     ...config.app.publicEnvVariables,
    // });

    // if (!envs.success) {
    //     console.error('Invalid environment variables:', envs.error.format());
    //     process.exit(1); // Exit the server if validation fails
    // }

    // const renderedHtml = html.replaceAll('{{{APP_SETTINGS}}}', JSON.stringify(envs.data));

    const renderedHtml = html;

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
                console.error('Failed to parse Azure user token', parse.error);
            }
        }
        const renderedHtml = html.replace('{{{APP_SETTINGS}}}', JSON.stringify(userInfo));

        return response.send(renderedHtml);
    });
};
