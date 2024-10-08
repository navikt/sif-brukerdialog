import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthenticatedApi } from '../../../auth/withAuthentication';
import { ApiService } from '../../../server/apiService';
import { fetchDocument } from '../../../server/fetchDocument';
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
        const blob = await fetchDocument(path, getContextForApiHandler(req), ApiService.sifInnsyn);
        const resBufferArray = await blob.arrayBuffer();
        const resBuffer = Buffer.from(resBufferArray);

        res.setHeader('Content-Type', 'application/PDF; charset=utf-8');
        res.setHeader('Content-Length', (blob as Blob).size.toString());
        res.setHeader('Content-Disposition', `filename="${encodeURI(dokumentTittel)}"`);
        res.write(resBuffer, 'binary');
        res.end();
    } catch {
        res.status(500).json({ error: 'Kunne ikke hente dokument' });
    }
}

export default withAuthenticatedApi(handler);
