import type { NextApiRequest, NextApiResponse } from 'next';
import {
    createDemoRequestContext,
    createRequestContext,
    withAuthenticatedApi,
} from '../../../../auth/withAuthentication';
import { isLocal } from '../../../../utils/env';
import { fetchDocumentStream } from '../../../../server/fetchDocumentStream';

export async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { query } = req;
    const søknadId = query.id as string;
    const organisasjonsnummer = query.organisasjonsnummer as string;

    if (!søknadId) {
        throw Error('SøknadId mangler');
    }
    if (!organisasjonsnummer) {
        throw Error('Organisasjonsnummer mangler');
    }

    try {
        const context = !isLocal
            ? createRequestContext(req.headers['x-request-id'] as string | undefined, req.headers['authorization'])
            : createDemoRequestContext(req);

        if (!context || context === null) {
            res.status(401).json({ error: 'Access denied - context is undefined' });
            return;
        }

        const data = await fetchDocumentStream(
            `soknad/${søknadId}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`,
            context,
            'sif-innsyn-api',
        );
        // const date = dateFormatter.compact(new Date());
        // res.setHeader(
        //     'content-disposition',
        //     `attachment; filename="Informasjonsbrev til arbeidsgiver ${organisasjonsnummer} (${date}).pdf"`,
        // );
        data.pipe(res);
    } catch (err) {
        res.status(500).json({ error: 'Kunne ikke hente arbeidsgivermelding', err });
    }
}

export default withAuthenticatedApi(handler);
