import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchMellomlagringer, fetchSvarfrist, fetchSøker, fetchSøknader } from '../../server/apiService';
import { Innsynsdata } from '../../types/InnsynData';
import { getXRequestId } from '../../utils/apiUtils';

export const innsynsdataFetcher = async (url: string): Promise<Innsynsdata> => axios.get(url).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const [søker, søknader, mellomlagring, svarfrist] = await Promise.allSettled([
            fetchSøker(req),
            fetchSøknader(req),
            fetchMellomlagringer(req),
            fetchSvarfrist(req),
        ]);
        res.send({
            søker: søker.status === 'fulfilled' ? søker.value : undefined,
            søknader: søknader.status === 'fulfilled' ? søknader.value : undefined,
            mellomlagring: mellomlagring.status === 'fulfilled' ? mellomlagring.value : undefined,
            svarfrist: svarfrist.status === 'fulfilled' ? svarfrist.value.frist : undefined,
        });
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Fetching søker innsynsdata: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente innsynsdata', err });
    }
}

export default withAuthenticatedApi(handler);
