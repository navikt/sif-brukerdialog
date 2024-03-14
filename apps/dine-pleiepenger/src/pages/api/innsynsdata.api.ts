import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { HttpStatusCode } from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import {
    fetchSaksbehandlingstid,
    fetchMellomlagringer,
    fetchSøker,
    fetchSøknader,
    fetchSaker,
} from '../../server/apiService';
import { Innsynsdata } from '../../types/InnsynData';
import { getXRequestId } from '../../utils/apiUtils';
import { sortSøknadEtterOpprettetDato } from '../../utils/søknadUtils';
import { Feature } from '../../utils/features';
import { getBrukerprofil } from '../../utils/brukerprofilUtils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const childLogger = createChildLogger(getXRequestId(req));
    childLogger.info(`Henter innsynsdata`);
    try {
        /** Hent søker først for å se om bruker har tilgang */
        const søker = await fetchSøker(req);

        /** Bruker har tilgang, hent resten av informasjonen */
        const [søknaderReq, mellomlagringReq, sakerReq, saksbehandlingstidReq] = await Promise.allSettled([
            fetchSøknader(req),
            fetchMellomlagringer(req),
            Feature.HENT_SAKER ? fetchSaker(req) : Promise.resolve([]),
            Feature.HENT_BEHANDLINGSTID
                ? fetchSaksbehandlingstid(req)
                : Promise.resolve({ saksbehandlingstidUker: undefined }),
        ]);

        if (søknaderReq.status === 'rejected') {
            childLogger.error(
                new Error(`Hent søknader feilet: ${søknaderReq.reason.message}`, { cause: søknaderReq.reason }),
            );
        }

        const saker = sakerReq.status === 'fulfilled' ? sakerReq.value : [];

        const søknader = søknaderReq.status === 'fulfilled' ? søknaderReq.value.sort(sortSøknadEtterOpprettetDato) : [];
        const saksbehandlingstidUker =
            saksbehandlingstidReq.status === 'fulfilled'
                ? saksbehandlingstidReq.value.saksbehandlingstidUker
                : undefined;

        childLogger.info(`Hentet innsynsdata`, getBrukerprofil(søknader, saker, saksbehandlingstidUker));

        const innsynsdata: Innsynsdata = {
            søker,
            søknader,
            mellomlagring: mellomlagringReq.status === 'fulfilled' ? mellomlagringReq.value : {},
            saksbehandlingstidUker,
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
            res.status(500).json({ error: 'Kunne ikke hente innsynsdata' });
        }
    }
}

export default withAuthenticatedApi(handler);
