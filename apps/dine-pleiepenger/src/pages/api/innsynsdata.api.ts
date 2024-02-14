import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import axios, { HttpStatusCode } from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import {
    fetchMellomlagringer,
    fetchSaker,
    fetchSaksbehandlingstid,
    fetchSøker,
    fetchSøknader,
} from '../../server/apiService';
import { Innsynsdata } from '../../types/InnsynData';
import { getXRequestId } from '../../utils/apiUtils';
import { Feature } from '../../utils/features';
import { sortInnsendtSøknadEtterOpprettetDato } from '../../utils/innsendtSøknadUtils';
import { fetchAppStatus } from './appStatus.api';

export const innsynsdataFetcher = async (url: string): Promise<Innsynsdata> =>
    axios.get(url, { transformResponse: storageParser }).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const childLogger = createChildLogger(getXRequestId(req));
    childLogger.info(`Henter innsynsdata`);
    try {
        /** Hent søker først for å se om bruker har tilgang */
        const søker = await fetchSøker(req);

        /** Bruker har tilgang, hent resten av informasjonen */
        const [søknaderReq, mellomlagringReq, sakerReq, saksbehandlingstidReq, appStatus] = await Promise.allSettled([
            fetchSøknader(req),
            fetchMellomlagringer(req),
            Feature.HENT_SAKER ? fetchSaker(req) : Promise.resolve([]),
            Feature.HENT_BEHANDLINGSTID
                ? fetchSaksbehandlingstid(req)
                : Promise.resolve({ saksbehandlingstidUker: undefined }),
            fetchAppStatus(),
        ]);

        if (søknaderReq.status === 'rejected') {
            childLogger.error(
                new Error(`Hent søknader feilet: ${søknaderReq.reason.message}`, { cause: søknaderReq.reason }),
            );
        }
        const innsendteSøknader =
            søknaderReq.status === 'fulfilled' ? søknaderReq.value.sort(sortInnsendtSøknadEtterOpprettetDato) : [];

        const saker = sakerReq.status === 'fulfilled' ? sakerReq.value : [];

        const innsynsdata: Innsynsdata = {
            søker,
            appStatus: appStatus.status === 'fulfilled' ? appStatus.value : undefined,
            innsendteSøknader,
            mellomlagring: mellomlagringReq.status === 'fulfilled' ? mellomlagringReq.value : {},
            saksbehandlingstidUker:
                saksbehandlingstidReq.status === 'fulfilled'
                    ? saksbehandlingstidReq.value.saksbehandlingstidUker
                    : undefined,
            saker,
            harSak: saker.length > 0,
        };
        res.json(innsynsdata);
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
