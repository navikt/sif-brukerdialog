import { zHentSisteGyldigeVedtakForAktorIdResponse } from '@navikt/k9-sak-innsyn-api';
import { z } from 'zod';

import { zNullableISODate } from '../../schemas/zDateSchemas';

export const zSisteGyldigeVedtakForAktørId = zHentSisteGyldigeVedtakForAktorIdResponse
    .omit({ vedtaksdato: true })
    .extend({
        vedtaksdato: zNullableISODate,
    });

export type SisteGyldigeVedtakForAktørId = z.infer<typeof zSisteGyldigeVedtakForAktørId>;
