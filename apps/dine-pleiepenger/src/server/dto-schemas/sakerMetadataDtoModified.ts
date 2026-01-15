import { innsyn } from '@navikt/k9-sak-innsyn-api';
import z from 'zod';

export const zSakerMetadataDtoModified = innsyn.zSakerMetadataDto
    .omit({
        fagsakAvsluttetTidspunkt: true,
        fagsakOpprettetTidspunkt: true,
    })
    .extend({
        fagsakYtelseType: z.enum(innsyn.FagsakYtelseType),
    });

export type SakerMetadataDtoModified = z.infer<typeof zSakerMetadataDtoModified>;
