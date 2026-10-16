import { zHentSisteGyldigeVedtakForAktorIdResponse } from '@sif/k9-sak-innsyn-api';
import { z } from 'zod';

import { zISODate } from '../../shared/zDateSchemas';

export const zSisteGyldigeVedtakForAktørId = zHentSisteGyldigeVedtakForAktorIdResponse
    .omit({ vedtaksdato: true })
    .extend({
        vedtaksdato: zISODate.nullable().optional(),
        førsteMuligeSøknadsdato: zISODate.nullable().optional(),
        vedtakTomDato: zISODate.nullable().optional(),
    });

export type SisteGyldigeVedtakForAktørId = z.infer<typeof zSisteGyldigeVedtakForAktørId>;
