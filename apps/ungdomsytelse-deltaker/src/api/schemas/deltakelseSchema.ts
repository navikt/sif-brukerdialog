import { parseMaybeDateStringToDate } from '@navikt/sif-common-api/src/utils/jsonParseUtils';
import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { DateRange } from '@navikt/sif-common-utils';
import { z } from 'zod';
import { Rapporteringsperiode } from '../types';

const rapporteringsperiodeProcessedDTOSchema = z.object({
    fraOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    tilOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    harRapportert: z.boolean(),
    kanRapportere: z.boolean().optional(),
    fristForRapportering: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()).optional(),
    inntekt: z.preprocess((val) => (val === null ? undefined : val), z.number().optional()),
});

const deltakelseProcessedDTOSchema = z.object({
    id: z.string(),
    programperiodeFraOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    programperiodeTilOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date().optional()),
    harSøkt: z.boolean(),
    rapporteringsPerioder: z.array(rapporteringsperiodeProcessedDTOSchema).optional().nullable(),
});

export const rapporteringsperiodeSchema = rapporteringsperiodeProcessedDTOSchema.transform((data) => {
    const { fraOgMed, tilOgMed, ...rest } = data;
    return {
        ...rest,
        periode: <DateRange>{
            from: fraOgMed,
            to: tilOgMed,
        },
    };
});

export const deltakelseSchema = deltakelseProcessedDTOSchema.transform((data) => {
    const { programperiodeFraOgMed, programperiodeTilOgMed, ...rest } = data;
    const deltakelse = {
        ...rest,
        programPeriode: <OpenDateRange | DateRange>{
            from: programperiodeFraOgMed,
            to: programperiodeTilOgMed,
        },
        rapporteringsPerioder: data.rapporteringsPerioder?.map((rapporteringsperiode): Rapporteringsperiode => {
            const { fraOgMed, tilOgMed, ...rapporteringsperiodeRest } = rapporteringsperiode;
            return <Rapporteringsperiode>{
                ...rapporteringsperiodeRest,
                periode: {
                    from: fraOgMed,
                    to: tilOgMed,
                },
            };
        }),
    };
    return deltakelse;
});
