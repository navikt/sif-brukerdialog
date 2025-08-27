import { initApiClient, InitApiClientOptions } from '@navikt/sif-common-api';
import { EnvKey, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { client } from './veileder';

export const initUngDeltakelseOpplyserApiVeilederClient = (options?: InitApiClientOptions) => {
    const frontendPath = getUngDeltakelseOpplyserBrowserEnv()[EnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH];
    initApiClient(client, frontendPath, options);
};
