import { ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import { zDeltakelsePeriodInfo } from '@navikt/ung-deltakelse-opplyser-api';
import { z } from 'zod';
import { parseOppgaverElement, parseRapporteringsperioder } from '../api';

export const deltakelsePeriodeSchema = zDeltakelsePeriodInfo
    .extend({
        id: z.string(),
    })
    .transform((data) => {
        const { fraOgMed, tilOgMed, ...rest } = data;
        const programPeriode: OpenDateRange = {
            from: ISODateToDate(fraOgMed),
            to: tilOgMed ? ISODateToDate(tilOgMed) : undefined,
        };
        return {
            ...rest,
            programPeriode,
            rapporteringsPerioder: parseRapporteringsperioder(
                programPeriode,
                data.rapporteringsPerioder.map((periode) => ({
                    ...periode,
                    ytelseInntekter: periode.inntektFraYtelse ?? 0,
                    arbeidOgFrilansInntekter: periode.arbeidstakerOgFrilansInntekt ?? 0,
                })),
            ),
            oppgaver: parseOppgaverElement(data.oppgaver),
        };
    });

export const deltakelsePerioderSchema = z.array(deltakelsePeriodeSchema);

export type DeltakelsePeriode = z.infer<typeof deltakelsePeriodeSchema>;
