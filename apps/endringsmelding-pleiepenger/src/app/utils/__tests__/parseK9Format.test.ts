import {
    dateRangeToISODateRange,
    Duration,
    ISODate,
    ISODateRangeToDateRange,
    ISODuration,
} from '@navikt/sif-common-utils/lib';
import { K9FormatArbeidstidPeriode } from '../../types/k9Format';
import { ArbeidstidEnkeltdagMap, Arbeidsuke } from '../../types/K9Sak';
import { parseK9FormatUtils } from '../parseK9Format';

const { getArbeidsukeDateRangeUtFraEnkeltdager, getAktivitetArbeidstidFromK9Format } = parseK9FormatUtils;

const faktisk: Duration = {
    hours: '2',
    minutes: '0',
};
const normalt: Duration = {
    hours: '7',
    minutes: '30',
};

describe('parseK9Format', () => {
    const fredagFør: ISODate = '2022-02-18';
    const mandag: ISODate = '2022-02-21';
    const tirsdag: ISODate = '2022-02-22';
    const onsdag: ISODate = '2022-02-23';
    const torsdag: ISODate = '2022-02-24';
    const fredag: ISODate = '2022-02-25';
    const søndag: ISODate = '2022-02-27';
    const mandagEtter: ISODate = '2022-02-28';

    const helArbeidsuke: ArbeidstidEnkeltdagMap = {
        [mandag]: { faktisk, normalt },
        [tirsdag]: { faktisk, normalt },
        [onsdag]: { faktisk, normalt },
        [torsdag]: { faktisk, normalt },
        [fredag]: { faktisk, normalt },
    };
    const alleDagerMedArbeidstid: ArbeidstidEnkeltdagMap = {
        ...helArbeidsuke,
        [mandagEtter]: { faktisk, normalt },
    };

    describe('getArbeidsukeDateRangeUtFraEnkeltdager', () => {
        it('returnerer riktig når det er én dag', () => {
            const result = getArbeidsukeDateRangeUtFraEnkeltdager(
                { [mandag]: { faktisk, normalt } },
                alleDagerMedArbeidstid
            );
            expect(dateRangeToISODateRange(result)).toEqual(`${mandag}/${mandag}`);
        });
        it('returnerer riktig når det er mandag til torsdag', () => {
            const result = getArbeidsukeDateRangeUtFraEnkeltdager(
                { [mandag]: { faktisk, normalt }, [torsdag]: { faktisk, normalt } },
                alleDagerMedArbeidstid
            );
            expect(dateRangeToISODateRange(result)).toEqual(`${mandag}/${torsdag}`);
        });
        it('returnerer riktig når det er onsdag til torsdag', () => {
            const result = getArbeidsukeDateRangeUtFraEnkeltdager(
                { [onsdag]: { faktisk, normalt }, [torsdag]: { faktisk, normalt } },
                alleDagerMedArbeidstid
            );
            expect(dateRangeToISODateRange(result)).toEqual(`${onsdag}/${torsdag}`);
        });
        it('returnerer onsdag til søndag når det er registrert arbeid kommende mandag', () => {
            const result = getArbeidsukeDateRangeUtFraEnkeltdager(
                { [onsdag]: { faktisk, normalt }, [fredag]: { faktisk, normalt } },
                alleDagerMedArbeidstid
            );
            expect(dateRangeToISODateRange(result)).toEqual(`${onsdag}/${søndag}`);
        });
        it('returnerer onsdag til fredag når det IKKE er registrert arbeid kommende mandag', () => {
            const result = getArbeidsukeDateRangeUtFraEnkeltdager(
                { [onsdag]: { faktisk, normalt }, [fredag]: { faktisk, normalt } },
                helArbeidsuke
            );
            expect(dateRangeToISODateRange(result)).toEqual(`${onsdag}/${fredag}`);
        });
    });

    describe('getAktivitetArbeidstidFromK9Format', () => {
        const søknadsperiode1 = ISODateRangeToDateRange(`${mandag}/${mandagEtter}`);
        const isoArbeidstid5timer: ISODuration = 'PT5H0M';
        const isoArbeidstid2timer: ISODuration = 'PT2H0M';
        const arbeidstidEnkeltdag = {
            faktiskArbeidTimerPerDag: isoArbeidstid2timer,
            jobberNormaltTimerPerDag: isoArbeidstid5timer,
        };
        const arbeidstimerResultUke = {
            normalt: {
                dag: { hours: '5', minutes: '0' },
                uke: { hours: '25', minutes: '0' },
            },
            faktisk: {
                dag: { hours: '2', minutes: '0' },
                uke: { hours: '10', minutes: '0' },
            },
        };
        const arbeidstimerResultDag = {
            normalt: {
                hours: '5',
                minutes: '0',
            },
            faktisk: {
                hours: '2',
                minutes: '0',
            },
        };

        it('returnerer blankt når det ikke er registrert noe arbeidstid', () => {
            const result = getAktivitetArbeidstidFromK9Format({}, [søknadsperiode1]);
            expect(result.arbeidsuker).toEqual({});
            expect(result.enkeltdagerMedArbeid).toEqual({});
        });
        it('returnerer blankt når arbeidsdager ikke er en del av søknadsperioder', () => {
            const arbeidstidPeriode: K9FormatArbeidstidPeriode = {
                [`${fredagFør}/${fredagFør}`]: {
                    faktiskArbeidTimerPerDag: isoArbeidstid2timer,
                    jobberNormaltTimerPerDag: isoArbeidstid5timer,
                },
            };
            const result = getAktivitetArbeidstidFromK9Format(arbeidstidPeriode, [søknadsperiode1]);
            expect(result.arbeidsuker).toEqual({});
            expect(result.enkeltdagerMedArbeid).toEqual({});
        });
        it('returnerer riktig for en arbeidsuke', () => {
            const periodeIsoDateRange = `${mandag}/${fredag}`;
            const arbeidstidPeriode: K9FormatArbeidstidPeriode = {
                [periodeIsoDateRange]: arbeidstidEnkeltdag,
            };
            const result = getAktivitetArbeidstidFromK9Format(arbeidstidPeriode, [søknadsperiode1]);
            const periode = ISODateRangeToDateRange(periodeIsoDateRange);

            const dagerSøktFor = [mandag, tirsdag, onsdag, torsdag, fredag];

            const arbeidsukeResult: Arbeidsuke = {
                isoDateRange: periodeIsoDateRange,
                periode,
                ...arbeidstimerResultUke,
                dagerSøktFor,
                meta: {
                    antallDagerMedArbeidstid: 5,
                    ukenummer: 8,
                    årstall: 2022,
                },
            };

            expect(result.arbeidsuker[periodeIsoDateRange]).toBeDefined();
            expect(result.arbeidsuker[periodeIsoDateRange]).toEqual(arbeidsukeResult);
            expect(result.enkeltdagerMedArbeid).toEqual({
                [mandag]: arbeidstimerResultDag,
                [tirsdag]: arbeidstimerResultDag,
                [onsdag]: arbeidstimerResultDag,
                [torsdag]: arbeidstimerResultDag,
                [fredag]: arbeidstimerResultDag,
            });
        });
    });
});
