import { parseMaybeDateStringToDate } from '@navikt/sif-common-api/src/utils/jsonParseUtils';
import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { DateRange, isDateInDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { z } from 'zod';
import { Rapporteringsperiode } from '../types';
import { inntektSchema } from './inntektSchema';
import { oppgaveSchema } from './oppgaveSchema';
import dayjs from 'dayjs';

const rapporteringsperiodeProcessedDTOSchema = z.object({
    fraOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    tilOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    harRapportert: z.boolean(),
    kanRapportere: z.boolean().optional(),
    fristForRapportering: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()).optional(),
    inntekt: z.preprocess((val) => (val === null ? undefined : val), inntektSchema.optional()),
});

const deltakelseProcessedDTOSchema = z.object({
    id: z.string(),
    programperiodeFraOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    programperiodeTilOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date().optional()),
    harSøkt: z.boolean(),
    oppgaver: z.array(oppgaveSchema),
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
    const programPeriode: OpenDateRange = {
        from: programperiodeFraOgMed,
        to: programperiodeTilOgMed,
    };
    const deltakelse = {
        ...rest,
        programPeriode,
        rapporteringsPerioder: data.rapporteringsPerioder?.map((rapporteringsperiode): Rapporteringsperiode => {
            const { fraOgMed, tilOgMed, ...rapporteringsperiodeRest } = rapporteringsperiode;
            return <Rapporteringsperiode>{
                ...rapporteringsperiodeRest,
                periode: {
                    from: fraOgMed,
                    to: tilOgMed,
                },
                kanRapportere: isDateInDateRange(new Date(), {
                    from: programPeriode.from,
                    to: programPeriode.to || ISODateToDate('2026-01-01'),
                }), // TODO - fallback frem til backend er klar
                fristForRapportering: dayjs().endOf('month').toDate(), // TODO - fallback frem til backend er klar
            };
        }),
    };
    return deltakelse;
});
