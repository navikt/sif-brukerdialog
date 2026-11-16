import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

import { withAuthenticatedApi } from '../../../auth/withAuthentication';
import { fetchDocumentStream } from '../../../server/fetchers/fetchDocumentStream';
import { ApiServices } from '../../../server/types/ApiServices';
import { isValidDokumentTittel, isValidPathSegment } from '../../../server/utils/validatePathSegment';

export const config = {
    api: {
        responseLimit: false,
    },
};

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { info, dokumentTittel },
    } = req;

    if (
        !Array.isArray(info) ||
        info.length !== 3 ||
        !info.every(isValidPathSegment) ||
        !isValidDokumentTittel(dokumentTittel)
    ) {
        return res.status(400).json({ error: 'Ugyldig forespørsel' });
    }

    try {
        const safeDokumentTittel = encodeURIComponent(dokumentTittel);

        const path = `dokument/${info.join('/')}?dokumentTittel=${safeDokumentTittel}`;
        const stream = await fetchDocumentStream(path, req, ApiServices.sifInnsyn);

        res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURI(dokumentTittel)}"`);

        // Convert Web ReadableStream to Node.js Readable stream
        const nodeStream = Readable.fromWeb(stream as any);
        nodeStream.pipe(res);
    } catch {
        return res.status(500).json({ error: 'Kunne ikke hente dokument' });
    }
}

export default withAuthenticatedApi(handler);
