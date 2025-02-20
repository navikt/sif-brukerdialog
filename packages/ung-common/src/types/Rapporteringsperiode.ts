import { z } from 'zod';
import { DateRange } from '@navikt/sif-common-utils';
import { rapporteringsperiodeDTOSchema } from './dto/RapporteringsperiodeDTO';

export const rapporteringsperiodeSchema = rapporteringsperiodeDTOSchema.transform((data) => {
    const { fraOgMed, tilOgMed, ...rest } = data;
    return {
        ...rest,
        periode: <DateRange>{
            from: fraOgMed,
            to: tilOgMed,
        },
    };
});

export type Rapporteringsperiode = z.infer<typeof rapporteringsperiodeSchema>;
