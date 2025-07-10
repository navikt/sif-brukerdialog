import { HentSisteGyldigeVedtakForAktorIdResponse } from '@navikt/k9-sak-innsyn-k9-sak-api';

export interface GyldigeVedtak {
    [key: string]: HentSisteGyldigeVedtakForAktorIdResponse;
}
