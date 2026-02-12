import { K9SakArbeidstidInfo } from '@app/types';
import { Duration, ISODuration, ISODurationToDuration } from '@navikt/sif-common-utils';

import {
    fjernK9SakArbeidstidMedIngenNormalarbeidstid,
    harNormalarbeidstidIK9SakArbeidstidInfo,
} from '../parseK9Format';

const faktiskISODuration: ISODuration = 'PT2H0M';
const normaltISODuration: ISODuration = 'PT7H30M';
const ingenISODuration: ISODuration = 'PT0H0M';

const faktisk: Duration = ISODurationToDuration(faktiskISODuration);
const normalt: Duration = ISODurationToDuration(normaltISODuration);
const ingenDuration: Duration = ISODurationToDuration(ingenISODuration);

describe('parseK9Format', () => {
    describe('harNormalarbeidstidIK9SakArbeidstidInfo', () => {
        it('returnerer false hvis arbeidstid er undefined eller antall perioder er 0', () => {
            expect(harNormalarbeidstidIK9SakArbeidstidInfo(undefined)).toBeFalsy();
            expect(harNormalarbeidstidIK9SakArbeidstidInfo({ perioder: {} })).toBeFalsy();
        });
        it('returnerer false hvis alle perioder har 0 i normalarbeidstid', () => {
            expect(
                harNormalarbeidstidIK9SakArbeidstidInfo({
                    perioder: {
                        '2022-01-01/2022-01-01': {
                            faktiskArbeidTimerPerDag: faktisk,
                            jobberNormaltTimerPerDag: ingenDuration,
                        },
                    },
                }),
            ).toBeFalsy();
        });
        it('returnerer true hvis minst én periode har normalarbeidstid', () => {
            expect(
                harNormalarbeidstidIK9SakArbeidstidInfo({
                    perioder: {
                        '2022-01-01/2022-01-01': {
                            faktiskArbeidTimerPerDag: faktisk,
                            jobberNormaltTimerPerDag: ingenDuration,
                        },
                        '2022-01-02/2022-01-02': {
                            faktiskArbeidTimerPerDag: faktisk,
                            jobberNormaltTimerPerDag: normalt,
                        },
                    },
                }),
            ).toBeTruthy();
        });
    });
    describe('fjernK9SakArbeidstidMedIngenNormalarbeidstid', () => {
        const arbeidstidInfoIngenArbeidEnPeriode: K9SakArbeidstidInfo = {
            perioder: {
                '2022-01-01/2022-02-01': {
                    jobberNormaltTimerPerDag: ingenDuration,
                    faktiskArbeidTimerPerDag: ingenDuration,
                },
            },
        };
        const arbeidstidInfoIngenArbeidFlerePerioder: K9SakArbeidstidInfo = {
            perioder: {
                '2022-01-01/2022-02-01': {
                    jobberNormaltTimerPerDag: ingenDuration,
                    faktiskArbeidTimerPerDag: ingenDuration,
                },
                '2022-01-02/2022-02-02': {
                    jobberNormaltTimerPerDag: ingenDuration,
                    faktiskArbeidTimerPerDag: ingenDuration,
                },
            },
        };
        const arbeidstidInfoMedArbeid: K9SakArbeidstidInfo = {
            perioder: {
                '2022-01-01/2022-02-01': {
                    jobberNormaltTimerPerDag: normalt,
                    faktiskArbeidTimerPerDag: faktisk,
                },
            },
        };

        it('Fjerner arbeidstakere med ingen normalarbeidstid, beholder den med arbeidtid', () => {
            const result = fjernK9SakArbeidstidMedIngenNormalarbeidstid({
                arbeidstakerList: [
                    {
                        organisasjonsnummer: '123',
                        arbeidstidInfo: arbeidstidInfoIngenArbeidEnPeriode,
                    },
                    {
                        organisasjonsnummer: '456',
                        arbeidstidInfo: arbeidstidInfoMedArbeid,
                    },
                ],
            });
            expect(result.arbeidstakerList?.length).toEqual(1);
        });
        it('Fjerner frilanseraktivitet med ingen normalarbeidstid - én periode', () => {
            const result = fjernK9SakArbeidstidMedIngenNormalarbeidstid({
                arbeidstakerList: [],
                frilanserArbeidstidInfo: arbeidstidInfoIngenArbeidEnPeriode,
            });
            expect(result.frilanserArbeidstidInfo).toBeUndefined();
        });
        it('Fjerner frilanseraktivitet med ingen normalarbeidstid - flere perioder', () => {
            const result = fjernK9SakArbeidstidMedIngenNormalarbeidstid({
                arbeidstakerList: [],
                frilanserArbeidstidInfo: arbeidstidInfoIngenArbeidFlerePerioder,
            });
            expect(result.frilanserArbeidstidInfo).toBeUndefined();
        });
        it('Beholder frilanseraktivitet som har normalarbeidstid', () => {
            const result = fjernK9SakArbeidstidMedIngenNormalarbeidstid({
                arbeidstakerList: [],
                frilanserArbeidstidInfo: arbeidstidInfoMedArbeid,
            });
            expect(result.frilanserArbeidstidInfo).toBeDefined();
        });
        it('Fjerner sn med ingen normalarbeidstid', () => {
            const result = fjernK9SakArbeidstidMedIngenNormalarbeidstid({
                arbeidstakerList: [],
                selvstendigNæringsdrivendeArbeidstidInfo: arbeidstidInfoIngenArbeidEnPeriode,
            });
            expect(result.selvstendigNæringsdrivendeArbeidstidInfo).toBeUndefined();
        });
        it('Beholder sn som har normalarbeidstid', () => {
            const result = fjernK9SakArbeidstidMedIngenNormalarbeidstid({
                arbeidstakerList: [],
                selvstendigNæringsdrivendeArbeidstidInfo: arbeidstidInfoMedArbeid,
            });
            expect(result.selvstendigNæringsdrivendeArbeidstidInfo).toBeDefined();
        });
    });
});
