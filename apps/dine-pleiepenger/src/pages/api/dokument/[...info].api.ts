import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { createDemoRequestContext, createRequestContext, withAuthenticatedApi } from '../../../auth/withAuthentication';
import { Søker } from '../../../server/api-models/SøkerSchema';
import { isLocal } from '../../../utils/env';
import { fetchDocumentStream } from '../../../server/fetchDocumentStream';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { info, dokumentTittel },
    } = req;

    if (info?.length !== 3 || !Array.isArray(info)) {
        throw 'Invalid document path info';
    }

    try {
        const context = !isLocal
            ? createRequestContext(req.headers['x-request-id'] as string | undefined, req.headers['authorization'])
            : createDemoRequestContext(req);

        if (!context || context === null) {
            res.status(401).json({ error: 'Access denied - context is undefined' });
            return;
        }
        const path = `dokument/${info.join('/')}?dokumentTittel=${dokumentTittel}`;
        const data = await fetchDocumentStream(path, context, 'sif-innsyn-api');
        data.pipe(res);
    } catch (err) {
        res.status(500).json({ error: 'Kunne ikke hente dokument', err });
    }
}

export default withAuthenticatedApi(handler);

export const søkerFecther = async (url: string) => axios.get<Søker>(url).then((res) => res.data);
