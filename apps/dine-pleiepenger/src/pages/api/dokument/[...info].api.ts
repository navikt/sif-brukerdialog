import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

import { withAuthenticatedApi } from '../../../auth/withAuthentication';
import { fetchDocumentStream } from '../../../server/fetchers/fetchDocumentStream';
import { ApiServices } from '../../../server/types/ApiServices';
import { getContextForApiHandler } from '../../../utils/apiUtils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { info, dokumentTittel },
    } = req;

    if (info?.length !== 3 || !Array.isArray(info)) {
        throw new Error('Ugyldig path i url');
    }

    if (typeof dokumentTittel !== 'string') {
        throw new Error('Ugyldig dokumentTittel - typeof !== string');
    }

    try {
        const path = `dokument/${info.join('/')}?dokumentTittel=${dokumentTittel}`;
        const stream = await fetchDocumentStream(path, getContextForApiHandler(req), ApiServices.sifInnsyn);

        res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
        res.setHeader('Content-Disposition', `filename="${encodeURI(dokumentTittel)}"`);

        // Convert Web ReadableStream to Node.js Readable stream
        const nodeStream = Readable.fromWeb(stream as any);
        nodeStream.pipe(res);
    } catch {
        res.status(500).json({ error: 'Kunne ikke hente dokument' });
    }
}

export default withAuthenticatedApi(handler);
