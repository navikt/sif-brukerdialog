import { HentSisteGyldigeVedtakForAktorIdResponse } from '@navikt/k9-sak-innsyn-api';

export interface GyldigeVedtak {
    [key: string]: HentSisteGyldigeVedtakForAktorIdResponse;
}
