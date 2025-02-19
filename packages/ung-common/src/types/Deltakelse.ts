import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { isDateInDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { z } from 'zod';
import { deltakelseDTOSchema } from './dto/DeltakelseDTO';
import { Rapporteringsperiode, rapporteringsperiodeSchema } from './Rapporteringsperiode';
import { oppgaveSchema } from './Oppgave';

export const deltakelseSchema = deltakelseDTOSchema.transform((data) => {
    const { programperiodeFraOgMed, programperiodeTilOgMed, ...rest } = data;
    const programPeriode: OpenDateRange = {
        from: programperiodeFraOgMed,
        to: programperiodeTilOgMed,
    };
    const deltakelse = {
        ...rest,
        programPeriode,
        oppgaver: data.oppgaver.map((oppgaveDTO) => oppgaveSchema.parse(oppgaveDTO)),
        rapporteringsPerioder: data.rapporteringsPerioder?.map((rapporteringsperiodeDTO): Rapporteringsperiode => {
            return {
                ...rapporteringsperiodeSchema.parse(rapporteringsperiodeDTO),
                // TODO - fallback frem til backend er klar
                kanRapportere: isDateInDateRange(new Date(), {
                    from: programPeriode.from,
                    to: programPeriode.to || ISODateToDate('2026-01-01'),
                }),
                // TODO - fallback frem til backend er klar
                fristForRapportering: dayjs().endOf('month').toDate(),
            };
        }),
    };
    return deltakelse;
});

export type Deltakelse = z.infer<typeof deltakelseSchema>;
