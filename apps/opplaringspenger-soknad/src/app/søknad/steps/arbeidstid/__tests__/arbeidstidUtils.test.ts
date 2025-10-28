import { vi } from 'vitest';
import { Duration } from '@navikt/sif-common-utils';
import {
    erRedusertArbeidstid,
    getAlleArbeidIPerioder,
    cleanArbeidIPerioder,
    harKunValgtJobberSomNormalt,
    getDagerMedArbeidstid,
    harFraværAlleDager,
} from '../form-parts/arbeidstidUtils';
import { JobberIPeriodeSvar, ArbeidIPeriode } from '../ArbeidstidTypes';
import { ArbeidstidFormFields, ArbeidsaktivitetType } from '../ArbeidstidStep';

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => 'mockedApiUrl',
        getMaybeEnv: () => 'mockedApiUrl',
        getCommonEnv: () => ({}),
        getK9SakInnsynEnv: () => ({}),
    };
});

describe('arbeidstidUtils', () => {
    describe('erRedusertArbeidstid', () => {
        it('returnerer true når arbeidstiden er mindre enn 7.5 timer', () => {
            const duration: Duration = { hours: '6', minutes: '0' };
            expect(erRedusertArbeidstid(duration)).toBe(true);
        });

        it('returnerer false når arbeidstiden er akkurat 7.5 timer', () => {
            const duration: Duration = { hours: '7', minutes: '30' };
            expect(erRedusertArbeidstid(duration)).toBe(false);
        });

        it('returnerer false når arbeidstiden er mer enn 7.5 timer', () => {
            const duration: Duration = { hours: '8', minutes: '0' };
            expect(erRedusertArbeidstid(duration)).toBe(false);
        });

        it('returnerer false når duration er undefined', () => {
            expect(erRedusertArbeidstid(undefined as any)).toBe(false);
        });

        it('returnerer true når arbeidstiden er 0', () => {
            const duration: Duration = { hours: '0', minutes: '0' };
            expect(erRedusertArbeidstid(duration)).toBe(true);
        });
    });

    describe('getAlleArbeidIPerioder', () => {
        it('returnerer tom array når ingen arbeidstid er oppgitt', () => {
            const values = {};
            expect(getAlleArbeidIPerioder(values)).toEqual([]);
        });

        it('returnerer arbeidsperioder fra ansatt arbeidsforhold', () => {
            const arbeidIPeriode: ArbeidIPeriode = { jobberIPerioden: JobberIPeriodeSvar.somVanlig };
            const values = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode,
                    },
                ],
            };
            expect(getAlleArbeidIPerioder(values)).toEqual([arbeidIPeriode]);
        });

        it('returnerer arbeidsperioder fra alle typer arbeidsforhold', () => {
            const ansattPeriode: ArbeidIPeriode = { jobberIPerioden: JobberIPeriodeSvar.somVanlig };
            const frilansPeriode: ArbeidIPeriode = { jobberIPerioden: JobberIPeriodeSvar.redusert };
            const selvstendigPeriode: ArbeidIPeriode = { jobberIPerioden: JobberIPeriodeSvar.heltFravær };

            const values = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: ansattPeriode,
                    },
                ],
                [ArbeidstidFormFields.frilansArbeidstid]: {
                    type: ArbeidsaktivitetType.frilanser,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: frilansPeriode,
                },
                [ArbeidstidFormFields.selvstendigArbeidstid]: {
                    type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: selvstendigPeriode,
                },
            };
            expect(getAlleArbeidIPerioder(values)).toEqual([ansattPeriode, frilansPeriode, selvstendigPeriode]);
        });

        it('filtrerer bort arbeidsforhold uten arbeidIPeriode', () => {
            const values = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        // Ingen arbeidIPeriode
                    },
                ],
            };
            expect(getAlleArbeidIPerioder(values)).toEqual([]);
        });
    });

    describe('cleanArbeidIPerioder', () => {
        it('fjerner enkeltdager fra perioder som ikke har redusert arbeidstid', () => {
            const perioder: ArbeidIPeriode[] = [
                {
                    jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                    enkeltdager: {
                        '2024-01-01': { hours: '6', minutes: '0' },
                    },
                },
                {
                    jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                    enkeltdager: {
                        '2024-01-02': { hours: '0', minutes: '0' },
                    },
                },
            ];

            const result = cleanArbeidIPerioder(perioder);

            expect(result).toEqual([
                {
                    jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                    enkeltdager: undefined,
                },
                {
                    jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                    enkeltdager: undefined,
                },
            ]);
        });

        it('beholder enkeltdager for perioder med redusert arbeidstid', () => {
            const enkeltdager = {
                '2024-01-01': { hours: '6', minutes: '0' },
                '2024-01-02': { hours: '4', minutes: '30' },
            };
            const perioder: ArbeidIPeriode[] = [
                {
                    jobberIPerioden: JobberIPeriodeSvar.redusert,
                    enkeltdager,
                },
            ];

            const result = cleanArbeidIPerioder(perioder);

            expect(result).toEqual([
                {
                    jobberIPerioden: JobberIPeriodeSvar.redusert,
                    enkeltdager,
                },
            ]);
        });

        it('håndterer blandede perioder korrekt', () => {
            const redusertEnkeltdager = {
                '2024-01-01': { hours: '5', minutes: '0' },
            };
            const perioder: ArbeidIPeriode[] = [
                {
                    jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                    enkeltdager: {
                        '2024-01-01': { hours: '7', minutes: '30' },
                    },
                },
                {
                    jobberIPerioden: JobberIPeriodeSvar.redusert,
                    enkeltdager: redusertEnkeltdager,
                },
                {
                    jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                    enkeltdager: {
                        '2024-01-03': { hours: '0', minutes: '0' },
                    },
                },
            ];

            const result = cleanArbeidIPerioder(perioder);

            expect(result).toEqual([
                {
                    jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                    enkeltdager: undefined,
                },
                {
                    jobberIPerioden: JobberIPeriodeSvar.redusert,
                    enkeltdager: redusertEnkeltdager,
                },
                {
                    jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                    enkeltdager: undefined,
                },
            ]);
        });
    });

    describe('harKunValgtJobberSomNormalt', () => {
        it('returnerer false når ingen arbeidsperioder er oppgitt', () => {
            expect(harKunValgtJobberSomNormalt([])).toBe(false);
        });

        it('returnerer true når alle arbeidsperioder har valgt "som vanlig"', () => {
            const perioder: ArbeidIPeriode[] = [
                { jobberIPerioden: JobberIPeriodeSvar.somVanlig },
                { jobberIPerioden: JobberIPeriodeSvar.somVanlig },
            ];
            expect(harKunValgtJobberSomNormalt(perioder)).toBe(true);
        });

        it('returnerer false når noen arbeidsperioder ikke har valgt "som vanlig"', () => {
            const perioder: ArbeidIPeriode[] = [
                { jobberIPerioden: JobberIPeriodeSvar.somVanlig },
                { jobberIPerioden: JobberIPeriodeSvar.redusert },
            ];
            expect(harKunValgtJobberSomNormalt(perioder)).toBe(false);
        });
    });

    describe('getDagerMedArbeidstid', () => {
        it('returnerer tom array når ingen arbeidsperioder har enkeltdager', () => {
            const perioder: ArbeidIPeriode[] = [{ jobberIPerioden: JobberIPeriodeSvar.redusert }];
            expect(getDagerMedArbeidstid(perioder)).toEqual([]);
        });

        it('returnerer enkeltdager fra arbeidsperioder', () => {
            const dag1: Duration = { hours: '6', minutes: '0' };
            const dag2: Duration = { hours: '4', minutes: '30' };
            const perioder: ArbeidIPeriode[] = [
                {
                    jobberIPerioden: JobberIPeriodeSvar.redusert,
                    enkeltdager: {
                        '2024-01-01': dag1,
                        '2024-01-02': dag2,
                    },
                },
            ];
            expect(getDagerMedArbeidstid(perioder)).toEqual([dag1, dag2]);
        });

        it('flater ut enkeltdager fra flere arbeidsperioder', () => {
            const dag1: Duration = { hours: '6', minutes: '0' };
            const dag2: Duration = { hours: '4', minutes: '30' };
            const dag3: Duration = { hours: '5', minutes: '0' };
            const perioder: ArbeidIPeriode[] = [
                {
                    jobberIPerioden: JobberIPeriodeSvar.redusert,
                    enkeltdager: {
                        '2024-01-01': dag1,
                        '2024-01-02': dag2,
                    },
                },
                {
                    jobberIPerioden: JobberIPeriodeSvar.redusert,
                    enkeltdager: {
                        '2024-01-03': dag3,
                    },
                },
            ];
            expect(getDagerMedArbeidstid(perioder)).toEqual([dag1, dag2, dag3]);
        });
    });

    describe('harFraværAlleDager', () => {
        it('returnerer true når ingen dager er oppgitt', () => {
            expect(harFraværAlleDager([])).toBe(true);
        });

        it('returnerer true når alle dager har redusert arbeidstid', () => {
            const dager: Duration[] = [
                { hours: '6', minutes: '0' },
                { hours: '5', minutes: '30' },
                { hours: '4', minutes: '0' },
            ];
            expect(harFraværAlleDager(dager)).toBe(true);
        });

        it('returnerer false når noen dager har full arbeidstid', () => {
            const dager: Duration[] = [
                { hours: '6', minutes: '0' },
                { hours: '7', minutes: '30' }, // Full dag
                { hours: '4', minutes: '0' },
            ];
            expect(harFraværAlleDager(dager)).toBe(false);
        });

        it('returnerer true når alle dager har 0 timer (helt fravær)', () => {
            const dager: Duration[] = [
                { hours: '0', minutes: '0' },
                { hours: '0', minutes: '0' },
            ];
            expect(harFraværAlleDager(dager)).toBe(true);
        });
    });
});
