import { getToken, parseAzureUserToken } from '@navikt/oasis';
import { NextFunction, Request, Response } from 'express';

export const addUserInfoToRequest = async (request: Request, response: Response, next: NextFunction) => {
    const token = getToken(request);

    if (token) {
        const parse = parseAzureUserToken(token);
        if (parse.ok) {
            console.log(`Bruker: ${parse.preferred_username} (${parse.NAVident})`);
            // Legg til preferred_username og NAVident i headeren
            request.headers['X-Preferred-Username'] = parse.preferred_username;
            request.headers['X-NAVident'] = parse.NAVident;
        } else {
            console.error('Failed to parse Azure user token', parse.error);
        }
    }

    return next();
};
