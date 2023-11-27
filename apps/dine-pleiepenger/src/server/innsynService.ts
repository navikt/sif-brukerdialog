import { getContextForApiHandler } from '../utils/apiUtils';
import { exchangeTokenAndPrepRequest } from './utils/exchangeTokenPrepRequest';
import { Søknad } from '../types/Søknad';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { Søker } from './api-models/Søker';
import { Mellomlagringer } from '../types/Mellomlagring';
import { MellomlagringModel } from './api-models/Mellomlagring';
import { isValidMellomlagring } from './utils/isValidMellomlagring';

export enum ApiService {
    k9Brukerdialog = 'k9-brukerdialog-api',
    sifInnsyn = 'sif-innsyn-api',
}

export enum ApiEndpointBrukerdialog {
    'søker' = 'oppslag/soker',
}
export enum ApiEndpointInnsyn {
    'søknad' = 'soknad',
    'påbegyntSøknad' = 'mellomlagring/PLEIEPENGER_SYKT_BARN',
    'påbegyntEndring' = 'mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN',
}

export enum SifApiErrorType {
    UNAUTHORIZED = 'UNAUTHORIZED',
    NO_ACCESS = 'NO_ACCESS',
}

export const fetchSøknader = async (request: NextApiRequest): Promise<Søknad[]> => {
    const context = getContextForApiHandler(request);
    const { url, headers } = await exchangeTokenAndPrepRequest(ApiService.sifInnsyn, context, ApiEndpointInnsyn.søknad);
    const response = await axios.get(url, { headers });
    const parse = (it) => it as Søknad[];
    return await parse(response.data);
};

export const fetchSøker = async (request: NextApiRequest): Promise<Søker> => {
    const context = getContextForApiHandler(request);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiService.k9Brukerdialog,
        context,
        ApiEndpointBrukerdialog.søker,
    );
    const response = await axios.get(url, { headers });
    const parse = (it) => it as Søker;
    return await parse(response.data);
};

/**
 * Henter ut mellomlagringer fra søknadsdialog og endringsdialog
 * @param request
 * @returns
 */
export const fetchMellomlagringer = async (request: NextApiRequest): Promise<Mellomlagringer> => {
    const context = getContextForApiHandler(request);

    /** Påbegynt søknad */
    const påbegyntSøknadReq = await exchangeTokenAndPrepRequest(
        ApiService.sifInnsyn,
        context,
        ApiEndpointInnsyn.påbegyntSøknad,
    );
    const påbegyntSøknad = await axios.get(påbegyntSøknadReq.url, { headers: påbegyntSøknadReq.headers });

    /** Påbegynt endring */
    const påbegyntEndringReq = await exchangeTokenAndPrepRequest(
        ApiService.sifInnsyn,
        context,
        ApiEndpointInnsyn.påbegyntEndring,
    );
    const påbegyntEndring = await axios.get(påbegyntEndringReq.url, { headers: påbegyntEndringReq.headers });

    const parseMellomlagring = (it) => it as MellomlagringModel;

    const søknad = await parseMellomlagring(påbegyntSøknad.data);
    const endring = await parseMellomlagring(påbegyntEndring.data);

    return {
        endring: isValidMellomlagring(endring) ? endring : undefined,
        søknad: isValidMellomlagring(søknad) ? søknad : undefined,
    };
};
