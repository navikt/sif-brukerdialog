import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import {
    fetchMellomlagringer,
    fetchSaker,
    fetchSaksbehandlingstid,
    fetchSøker,
    fetchSøknader,
} from '../../server/apiService';
import { Innsynsdata } from '../../types/InnsynData';
import { isSakerParseError } from '../../types/SakerParseError';
import { getBrukerprofil } from '../../utils/amplitude/getBrukerprofil';
import { Feature } from '../../utils/features';
import { getLogger } from '../../utils/getLogCorrelationID';
import { sortInnsendtSøknadEtterOpprettetDato } from '../../utils/innsendtSøknadUtils';
import { fetchAppStatus } from './appStatus.api';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const logger = getLogger(req);
    logger.info(`Henter innsynsdata`, {
        mellomlagring: Feature.HENT_MELLOMLAGRING,
        saker: Feature.HENT_SAKER,
        behandlingstid: Feature.HENT_BEHANDLINGSTID,
        appstatus: Feature.HENT_APPSTATUS,
    });
    try {
        /** Hent søker først for å se om bruker har tilgang */
        const søker = await fetchSøker(req);

        /** Bruker har tilgang, hent resten av informasjonen */
        const [søknaderReq, mellomlagringReq, sakerReq, saksbehandlingstidReq, appStatus] = await Promise.allSettled([
            fetchSøknader(req),
            Feature.HENT_MELLOMLAGRING ? fetchMellomlagringer(req) : Promise.resolve({}),
            Feature.HENT_SAKER ? fetchSaker(req) : Promise.resolve([]),
            Feature.HENT_BEHANDLINGSTID
                ? fetchSaksbehandlingstid(req)
                : Promise.resolve({ saksbehandlingstidUker: undefined }),
            Feature.HENT_APPSTATUS ? fetchAppStatus() : Promise.resolve(undefined),
        ]);
        logger.info(`Hentet innsynsdata`);

        if (søknaderReq.status === 'rejected') {
            logger.error(
                'Hent søknader feilet',
                new Error(`Hent søknader feilet: ${søknaderReq.reason.message}`, { cause: søknaderReq.reason }),
            );
        }

        logger.info(`Parser innsynsdata`);

        const saker = sakerReq.status === 'fulfilled' ? sakerReq.value : [];
        const harSak = saker.length > 0;

        const innsendteSøknader =
            søknaderReq.status === 'fulfilled' ? søknaderReq.value.sort(sortInnsendtSøknadEtterOpprettetDato) : [];

        const saksbehandlingstidUker =
            saksbehandlingstidReq.status === 'fulfilled'
                ? saksbehandlingstidReq.value.saksbehandlingstidUker
                : undefined;

        const brukerprofil = getBrukerprofil(innsendteSøknader, saker, saksbehandlingstidUker);
        logger.info(`Innsynsdata parset`, brukerprofil);

        if (brukerprofil.antallSaker === 0 && brukerprofil.antallSøknader > 0) {
            const søknadEldreEnnToDager = innsendteSøknader.find((søknad) =>
                dayjs(søknad.opprettet).isBefore(dayjs().subtract(2, 'days')),
            );
            if (søknadEldreEnnToDager) {
                logger.info('Bruker har søknad, men ingen sak', {
                    ...brukerprofil,
                    journalpostId: søknadEldreEnnToDager.journalpostId,
                });
            }
        }

        const innsynsdata: Innsynsdata = {
            appStatus: appStatus.status === 'fulfilled' ? appStatus.value : undefined,
            søker,
            innsendteSøknader: harSak ? [] : innsendteSøknader,
            brukerprofil,
            mellomlagring: mellomlagringReq.status === 'fulfilled' ? mellomlagringReq.value : {},
            saksbehandlingstidUker,
            saker,
            harSak,
            sakerParseError:
                sakerReq.status === 'rejected' && isSakerParseError(sakerReq.reason) ? sakerReq.reason : undefined,
        };
        res.json(innsynsdata);
    } catch (err) {
        logger.error(`Hent innsynsdata feilet: ${err}`);
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
