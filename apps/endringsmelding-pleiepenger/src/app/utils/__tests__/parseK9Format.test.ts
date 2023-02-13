// import { Duration, ISODate } from '@navikt/sif-common-utils/lib';
// import { K9FormatArbeidstidInfoPerioder } from '../../types/k9Format';
// import { ArbeidstidEnkeltdagMap } from '../../types/K9Sak';

import { Duration, ISODuration, ISODurationToDuration } from '@navikt/sif-common-utils/lib';
import { K9FormatArbeidstid, K9FormatArbeidstidTid } from '../../types/k9Format';
import { harNormalarbeidstidIK9SakArbeidstidInfo } from '../parseK9Format';

const faktiskISODuration: ISODuration = 'PT2H0M';
const normaltISODuration: ISODuration = 'PT7H30M';
const ingenISODuration: ISODuration = 'PT0H0M';

const faktisk: Duration = ISODurationToDuration(faktiskISODuration);
const normalt: Duration = ISODurationToDuration(normaltISODuration);
const ingenDuration: Duration = ISODurationToDuration(ingenISODuration);

const arbeidstidDag: K9FormatArbeidstidTid = {
    faktiskArbeidTimerPerDag: faktiskISODuration,
    jobberNormaltTimerPerDag: normaltISODuration,
};

export const k9FormatArbeidstid: K9FormatArbeidstid = {
    arbeidstakerList: [],
    frilanserArbeidstidInfo: {
        perioder: { '2020-01-01/2020-01-02': arbeidstidDag },
    },
    selvstendigNæringsdrivendeArbeidstidInfo: {},
};

describe('parseK9Format', () => {
    describe('harNormalarbeidstidIK9SakArbeidstidInfo', () => {
        it('returnerer false dersom arbeidstid er undefined eller antall perioder er 0', () => {
            expect(harNormalarbeidstidIK9SakArbeidstidInfo(undefined)).toBeFalsy();
            expect(harNormalarbeidstidIK9SakArbeidstidInfo({ perioder: {} })).toBeFalsy();
        });
        it('returnerer false dersom alle perioder har 0 i normalarbeidstid', () => {
            expect(
                harNormalarbeidstidIK9SakArbeidstidInfo({
                    perioder: {
                        '2022-01-01/2022-01-01': {
                            faktiskArbeidTimerPerDag: faktisk,
                            jobberNormaltTimerPerDag: ingenDuration,
                        },
                    },
                })
            ).toBeFalsy();
        });
        it('returnerer true dersom minst én periode har normalarbeidstid', () => {
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
                })
            ).toBeTruthy();
        });
    });
    it('harNormalarbeidstidIK9SakArbeidstidInfo', () => {
        expect('TODO').toEqual('TODO');
    });
    // const fredagFør: ISODate = '2022-02-18';
    // const mandag: ISODate = '2022-02-21';
    // const tirsdag: ISODate = '2022-02-22';
    // const onsdag: ISODate = '2022-02-23';
    // const torsdag: ISODate = '2022-02-24';
    // const fredag: ISODate = '2022-02-25';
    // // const søndag: ISODate = '2022-02-27';
    // const mandagEtter: ISODate = '2022-02-28';

    // const helArbeidsuke: ArbeidstidEnkeltdagMap = {
    //     [mandag]: { faktisk, normalt },
    //     [tirsdag]: { faktisk, normalt },
    //     [onsdag]: { faktisk, normalt },
    //     [torsdag]: { faktisk, normalt },
    //     [fredag]: { faktisk, normalt },
    // };
    // const alleDagerMedArbeidstid: ArbeidstidEnkeltdagMap = {
    //     ...helArbeidsuke,
    //     [mandagEtter]: { faktisk, normalt },
    // };

    // describe('getArbeidsukeDateRangeUtFraEnkeltdager', () => {
    //     it('returnerer riktig når det er én dag', () => {
    //         const result = getArbeidsukeDateRangeUtFraEnkeltdager(
    //             { [mandag]: { faktisk, normalt } },
    //             alleDagerMedArbeidstid
    //         );
    //         expect(dateRangeToISODateRange(result)).toEqual(`${mandag}/${mandag}`);
    //     });
    //     it('returnerer riktig når det er mandag til torsdag', () => {
    //         const result = getArbeidsukeDateRangeUtFraEnkeltdager(
    //             { [mandag]: { faktisk, normalt }, [torsdag]: { faktisk, normalt } },
    //             alleDagerMedArbeidstid
    //         );
    //         expect(dateRangeToISODateRange(result)).toEqual(`${mandag}/${torsdag}`);
    //     });
    //     it('returnerer riktig når det er onsdag til torsdag', () => {
    //         const result = getArbeidsukeDateRangeUtFraEnkeltdager(
    //             { [onsdag]: { faktisk, normalt }, [torsdag]: { faktisk, normalt } },
    //             alleDagerMedArbeidstid
    //         );
    //         expect(dateRangeToISODateRange(result)).toEqual(`${onsdag}/${torsdag}`);
    //     });
    //     it('returnerer onsdag til søndag når det er registrert arbeid kommende mandag', () => {
    //         const result = getArbeidsukeDateRangeUtFraEnkeltdager(
    //             { [onsdag]: { faktisk, normalt }, [fredag]: { faktisk, normalt } },
    //             alleDagerMedArbeidstid
    //         );
    //         expect(dateRangeToISODateRange(result)).toEqual(`${onsdag}/${søndag}`);
    //     });
    //     it('returnerer onsdag til fredag når det IKKE er registrert arbeid kommende mandag', () => {
    //         const result = getArbeidsukeDateRangeUtFraEnkeltdager(
    //             { [onsdag]: { faktisk, normalt }, [fredag]: { faktisk, normalt } },
    //             helArbeidsuke
    //         );
    //         expect(dateRangeToISODateRange(result)).toEqual(`${onsdag}/${fredag}`);
    //     });
    // });

    // describe('getAktivitetArbeidstidFromK9Format', () => {
    //     const søknadsperiode1 = ISODateRangeToDateRange(`${mandag}/${mandagEtter}`);
    //     const isoArbeidstid5timer: ISODuration = 'PT5H0M';
    //     const isoArbeidstid2timer: ISODuration = 'PT2H0M';
    //     const arbeidstidEnkeltdag = {
    //         faktiskArbeidTimerPerDag: isoArbeidstid2timer,
    //         jobberNormaltTimerPerDag: isoArbeidstid5timer,
    //     };
    //     const arbeidstimerResultUke = {
    //         normalt: {
    //             dag: { hours: '5', minutes: '0' },
    //             uke: { hours: '25', minutes: '0' },
    //         },
    //         faktisk: {
    //             dag: { hours: '2', minutes: '0' },
    //             uke: { hours: '10', minutes: '0' },
    //         },
    //     };
    //     const arbeidstimerResultDag = {
    //         normalt: {
    //             hours: '5',
    //             minutes: '0',
    //         },
    //         faktisk: {
    //             hours: '2',
    //             minutes: '0',
    //         },
    //     };

    //     it('returnerer blankt når det ikke er registrert noe arbeidstid', () => {
    //         const result = getAktivitetArbeidstidFromK9Format({}, [søknadsperiode1]);
    //         expect(result.arbeidsuker).toEqual({});
    //         expect(result.enkeltdagerMedArbeid).toEqual({});
    //     });
    //     it('returnerer blankt når arbeidsdager ikke er en del av søknadsperioder', () => {
    //         const arbeidstidPeriode: K9FormatArbeidstidInfoPerioder = {
    //             [`${fredagFør}/${fredagFør}`]: {
    //                 faktiskArbeidTimerPerDag: isoArbeidstid2timer,
    //                 jobberNormaltTimerPerDag: isoArbeidstid5timer,
    //             },
    //         };
    //         const result = getAktivitetArbeidstidFromK9Format(arbeidstidPeriode, [søknadsperiode1]);
    //         expect(result.arbeidsuker).toEqual({});
    //         expect(result.enkeltdagerMedArbeid).toEqual({});
    //     });
    //     it('returnerer riktig for en arbeidsuke', () => {
    //         const periodeIsoDateRange = `${mandag}/${fredag}`;
    //         const arbeidstidPeriode: K9FormatArbeidstidInfoPerioder = {
    //             [periodeIsoDateRange]: arbeidstidEnkeltdag,
    //         };
    //         const result = getAktivitetArbeidstidFromK9Format(arbeidstidPeriode, [søknadsperiode1]);
    //         const periode = ISODateRangeToDateRange(periodeIsoDateRange);

    //         const dagerSøktFor = [mandag, tirsdag, onsdag, torsdag, fredag];
    //         const arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap = {};
    //         dagerSøktFor.forEach((isoDate) => {
    //             arbeidstidEnkeltdager[isoDate] = {
    //                 ...arbeidstimerResultDag,
    //             };
    //         });

    //         const arbeidsukeResult: Arbeidsuke = {
    //             isoDateRange: periodeIsoDateRange,
    //             periode,
    //             ...arbeidstimerResultUke,
    //             arbeidstidEnkeltdager,
    //             antallDagerMedArbeidstid: 5,
    //         };

    //         expect(result.arbeidsuker[periodeIsoDateRange]).toBeDefined();
    //         expect(result.arbeidsuker[periodeIsoDateRange]).toEqual(arbeidsukeResult);
    //         expect(result.enkeltdagerMedArbeid).toEqual({
    //             [mandag]: arbeidstimerResultDag,
    //             [tirsdag]: arbeidstimerResultDag,
    //             [onsdag]: arbeidstimerResultDag,
    //             [torsdag]: arbeidstimerResultDag,
    //             [fredag]: arbeidstimerResultDag,
    //         });
    //     });
    // });

    // describe("getPerioderFraArbeidstidPerioder", () => {
    //     it("virker", () => {
    //         const result = getPerioderFraArbeidstidPerioder(mock);
    //     })

    // });
});
