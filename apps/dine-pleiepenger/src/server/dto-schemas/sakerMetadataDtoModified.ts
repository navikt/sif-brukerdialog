import { innsyn } from '@navikt/k9-sak-innsyn-api';
import z from 'zod';

import { zOptionalDateFromDateTimeString } from '../../types/client-schemas/zDateFromString';

export const zSakerMetadataDtoModified = innsyn.zSakerMetadataDto.extend({
    fagsakYtelseType: z.enum(innsyn.FagsakYtelseType),
    fagsakAvsluttetTidspunkt: zOptionalDateFromDateTimeString,
    fagsakOpprettetTidspunkt: zOptionalDateFromDateTimeString,
});

export type SakerMetadataDtoModified = z.infer<typeof zSakerMetadataDtoModified>;
