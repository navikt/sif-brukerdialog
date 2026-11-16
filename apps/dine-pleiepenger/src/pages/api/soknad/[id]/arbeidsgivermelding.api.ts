import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchDocumentStream } from '../../../../server/fetchers/fetchDocumentStream';
import { ApiServices } from '../../../../server/types/ApiServices';
import { isValidOrganisasjonsnummer, isValidPathSegment } from '../../../../server/utils/validatePathSegment';

export const config = {
    api: {
        responseLimit: false,
    },
};

export async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { query } = req;
    const søknadId = query.id;
    const organisasjonsnummer = query.organisasjonsnummer;

    if (!isValidPathSegment(søknadId) || !isValidOrganisasjonsnummer(organisasjonsnummer)) {
        return res.status(400).json({ error: 'Ugyldig forespørsel' });
    }

    try {
        const path = `soknad/${søknadId}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`;
        const stream = await fetchDocumentStream(path, req, ApiServices.sifInnsyn);

        res.setHeader('Content-Type', 'application/pdf');

        const dokumentTittel = `Arbeidsgivermelding - org. ${organisasjonsnummer}`;
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURI(dokumentTittel)}.pdf"`);

        // Convert Web ReadableStream to Node.js Readable stream
        const nodeStream = Readable.fromWeb(stream as any);
        nodeStream.pipe(res);
    } catch {
        return res.status(500).json({ error: 'Kunne ikke hente arbeidsgivermelding' });
    }
}

export default withAuthenticatedApi(handler);
