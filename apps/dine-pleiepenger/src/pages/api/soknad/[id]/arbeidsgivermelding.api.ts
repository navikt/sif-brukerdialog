import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchDocumentStream } from '../../../../server/fetchers/fetchDocumentStream';
import { ApiServices } from '../../../../server/types/ApiServices';
import { getContextForApiHandler } from '../../../../utils/apiUtils';

export const config = {
    api: {
        responseLimit: false,
    },
};

export async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { query } = req;
    const søknadId = query.id as string;
    const organisasjonsnummer = query.organisasjonsnummer as string;

    if (!søknadId) {
        throw Error('SøknadId mangler i query');
    }
    if (!organisasjonsnummer) {
        throw Error('Organisasjonsnummer mangler i query');
    }

    try {
        const path = `soknad/${søknadId}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`;
        const stream = await fetchDocumentStream(path, getContextForApiHandler(req), ApiServices.sifInnsyn);

        res.setHeader('Content-Type', 'application/pdf');

        const dokumentTittel = `Arbeidsgivermelding - org. ${organisasjonsnummer}`;
        res.setHeader('Content-Disposition', `filename="${dokumentTittel}.pdf"`);

        // Convert Web ReadableStream to Node.js Readable stream
        const nodeStream = Readable.fromWeb(stream as any);
        nodeStream.pipe(res);
    } catch {
        return res.status(500).json({ error: 'Kunne ikke hente arbeidsgivermelding' });
    }
}

export default withAuthenticatedApi(handler);
