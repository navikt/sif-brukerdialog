import { zHentSisteGyldigeVedtakForAktorIdResponse } from '@navikt/k9-sak-innsyn-api';
import { z } from 'zod';

import { zISODate } from '../../schemas/zDateSchemas';

export const zSisteGyldigeVedtakForAktørId = zHentSisteGyldigeVedtakForAktorIdResponse
    .omit({ vedtaksdato: true })
    .extend({
        vedtaksdato: zISODate.nullable().optional(),
    });

export type SisteGyldigeVedtakForAktørId = z.infer<typeof zSisteGyldigeVedtakForAktørId>;
