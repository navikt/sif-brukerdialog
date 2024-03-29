import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { Mellomlagringer } from '../types/Mellomlagring';
import { Søknad } from '../types/Søknad';
import { getContextForApiHandler, getXRequestId } from '../utils/apiUtils';
import { MellomlagringModel, MellomlagringSchema } from './api-models/MellomlagringSchema';
import { Søker, SøkerSchema } from './api-models/SøkerSchema';
import { exchangeTokenAndPrepRequest } from './utils/exchangeTokenPrepRequest';
import { isValidMellomlagring } from './utils/isValidMellomlagring';
import { SøknaderSchema } from './api-models/SøknadSchema';
import {
    Saksbehandlingstid as Saksbehandlingstid,
    SaksbehandlingstidSchema,
} from './api-models/SaksbehandlingstidSchema';
import { Sak } from './api-models/SakSchema';
import { SakerSchema } from './api-models/SakerSchema';

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
    );
    createChildLogger(getXRequestId(req)).info(`Fetching søker from url: ${url}`);
    const response = await axios.get(url, { headers });
    return await SøkerSchema.parse(response.data);
};

/**
 * Henter saker for bruker
 * @param req
 * @returns
 */
export const fetchSaker = async (req: NextApiRequest): Promise<Sak[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9SakInnsyn,
        context,
        ApiEndpointK9SakInnsyn.saker,
    );
    const childLogger = createChildLogger(getXRequestId(req));
    childLogger.info(`Fetching saker from url: ${url}`);
    const response = await axios.get(url, { headers });
    try {
        childLogger.info(`Saker fetched from url. Antall: ${response.data.length}`);
    } catch (e) {
        childLogger.info(`Saker fetched from url - mangler length: ${response.statusText}`);
    }
    const saker = await SakerSchema.parse(response.data);
    return saker;
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
    );
    createChildLogger(getXRequestId(req)).info(`Fetching behandlingstid from url: ${url}`);
    const response = await axios.get(url, { headers });
    return await SaksbehandlingstidSchema.parse(response.data);
};

export const fetchSøknader = async (req: NextApiRequest): Promise<Søknad[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(ApiService.sifInnsyn, context, ApiEndpointInnsyn.søknad);
    createChildLogger(getXRequestId(req)).info(`Fetching søknader from url: ${url}`);
    const response = await axios.get(url, { headers });
    return await SøknaderSchema.parse(response.data);
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
    );
    createChildLogger(getXRequestId(req)).info(`Fetching påbegynt søknad from url: ${påbegyntSøknadReq.url}`);
    const påbegyntSøknad = await axios
        .get(påbegyntSøknadReq.url, { headers: påbegyntSøknadReq.headers })
        .then((response) => Promise.resolve(fixSøknadMetadata(response.data)));

    /** Påbegynt endring */
    const påbegyntEndringReq = await exchangeTokenAndPrepRequest(
        ApiService.k9Brukerdialog,
        context,
        ApiEndpointBrukerdialog.påbegyntEndring,
    );
    createChildLogger(getXRequestId(req)).info(`Fetching påbegynt endring from url: ${påbegyntEndringReq.url}`);
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
