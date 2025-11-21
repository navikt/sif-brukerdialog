import { innsyn } from '@navikt/k9-sak-innsyn-api';
import z from 'zod';

import { zDateFromDateTimeString, zDateFromISODateString, zDatePeriodeFromStringPeriode } from './zDateFromString';

/* ====================== Inntektsmelding(er) ====================== */

export const inntektsmeldingClientSchema = innsyn.zSakInntektsmeldingDto.extend({
    startDatoPermisjon: zDateFromISODateString,
    mottattDato: zDateFromISODateString,
    innsendingstidspunkt: zDateFromDateTimeString,
    status: z.enum(innsyn.InntektsmeldingStatusDto),

    endringerRefusjon: z.optional(
        z.array(
            innsyn.zEndringRefusjonDto.extend({
                fom: zDateFromISODateString,
            }),
        ),
    ),

    graderinger: z.optional(
        z.array(
            innsyn.zGraderingDto.extend({
                periode: zDatePeriodeFromStringPeriode,
            }),
        ),
    ),

    naturalYtelser: z.optional(
        z.array(
            innsyn.zNaturalYtelseDto.extend({
                periode: zDatePeriodeFromStringPeriode,
            }),
        ),
    ),
    refusjonOpphører: z.optional(zDateFromISODateString),
    utsettelsePerioder: z.optional(
        z.array(
            innsyn.zUtsettelseDto.extend({
                periode: zDatePeriodeFromStringPeriode,
            }),
        ),
    ),
});

export const inntektsmeldingerClientSchema = z.array(inntektsmeldingClientSchema);
