import { innsyn } from '@navikt/k9-sak-innsyn-api';
import dayjs from 'dayjs';
import z from 'zod';

import { zDateFromDateTimeString, zDateFromISODateString, zDatePeriodeFromStringPeriode } from './zDateFromString';

/* ====================== Naturalytelse typer ====================== */

type NaturalYtelseBase = Omit<z.infer<typeof innsyn.zNaturalYtelseDto>, 'periode'> & {
    opptjeningsperiode: { fom: Date; tom: Date };
};

export type NaturalYtelseMister = NaturalYtelseBase & { endring: 'mister'; fom: Date };
export type NaturalYtelsMottar = NaturalYtelseBase & { endring: 'mottar'; fom: Date };
export type NaturalYtelse = NaturalYtelseMister | NaturalYtelsMottar;

type NaturalYtelseEndring = { endring: 'mister'; fom: Date } | { endring: 'mottar'; fom: Date };

/**
 * K9 bruker spesielle årstall for å angi "tidenes morgen" (0001) og "evig tid" (9999).
 * Vi utleder om bruker mister eller mottar naturalytelse basert på disse grenseverdiene.
 */
export const utledNaturalYtelseEndring = (periode: { fom: Date; tom: Date }): NaturalYtelseEndring => {
    const fomYear = periode.fom.getFullYear();
    const tomYear = periode.tom.getFullYear();

    if (fomYear === 1 && tomYear !== 9999) {
        return { endring: 'mister', fom: dayjs(periode.tom).add(1, 'day').toDate() };
    }
    if (fomYear !== 1 && tomYear === 9999) {
        return { endring: 'mottar', fom: dayjs(periode.fom).add(1, 'day').toDate() };
    }
    throw new Error('Ugyldig periode for naturalytelse');
};

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
                innsyn.zNaturalYtelseDto.extend({ periode: zDatePeriodeFromStringPeriode }).transform(
                    ({ periode, ...rest }): NaturalYtelse => ({
                        ...rest,
                        opptjeningsperiode: periode,
                        ...utledNaturalYtelseEndring(periode),
                    }),
                ),
            ),
        ),
        refusjon: z.optional(
            innsyn.zRefusjonDto.omit({
                // Fjern feltet refusjonOpphører fordi dette bare er utledet i k9: "refusjonsOpphører er satt til første dato i endringerIRefusjon med beløp = 0"
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
