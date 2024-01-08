import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import axios, { HttpStatusCode } from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchMellomlagringer, fetchSvarfrist, fetchSøker, fetchSøknader } from '../../server/apiService';
import { Innsynsdata } from '../../types/InnsynData';
import { getXRequestId } from '../../utils/apiUtils';
import { sortSøknadEtterOpprettetDato } from '../../utils/søknadUtils';
import { Feature } from '../../utils/fatures';

export const innsynsdataFetcher = async (url: string): Promise<Innsynsdata> => axios.get(url).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const childLogger = createChildLogger(getXRequestId(req));
    childLogger.info(`Henter innsynsdata`);
    try {
        /** Hent søker først for å se om bruker har tilgang */
        const søker = await fetchSøker(req);

        /** Bruker har tilgang, hent resten av informasjonen */
        const [søknader, mellomlagring, svarfrist] = await Promise.allSettled([
            fetchSøknader(req),
            fetchMellomlagringer(req),
            Feature.HENT_SVARFRIST ? fetchSvarfrist(req) : Promise.resolve({ frist: undefined }),
        ]);

        if (søknader.status === 'rejected') {
            childLogger.error(
                new Error(`Hent søknader feilet: ${søknader.reason.message}`, { cause: søknader.reason }),
            );
        }

        const innsynsdata: Innsynsdata = {
            søker,
            søknader: søknader.status === 'fulfilled' ? søknader.value.sort(sortSøknadEtterOpprettetDato) : [],
            mellomlagring: mellomlagring.status === 'fulfilled' ? mellomlagring.value : {},
            svarfrist: svarfrist.status === 'fulfilled' ? svarfrist.value.frist : undefined,
        };
        res.send(innsynsdata);
    } catch (err) {
        childLogger.error(`Hent innsynsdata feilet: ${err}`);
        if (
            err.response.status === HttpStatusCode.Forbidden ||
            err.response.status === HttpStatusCode.UnavailableForLegalReasons
        ) {
            res.status(403).json({ error: 'Ikke tilgang' });
        } else {
            res.status(500).json({ error: 'Kunne ikke hente innsynsdata', err });
        }
    }
}

export default withAuthenticatedApi(handler);
