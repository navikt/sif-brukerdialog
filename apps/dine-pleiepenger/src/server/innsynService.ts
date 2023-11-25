import { createChildLogger } from '@navikt/next-logger';
import { RequestContext } from '../types/RequestContext';
import { Søknad } from '../types/Søknad';
import { Søker, SøkerSchema } from './api-models/Søker';
import { fetchApi } from './fetchApi';

export enum SifApiService {
    k9Brukerdialog = 'k9-brukerdialog-api',
    sifInnsyn = 'sif-innsyn-api',
}

enum ApiEndpointBrukerdialog {
    'søker' = 'oppslag/soker',
}
enum ApiEndpointInnsyn {
    'søknad' = 'soknad',
}

export async function getSøker(context: RequestContext): Promise<Søker> {
    const childLogger = createChildLogger(context.requestId);

    childLogger.info(`Fetching søker from backend, requestId: ${context.requestId}`);

    return fetchApi(
        { type: 'GET' },
        ApiEndpointBrukerdialog.søker,
        (it) => SøkerSchema.parse(it),
        context,
        SifApiService.k9Brukerdialog,
    );
}

export async function getSøknader(context: RequestContext): Promise<Søknad[]> {
    const childLogger = createChildLogger(context.requestId);

    childLogger.info(`Fetching søknader from backend, requestId: ${context.requestId}`);

    return fetchApi(
        { type: 'GET' },
        ApiEndpointInnsyn.søknad,
        (it) => it as Søknad[],
        context,
        SifApiService.sifInnsyn,
    );
}
