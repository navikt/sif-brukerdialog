import { getContextForApiHandler } from '../utils/apiUtils';
import { exchangeTokenAndPrepRequest } from './utils/exchangeTokenPrepRequest';
import { Søknad } from '../types/Søknad';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { Søker } from './api-models/Søker';

export enum ApiService {
    k9Brukerdialog = 'k9-brukerdialog-api',
    sifInnsyn = 'sif-innsyn-api',
}

export enum ApiEndpointBrukerdialog {
    'søker' = 'oppslag/soker',
}
export enum ApiEndpointInnsyn {
    'søknad' = 'soknad',
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
