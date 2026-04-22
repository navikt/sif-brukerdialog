import { isK9FormatError } from '@app/types';
import { describe, expect, it } from 'vitest';

import { verifyK9Format } from '../verifyk9Format';

const gyldigBarn = {
    fødselsdato: '2017-03-03',
    fornavn: 'NORA',
    mellomnavn: null,
    etternavn: 'Nordmann',
    aktørId: '2559652436225',
    identitetsnummer: '03831799748',
};

const gyldigArbeidstidPerioder = {
    '2022-12-01/2022-12-31': {
        jobberNormaltTimerPerDag: 'PT8H',
        faktiskArbeidTimerPerDag: 'PT4H',
    },
};

const gyldigYtelse = {
    type: 'PLEIEPENGER_SYKT_BARN',
    barn: { norskIdentitetsnummer: '00000000000', fødselsdato: null },
    søknadsperiode: ['2022-12-01/2023-05-29'],
    opptjeningAktivitet: {},
    tilsynsordning: { perioder: {} },
    lovbestemtFerie: { perioder: {} },
    utenlandsopphold: { perioder: {} },
    arbeidstid: {
        arbeidstakerList: [
            {
                organisasjonsnummer: '947064649',
                norskIdentitetsnummer: null,
                arbeidstidInfo: { perioder: gyldigArbeidstidPerioder },
            },
        ],
    },
};

const gyldigSak = {
    barn: gyldigBarn,
    søknad: {
        søknadId: 'test-id',
        versjon: '1.0.0',
        mottattDato: '2023-01-18T08:13:37.525Z',
        søker: { norskIdentitetsnummer: '00000000000' },
        ytelse: gyldigYtelse,
    },
};

const forventK9FormatError = (input: unknown): K9FormatError => {
    expect(() => verifyK9Format(input)).toThrow();
    try {
        verifyK9Format(input);
    } catch (e) {
        expect(isK9FormatError(e)).toBe(true);
        return e as K9FormatError;
    }
    throw new Error('Nådd aldri hit');
};

describe('verifyK9Format', () => {
    describe('gyldig sak', () => {
        it('returnerer true for gyldig sak', () => {
            expect(verifyK9Format(gyldigSak)).toBe(true);
        });

        it('godtar null som fødselsdato på barnet i ytelse', () => {
            expect(verifyK9Format(gyldigSak)).toBe(true);
        });

        it('godtar tom arbeidstakerList', () => {
            const sak = { ...gyldigSak, søknad: { ...gyldigSak.søknad, ytelse: { ...gyldigYtelse, arbeidstid: { arbeidstakerList: [] } } } };
            expect(verifyK9Format(sak)).toBe(true);
        });
    });

    describe('ugyldig sak – kaster K9FormatError', () => {
        it('kaster når sak ikke er et objekt', () => {
            const err = forventK9FormatError(null);
            expect(err.error).toContain('sak er ikke et objekt');
        });

        it('kaster når søknad mangler', () => {
            const err = forventK9FormatError({ barn: gyldigBarn });
            expect(err.error).toContain('søknad er ikke et objekt');
        });

        it('kaster når barn mangler fornavn', () => {
            const ugyldigBarn = { ...gyldigBarn, fornavn: undefined };
            const err = forventK9FormatError({ ...gyldigSak, barn: ugyldigBarn });
            expect(err.error).toContain('verifyK9FormatBarn');
        });

        it('kaster når ytelsestype er ugyldig', () => {
            const sak = { ...gyldigSak, søknad: { ...gyldigSak.søknad, ytelse: { ...gyldigYtelse, type: 'UKJENT' } } };
            const err = forventK9FormatError(sak);
            expect(err.error).toContain('ugyldig type');
        });

        it('kaster når søknadsperiode er ugyldig datoformat', () => {
            const sak = { ...gyldigSak, søknad: { ...gyldigSak.søknad, ytelse: { ...gyldigYtelse, søknadsperiode: ['not-a-date'] } } };
            const err = forventK9FormatError(sak);
            expect(err.error).toContain('verifySøknadsperioder');
        });

        it('kaster når arbeidstidInfo har ugyldig ISO-duration', () => {
            const ugyldigPerioder = {
                '2022-12-01/2022-12-31': {
                    jobberNormaltTimerPerDag: 'UGYLDIG',
                    faktiskArbeidTimerPerDag: 'PT4H',
                },
            };
            const sak = {
                ...gyldigSak,
                søknad: {
                    ...gyldigSak.søknad,
                    ytelse: {
                        ...gyldigYtelse,
                        arbeidstid: {
                            arbeidstakerList: [
                                {
                                    organisasjonsnummer: '947064649',
                                    norskIdentitetsnummer: null,
                                    arbeidstidInfo: { perioder: ugyldigPerioder },
                                },
                            ],
                        },
                    },
                },
            };
            const err = forventK9FormatError(sak);
            expect(err.error).toContain('verifyK9FormatArbeidstidTid');
        });

        it('kaster når arbeidstidPerioder har ugyldig datonøkkel', () => {
            const ugyldigPerioder = {
                'not-a-range': {
                    jobberNormaltTimerPerDag: 'PT8H',
                    faktiskArbeidTimerPerDag: 'PT4H',
                },
            };
            const sak = {
                ...gyldigSak,
                søknad: {
                    ...gyldigSak.søknad,
                    ytelse: {
                        ...gyldigYtelse,
                        arbeidstid: {
                            arbeidstakerList: [
                                {
                                    organisasjonsnummer: '947064649',
                                    norskIdentitetsnummer: null,
                                    arbeidstidInfo: { perioder: ugyldigPerioder },
                                },
                            ],
                        },
                    },
                },
            };
            const err = forventK9FormatError(sak);
            expect(err.error).toContain('ugyldigISODateRange');
        });
    });
});
