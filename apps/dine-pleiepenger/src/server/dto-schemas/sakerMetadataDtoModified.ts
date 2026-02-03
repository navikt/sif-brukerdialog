import { innsyn } from '@navikt/k9-sak-innsyn-api';
import z from 'zod';

/** Pleietrengende uten aktørId */
const zPleietrengendeDtoModified = innsyn.zPleietrengendeDto.omit({ aktørId: true });

export const zSakerMetadataDtoModified = innsyn.zSakerMetadataDto
    .omit({
        fagsakAvsluttetTidspunkt: true,
        fagsakOpprettetTidspunkt: true,
        pleietrengende: true,
    })
    .extend({
        fagsakYtelseType: z.enum(innsyn.FagsakYtelseType),
        pleietrengende: zPleietrengendeDtoModified,
    });

export type SakerMetadataDtoModified = z.infer<typeof zSakerMetadataDtoModified>;
