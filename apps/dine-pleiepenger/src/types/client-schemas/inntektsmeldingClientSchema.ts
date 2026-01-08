import { innsyn } from '@navikt/k9-sak-innsyn-api';
import z from 'zod';

import {
    zDateFromDateTimeString,
    zDateFromISODateString,
    zDatePeriodeFromStringPeriodeFixYear9999,
} from './zDateFromString';

/* ====================== Inntektsmelding(er) ====================== */

export const inntektsmeldingClientSchema = innsyn.zSakInntektsmeldingDto
    .extend({
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

        naturalYtelser: z.optional(
            z.array(
                innsyn.zNaturalYtelseDto.extend({
                    periode: zDatePeriodeFromStringPeriodeFixYear9999,
                }),
            ),
        ),
        refusjon: z.optional(
            innsyn.zRefusjonDto.omit({
                // Dette feltet er utledet: "refusjonsOpphører er satt til første dato i endringerIRefusjon med beløp = 0"
                refusjonOpphører: true,
            }),
        ),
    })
    // Felter som ikke brukes i løsningen
    .omit({
        graderinger: true,
        utsettelsePerioder: true,
        innsendingsårsak: true,
        kildesystem: true,
        nærRelasjon: true,
        oppgittFravær: true,
        inntektsmeldingType: true,
    });

export const inntektsmeldingerClientSchema = z.array(inntektsmeldingClientSchema);
