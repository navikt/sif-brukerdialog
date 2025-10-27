import { vi } from 'vitest';
import { Duration } from '@navikt/sif-common-utils';
import { erRedusertArbeidstid, harFraværAlleEnkeltdager, harFraværIPeriode } from '../form-parts/arbeidstidUtils';
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

type TestArbeidFormValues = {
    [ArbeidstidFormFields.ansattArbeidstid]?: Array<{
        organisasjonsnummer: string;
        navn: string;
        jobberNormaltTimer: number;
        arbeidIPeriode?: ArbeidIPeriode;
    }>;
    [ArbeidstidFormFields.frilansArbeidstid]?: {
        type: ArbeidsaktivitetType;
        jobberNormaltTimer: number;
        arbeidIPeriode?: ArbeidIPeriode;
    };
    [ArbeidstidFormFields.selvstendigArbeidstid]?: {
        type: ArbeidsaktivitetType;
        jobberNormaltTimer: number;
        arbeidIPeriode?: ArbeidIPeriode;
    };
};

describe('arbeidstidUtils', () => {
    describe('erRedusertArbeidstid', () => {
        it('returnerer true når arbeidstiden er mindre enn 7.5 timer', () => {
            const duration: Duration = { hours: '6', minutes: '0' };
            expect(erRedusertArbeidstid(duration)).toBe(true);
        });

        it('returnerer true når arbeidstiden er akkurat under 7.5 timer', () => {
            const duration: Duration = { hours: '7', minutes: '29' };
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

        it('returnerer false når arbeidstiden er mye mer enn 7.5 timer', () => {
            const duration: Duration = { hours: '10', minutes: '30' };
            expect(erRedusertArbeidstid(duration)).toBe(false);
        });

        it('returnerer true når bare minutter er oppgitt og under 7.5 timer', () => {
            const duration: Duration = { hours: '0', minutes: '300' }; // 5 timer
            expect(erRedusertArbeidstid(duration)).toBe(true);
        });

        it('returnerer false når bare minutter er oppgitt og over 7.5 timer', () => {
            const duration: Duration = { hours: '0', minutes: '480' }; // 8 timer
            expect(erRedusertArbeidstid(duration)).toBe(false);
        });

        it('returnerer false når duration er undefined', () => {
            expect(erRedusertArbeidstid(undefined as any)).toBe(false);
        });

        it('returnerer false når duration er null', () => {
            expect(erRedusertArbeidstid(null as any)).toBe(false);
        });

        it('returnerer true når arbeidstiden er 0', () => {
            const duration: Duration = { hours: '0', minutes: '0' };
            expect(erRedusertArbeidstid(duration)).toBe(true);
        });
    });

    describe('harFraværAlleEnkeltdager', () => {
        it('returnerer false når ingen arbeidstid er oppgitt', () => {
            const values: TestArbeidFormValues = {};
            expect(harFraværAlleEnkeltdager(values)).toBe(false);
        });

        it('returnerer false når arbeidstid ikke har redusert periode', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                        },
                    },
                ],
            };
            expect(harFraværAlleEnkeltdager(values)).toBe(false);
        });

        it('returnerer false når redusert periode ikke har enkeltdager', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.redusert,
                        },
                    },
                ],
            };
            expect(harFraværAlleEnkeltdager(values)).toBe(false);
        });

        it('returnerer true når alle enkeltdager har redusert arbeidstid i ansatt forhold', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.redusert,
                            enkeltdager: {
                                '2024-01-01': { hours: '6', minutes: '0' }, // Redusert
                                '2024-01-02': { hours: '5', minutes: '30' }, // Redusert
                            },
                        },
                    },
                ],
            };
            expect(harFraværAlleEnkeltdager(values)).toBe(true);
        });

        it('returnerer false når noen enkeltdager har full arbeidstid', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.redusert,
                            enkeltdager: {
                                '2024-01-01': { hours: '6', minutes: '0' }, // Redusert
                                '2024-01-02': { hours: '7', minutes: '30' }, // Full dag
                            },
                        },
                    },
                ],
            };
            expect(harFraværAlleEnkeltdager(values)).toBe(false);
        });

        it('returnerer false når alle enkeltdager har full arbeidstid', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.redusert,
                            enkeltdager: {
                                '2024-01-01': { hours: '7', minutes: '30' }, // Full dag
                                '2024-01-02': { hours: '8', minutes: '0' }, // Over full dag
                            },
                        },
                    },
                ],
            };
            expect(harFraværAlleEnkeltdager(values)).toBe(false);
        });

        it('returnerer true når frilanser har enkeltdager med redusert arbeidstid', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.frilansArbeidstid]: {
                    type: ArbeidsaktivitetType.frilanser,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.redusert,
                        enkeltdager: {
                            '2024-01-01': { hours: '5', minutes: '0' }, // Redusert
                        },
                    },
                },
            };
            expect(harFraværAlleEnkeltdager(values)).toBe(true);
        });

        it('returnerer true når selvstendig har enkeltdager med redusert arbeidstid', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.selvstendigArbeidstid]: {
                    type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.redusert,
                        enkeltdager: {
                            '2024-01-01': { hours: '4', minutes: '0' }, // Redusert
                        },
                    },
                },
            };
            expect(harFraværAlleEnkeltdager(values)).toBe(true);
        });

        it('returnerer true når alle arbeidsforhold har alle enkeltdager med redusert arbeidstid', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.redusert,
                            enkeltdager: {
                                '2024-01-01': { hours: '6', minutes: '0' }, // Redusert
                            },
                        },
                    },
                ],
                [ArbeidstidFormFields.frilansArbeidstid]: {
                    type: ArbeidsaktivitetType.frilanser,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.redusert,
                        enkeltdager: {
                            '2024-01-01': { hours: '3', minutes: '0' }, // Redusert
                        },
                    },
                },
            };
            expect(harFraværAlleEnkeltdager(values)).toBe(true);
        });

        it('returnerer false når ett arbeidsforhold har full arbeidsdag', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.redusert,
                            enkeltdager: {
                                '2024-01-01': { hours: '7', minutes: '30' }, // Full dag
                            },
                        },
                    },
                ],
                [ArbeidstidFormFields.frilansArbeidstid]: {
                    type: ArbeidsaktivitetType.frilanser,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.redusert,
                        enkeltdager: {
                            '2024-01-01': { hours: '3', minutes: '0' }, // Redusert
                        },
                    },
                },
            };
            expect(harFraværAlleEnkeltdager(values)).toBe(false);
        });

        it('returnerer true når enkeltdag har 0 timer (helt fravær)', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.redusert,
                            enkeltdager: {
                                '2024-01-01': { hours: '0', minutes: '0' }, // Helt fravær
                            },
                        },
                    },
                ],
            };
            expect(harFraværAlleEnkeltdager(values)).toBe(true);
        });
    });

    describe('harFraværIPeriode', () => {
        it('returnerer false når ingen arbeidstid er oppgitt', () => {
            const values: TestArbeidFormValues = {};
            expect(harFraværIPeriode(values)).toBe(false);
        });

        it('returnerer false når alle arbeidsforhold jobber som vanlig', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                        },
                    },
                ],
                [ArbeidstidFormFields.frilansArbeidstid]: {
                    type: ArbeidsaktivitetType.frilanser,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                    },
                },
            };
            expect(harFraværIPeriode(values)).toBe(false);
        });

        it('returnerer true når ansatt har redusert arbeidstid', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.redusert,
                        },
                    },
                ],
            };
            expect(harFraværIPeriode(values)).toBe(true);
        });

        it('returnerer true når ansatt har helt fravær', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                        },
                    },
                ],
            };
            expect(harFraværIPeriode(values)).toBe(true);
        });

        it('returnerer true når frilanser har redusert arbeidstid', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.frilansArbeidstid]: {
                    type: ArbeidsaktivitetType.frilanser,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.redusert,
                    },
                },
            };
            expect(harFraværIPeriode(values)).toBe(true);
        });

        it('returnerer true når frilanser har helt fravær', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.frilansArbeidstid]: {
                    type: ArbeidsaktivitetType.frilanser,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                    },
                },
            };
            expect(harFraværIPeriode(values)).toBe(true);
        });

        it('returnerer true når selvstendig har redusert arbeidstid', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.selvstendigArbeidstid]: {
                    type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.redusert,
                    },
                },
            };
            expect(harFraværIPeriode(values)).toBe(true);
        });

        it('returnerer true når selvstendig har helt fravær', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.selvstendigArbeidstid]: {
                    type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                    },
                },
            };
            expect(harFraværIPeriode(values)).toBe(true);
        });

        it('returnerer true når flere ansatte arbeidsforhold og ett har fravær', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                        },
                    },
                    {
                        organisasjonsnummer: '987654321',
                        navn: 'Annet AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.redusert,
                        },
                    },
                ],
            };
            expect(harFraværIPeriode(values)).toBe(true);
        });

        it('returnerer true når flere typer arbeidsforhold og ett har fravær', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        arbeidIPeriode: {
                            jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                        },
                    },
                ],
                [ArbeidstidFormFields.frilansArbeidstid]: {
                    type: ArbeidsaktivitetType.frilanser,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.heltFravær,
                    },
                },
                [ArbeidstidFormFields.selvstendigArbeidstid]: {
                    type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
                    jobberNormaltTimer: 7.5,
                    arbeidIPeriode: {
                        jobberIPerioden: JobberIPeriodeSvar.somVanlig,
                    },
                },
            };
            expect(harFraværIPeriode(values)).toBe(true);
        });

        it('returnerer false når ansatt arbeidsforhold ikke har arbeidIPeriode', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.ansattArbeidstid]: [
                    {
                        organisasjonsnummer: '123456789',
                        navn: 'Test AS',
                        jobberNormaltTimer: 7.5,
                        // Ingen arbeidIPeriode
                    },
                ],
            };
            expect(harFraværIPeriode(values)).toBe(false);
        });

        it('returnerer false når frilanser ikke har arbeidIPeriode', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.frilansArbeidstid]: {
                    type: ArbeidsaktivitetType.frilanser,
                    jobberNormaltTimer: 7.5,
                    // Ingen arbeidIPeriode
                },
            };
            expect(harFraværIPeriode(values)).toBe(false);
        });

        it('returnerer false når selvstendig ikke har arbeidIPeriode', () => {
            const values: TestArbeidFormValues = {
                [ArbeidstidFormFields.selvstendigArbeidstid]: {
                    type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
                    jobberNormaltTimer: 7.5,
                    // Ingen arbeidIPeriode
                },
            };
            expect(harFraværIPeriode(values)).toBe(false);
        });
    });
});
