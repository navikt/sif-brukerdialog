import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthenticatedApi } from '../../../auth/withAuthentication';
import { fetchDocumentStream } from '../../../server/fetchDocumentStream';
import { ApiService } from '../../../server/apiService';
import { getContextForApiHandler } from '../../../utils/apiUtils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { info, dokumentTittel },
    } = req;

    if (info?.length !== 3 || !Array.isArray(info)) {
        throw new Error('Ugyldig path i url');
    }

    try {
        const path = `dokument/${info.join('/')}?dokumentTittel=${dokumentTittel}`;
        const data = await fetchDocumentStream(path, getContextForApiHandler(req), ApiService.sifInnsyn);
        data.pipe(res);
    } catch (err) {
        res.status(500).json({ error: 'Kunne ikke hente dokument', err });
    }
}

export default withAuthenticatedApi(handler);
