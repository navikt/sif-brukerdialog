import { innsyn } from '@navikt/k9-sak-innsyn-api';
import dayjs from 'dayjs';
import z from 'zod';

import { zDateFromDateTimeString, zDateFromISODateString, zDatePeriodeFromStringPeriode } from './zDateFromString';

/* ====================== Naturalytelse typer ====================== */

type NaturalYtelseBase = Omit<z.infer<typeof innsyn.zNaturalYtelseDto>, 'periode'> & {
    opptjeningsperiode: { fom: Date; tom: Date };
};

export type NaturalYtelseMister = NaturalYtelseBase & {
    endring: 'mister';
    fom: Date;
};

export type NaturalYtelsMottar = NaturalYtelseBase & {
    endring: 'mottar';
    fom: Date;
};

export type NaturalYtelse = NaturalYtelseMister | NaturalYtelsMottar;

/* ====================== Inntektsmelding(er) ====================== */

/**
 * Perioden som kommer fra K9 er periode for opptjening av naturalytelse. Når vi skal vise
 * det motsatte, altså når brukeren mister eller mottar naturalytelse, må vi tolke perioden
 * fra naturalytelsene og finne datoen for når en mister eller for når en igjen
 * mottar naturalytelsen.
 * Det er to unike datoer i k9:
 * fom === 1901 -> Dette er en ytelsen en mottar fra "tidenens morgen"
 * tom === 9999 -> Dette er en ytelsen en mottar til "evig tid"
 * @param periode Periode hvor en mottar naturalytelse
 * @param rest Resten av naturalytelse-objektet
 * @returns NaturalYtelse med enten misterFom eller mottarFom basert på endring
 */
const utledMisterEllerMottarNaturalytelse = (
    periode: { fom: Date; tom: Date },
    rest: Omit<z.infer<typeof innsyn.zNaturalYtelseDto>, 'periode'>,
): NaturalYtelse => {
    const fomYear = periode.fom.getFullYear();
    const tomYear = periode.tom.getFullYear();

    const baseData = {
        ...rest,
        opptjeningsperiode: periode,
    };

    /**
     * Hvis fom er 1901, betyr det at ytelsen mottas fra "tidenes morgen", og dermed
     * mister en ytelsen dagen etter tom-datoen.
     */
    if (fomYear === 1901 && tomYear !== 9999) {
        return {
            ...baseData,
            endring: 'mister',
            fom: dayjs(periode.tom).add(1, 'day').toDate(),
        } satisfies NaturalYtelseMister;
    }
    if (fomYear !== 1901 && tomYear === 9999) {
        return {
            ...baseData,
            endring: 'mottar',
            fom: dayjs(periode.fom).add(1, 'day').toDate(),
        } satisfies NaturalYtelsMottar;
    }
    throw new Error(
        'Ugyldig periode for naturalytelse: Kan ikke utlede dato for når en mister eller mottar naturalytelse',
    );
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
                innsyn.zNaturalYtelseDto
                    .extend({
                        periode: zDatePeriodeFromStringPeriode,
                    })
                    .transform((value): NaturalYtelse => {
                        const { periode, ...rest } = value;
                        return utledMisterEllerMottarNaturalytelse(periode, rest);
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
