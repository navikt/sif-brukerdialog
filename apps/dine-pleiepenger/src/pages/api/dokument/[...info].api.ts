import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

import { withAuthenticatedApi } from '../../../auth/withAuthentication';
import { fetchDocumentStream } from '../../../server/fetchers/fetchDocumentStream';
import { ApiServices } from '../../../server/types/ApiServices';
import { validateDokumentTittel, validatePathSegment } from '../../../server/utils/validatePathSegment';
import { getContextForApiHandler } from '../../../utils/apiUtils';

export const config = {
    api: {
        responseLimit: false,
    },
};

const dokumentTittelErGyldig = (value: unknown): value is string => {
    if (typeof value !== 'string' || value.length === 0) {
        return false;
    }

    try {
        validateDokumentTittel(value);
        return true;
    } catch {
        return false;
    }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { info, dokumentTittel },
    } = req;

    if (!Array.isArray(info) || info.length !== 3) {
        throw new Error('Ugyldig path i url');
    }

    if (!dokumentTittelErGyldig(dokumentTittel)) {
        throw new Error('Ugyldig dokumentTittel - typeof !== string');
    }

    try {
        const sanitizedSegments = info.map((segment, index) => {
            validatePathSegment(segment, `path segment ${index + 1}`);
            return encodeURIComponent(segment);
        });

        validateDokumentTittel(dokumentTittel);
        const safeDokumentTittel = encodeURIComponent(dokumentTittel);

        const path = `dokument/${sanitizedSegments.join('/')}?dokumentTittel=${safeDokumentTittel}`;
        const stream = await fetchDocumentStream(path, getContextForApiHandler(req), ApiServices.sifInnsyn);

        res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
        res.setHeader('Content-Disposition', `filename="${encodeURI(dokumentTittel)}"`);

        // Convert Web ReadableStream to Node.js Readable stream
        const nodeStream = Readable.fromWeb(stream as any);
        nodeStream.pipe(res);
    } catch {
        return res.status(500).json({ error: 'Kunne ikke hente dokument' });
    }
}

export default withAuthenticatedApi(handler);
