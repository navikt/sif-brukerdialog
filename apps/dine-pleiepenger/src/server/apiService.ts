import axios from 'axios';
import { NextApiRequest } from 'next';
import { ZodError } from 'zod';
import { InnsendtSøknad } from '../types/InnsendtSøknad';
import { Mellomlagringer } from '../types/Mellomlagring';
import { SakerParseError } from '../types/SakerParseError';
import { getContextForApiHandler } from '../utils/apiUtils';
import { getLogger } from '../utils/getLogCorrelationID';
import { sortBehandlingerNyesteFørst } from '../utils/sakUtils';
import { getZodErrorsInfo } from '../utils/zodUtils';
import { InnsendtSøknaderSchema } from './api-models/InnsendtSøknadSchema';
import { MellomlagringModel, MellomlagringSchema } from './api-models/MellomlagringSchema';
import { PleietrengendeMedSak, PleietrengendeMedSakResponseSchema } from './api-models/PleietrengendeMedSakSchema';
import {
    Saksbehandlingstid as Saksbehandlingstid,
    SaksbehandlingstidSchema,
} from './api-models/SaksbehandlingstidSchema';
import { Søker, SøkerSchema } from './api-models/SøkerSchema';
import { exchangeTokenAndPrepRequest } from './utils/exchangeTokenPrepRequest';
import { isValidMellomlagring } from './utils/isValidMellomlagring';

export enum ApiService {
    k9Brukerdialog = 'k9-brukerdialog-api',
    sifInnsyn = 'sif-innsyn-api',
    k9SakInnsyn = 'k9-sak-innsyn-api',
}

export enum ApiEndpointBrukerdialog {
    'søker' = 'oppslag/soker',
    'påbegyntSøknad' = 'mellomlagring/PLEIEPENGER_SYKT_BARN',
    'påbegyntEndring' = 'mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN',
}
export enum ApiEndpointInnsyn {
    'søknad' = 'soknad',
}

export enum ApiEndpointK9SakInnsyn {
    'saker' = 'saker',
    /** Gjeldende behandlingsstid i antall uker*/
    'behandlingstid' = 'saker/saksbehandlingstid',
}

export enum SifApiErrorType {
    UNAUTHORIZED = 'UNAUTHORIZED',
    NO_ACCESS = 'NO_ACCESS',
}

export const fetchSøker = async (req: NextApiRequest): Promise<Søker> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9Brukerdialog,
        context,
        ApiEndpointBrukerdialog.søker,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching søker from url: ${url}`);
    const response = await axios.get(url, { headers });
    logger.info(`Søker fetched`);
    return await SøkerSchema.parse(response.data);
};

/**
 * Henter saker for bruker
 * @param req
 * @returns
 */
export const fetchSaker = async (req: NextApiRequest, raw?: boolean): Promise<PleietrengendeMedSak[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9SakInnsyn,
        context,
        ApiEndpointK9SakInnsyn.saker,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching saker from url: ${url}`);
    const response = await axios.get(url, { headers });
    logger.info(`Response-status from request: ${response.status}`);
    if (raw) {
        return response.data;
    }
    /** Logg antall pleietrengendeMedSak før parsing */
    let sakerLength = undefined;
    try {
        sakerLength = response.data?.length;
    } catch {}
    logger.info(`Parsing saker response data`, {
        sakerLength,
    });

    const saker: PleietrengendeMedSak[] = [];
    try {
        const parsedSaker = await PleietrengendeMedSakResponseSchema.parse(response.data);
        saker.push(...parsedSaker);
    } catch (error) {
        if (error instanceof ZodError) {
            logger.error('Parsing av Saker feiler', { parseDetails: JSON.stringify(getZodErrorsInfo(error)) });
            if (sakerLength !== undefined && sakerLength > 0) {
                const sakerParseError: SakerParseError = {
                    antallSaker: sakerLength,
                    error,
                };
                throw sakerParseError;
            }
        } else {
            logger.error(error, 'Ukjent feil ved parsing saker');
        }
        throw error;
    }

    logger.info(`Saker response data parsed. Antall saker: ${saker.length}`);
    if (saker.length !== sakerLength) {
        logger.warn('Antall saker før og etter parsing stemmer ikke overens.', {
            sakerLength,
            parsedSakerLength: saker.length,
        });
        return Promise.reject(new Error('Antall saker før og etter parsing stemmer ikke overens.'));
    }

    return saker.map((ps): PleietrengendeMedSak => {
        return {
            pleietrengende: ps.pleietrengende,
            sak: {
                ...ps.sak,
                behandlinger: sortBehandlingerNyesteFørst(ps.sak.behandlinger),
            },
        };
    });
};

/**
 * Henter forventet behandlingstid for søknad på nåværende tidspunkt
 * @param req
 * @returns
 */
export const fetchSaksbehandlingstid = async (req: NextApiRequest): Promise<Saksbehandlingstid> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9SakInnsyn,
        context,
        ApiEndpointK9SakInnsyn.behandlingstid,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching behandlingstid from url: ${url}`);
    const response = await axios.get(url, { headers });
    logger.info(`Behandlingstid fetched`);
    return await SaksbehandlingstidSchema.parse(response.data);
};

export const fetchSøknader = async (req: NextApiRequest): Promise<InnsendtSøknad[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.sifInnsyn,
        context,
        ApiEndpointInnsyn.søknad,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching søknader from url: ${url}`);
    const response = await axios.get(url, { headers });
    logger.info(`Søknader fetched`);
    return await InnsendtSøknaderSchema.parse(response.data);
};

/**
 * Henter ut mellomlagringer fra søknadsdialog og endringsdialog
 * @param req
 * @returns
 */
export const fetchMellomlagringer = async (req: NextApiRequest): Promise<Mellomlagringer> => {
    const context = getContextForApiHandler(req);

    /** Påbegynt søknad */
    const påbegyntSøknadReq = await exchangeTokenAndPrepRequest(
        ApiService.k9Brukerdialog,
        context,
        ApiEndpointBrukerdialog.påbegyntSøknad,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching påbegynt søknad from url: ${påbegyntSøknadReq.url}`);
    const påbegyntSøknad = await axios
        .get(påbegyntSøknadReq.url, { headers: påbegyntSøknadReq.headers })
        .then((response) => Promise.resolve(fixSøknadMetadata(response.data)));

    /** Påbegynt endring */
    const påbegyntEndringReq = await exchangeTokenAndPrepRequest(
        ApiService.k9Brukerdialog,
        context,
        ApiEndpointBrukerdialog.påbegyntEndring,
        'application/json',
    );
    logger.info(`Fetching påbegynt endring from url: ${påbegyntEndringReq.url}`);
    const påbegyntEndring = await axios
        .get(påbegyntEndringReq.url, { headers: påbegyntEndringReq.headers })
        .then((response) => Promise.resolve(fixSøknadMetadata(response.data)));

    const søknad = await MellomlagringSchema.parse(påbegyntSøknad);
    const endring = await MellomlagringSchema.parse(påbegyntEndring);

    return {
        søknad: isValidMellomlagring(søknad) ? søknad : undefined,
        endring: isValidMellomlagring(endring) ? endring : undefined,
    };
};

const fixSøknadMetadata = (data: MellomlagringModel): MellomlagringModel => {
    if (data.metadata && (data.metadata as any).updatedTimestemp) {
        data.metadata.updatedTimestamp = (data.metadata as any).updatedTimestemp;
        delete (data.metadata as any).updatedTimestemp;
    }
    return data;
};
