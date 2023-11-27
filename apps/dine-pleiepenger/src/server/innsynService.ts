import axios from 'axios';
import { NextApiRequest } from 'next';
import { Mellomlagringer } from '../types/Mellomlagring';
import { Søknad } from '../types/Søknad';
import { getContextForApiHandler, getXRequestId } from '../utils/apiUtils';
import { MellomlagringModel } from './api-models/Mellomlagring';
import { Søker } from './api-models/Søker';
import { exchangeTokenAndPrepRequest } from './utils/exchangeTokenPrepRequest';
import { isValidMellomlagring } from './utils/isValidMellomlagring';
import { createChildLogger } from '@navikt/next-logger';

export enum ApiService {
    k9Brukerdialog = 'k9-brukerdialog-api',
    sifInnsyn = 'sif-innsyn-api',
}

export enum ApiEndpointBrukerdialog {
    'søker' = 'oppslag/soker',
    'påbegyntSøknad' = 'mellomlagring/PLEIEPENGER_SYKT_BARN',
    'påbegyntEndring' = 'mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN',
}
export enum ApiEndpointInnsyn {
    'søknad' = 'soknad',
}

export enum SifApiErrorType {
    UNAUTHORIZED = 'UNAUTHORIZED',
    NO_ACCESS = 'NO_ACCESS',
}

export const fetchSøknader = async (req: NextApiRequest): Promise<Søknad[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(ApiService.sifInnsyn, context, ApiEndpointInnsyn.søknad);
    createChildLogger(getXRequestId(req)).info(`Fetching søknader from url: ${url}`);
    const response = await axios.get(url, { headers });
    const parse = (it) => it as Søknad[];
    return await parse(response.data);
};

export const fetchSøker = async (req: NextApiRequest): Promise<Søker> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9Brukerdialog,
        context,
        ApiEndpointBrukerdialog.søker,
    );
    createChildLogger(getXRequestId(req)).info(`Fetching søker from url: ${url}`);
    const response = await axios.get(url, { headers });
    const parse = (it) => it as Søker;
    return await parse(response.data);
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
    const påbegyntSøknad = await axios.get(påbegyntSøknadReq.url, { headers: påbegyntSøknadReq.headers });

    /** Påbegynt endring */
    const påbegyntEndringReq = await exchangeTokenAndPrepRequest(
        ApiService.k9Brukerdialog,
        context,
        ApiEndpointBrukerdialog.påbegyntEndring,
    );
    createChildLogger(getXRequestId(req)).info(`Fetching påbegynt endring from url: ${påbegyntEndringReq.url}`);
    const påbegyntEndring = await axios.get(påbegyntEndringReq.url, { headers: påbegyntEndringReq.headers });

    const parseMellomlagring = (it) => it as MellomlagringModel;

    const søknad = await parseMellomlagring(påbegyntSøknad.data);
    const endring = await parseMellomlagring(påbegyntEndring.data);

    return {
        endring: isValidMellomlagring(endring) ? endring : undefined,
        søknad: isValidMellomlagring(søknad) ? søknad : undefined,
    };
};
