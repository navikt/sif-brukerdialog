import { createChildLogger } from '@navikt/next-logger';
import { RequestContext } from '../types/RequestContext';
import { Søker } from '../types/Søker';
import { fetchApi } from './fetchApi';
import { ApiEndpointBrukerdialog, ApiEndpointInnsyn } from './endpoints';
import { Søknad } from '../types/Søknad';
import { SøkerSchema } from './api-models/SøkerSchema';

export async function getSøker(context: RequestContext): Promise<Søker> {
    const childLogger = createChildLogger(context.requestId);

    childLogger.info(`Fetching søker from backend, requestId: ${context.requestId}`);

    return fetchApi(
        { type: 'GET' },
        ApiEndpointBrukerdialog.søker,
        (it) => SøkerSchema.parse(it),
        context,
        'k9-brukerdialog-api',
    );
}

export async function getSøknader(context: RequestContext): Promise<Søknad[]> {
    const childLogger = createChildLogger(context.requestId);

    childLogger.info(`Fetching søknader from backend, requestId: ${context.requestId}`);

    return fetchApi({ type: 'GET' }, ApiEndpointInnsyn.søknad, (it) => it as Søknad[], context, 'sif-innsyn-api');
}
