import {
    DateRange,
    dateToISODate,
    Duration,
    ISODateRangeToDateRange,
    ISODateToDate,
    ISODuration,
    ISODurationToDuration,
} from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver } from '../../types/Arbeidsgiver';
import { K9SakArbeidstidPeriodeMap } from '../../types/K9Sak';
import { _getSakFromK9Sak } from '../getSakFromK9Sak';

const { getEndringsperiodeForArbeidsgiver, trimArbeidstidTilTillattEndringsperiode } = _getSakFromK9Sak;

const faktiskISODuration: ISODuration = 'PT2H0M';
const normaltISODuration: ISODuration = 'PT7H30M';
// const ingenISODuration: ISODuration = 'PT0H0M';

const faktiskArbeidTimerPerDag: Duration = ISODurationToDuration(faktiskISODuration);
const jobberNormaltTimerPerDag: Duration = ISODurationToDuration(normaltISODuration);
// const ingenDuration: Duration = ISODurationToDuration(ingenISODuration);

// const sakArbeidstid: K9SakArbeidstid = {
//     arbeidstakerList: [
//         {
//             norskIdentitetsnummer: '123',
//             organisasjonsnummer: '123',
//             arbeidstidInfo: {
//                 perioder: {
//                     '2022-01-01/2022-02-01': {
//                         faktiskArbeidTimerPerDag,
//                         jobberNormaltTimerPerDag,
//                     },
//                 },
//             },
//         },
//     ],
//     frilanserArbeidstidInfo: undefined,
//     selvstendigNæringsdrivendeArbeidstidInfo: undefined,
// };

describe('getSakFromK9Sak', () => {
    describe('getEndringsperiodeForArbeidsgiver', () => {
        const isoFrom = '2022-01-01';
        const isoTo = '2022-02-01';
        const isoSluttdato = '2022-01-15';

        const endringsperiode: DateRange = { from: ISODateToDate(isoFrom), to: ISODateToDate(isoTo) };
        it('beholder uendret endringsperiode dersom bruker er fortsatt ansatt', () => {
            const result = getEndringsperiodeForArbeidsgiver(endringsperiode, {
                ansattTom: undefined,
            } as Arbeidsgiver);
            expect(dateToISODate(result.from)).toEqual(isoFrom);
            expect(dateToISODate(result.to)).toEqual(isoTo);
        });
        it('justerer endringsperiode dersom sluttdato er før endringsperiode sluttdato', () => {
            const result = getEndringsperiodeForArbeidsgiver(endringsperiode, {
                ansattTom: ISODateToDate(isoSluttdato),
            } as Arbeidsgiver);
            expect(dateToISODate(result.from)).toEqual(isoFrom);
            expect(dateToISODate(result.to)).toEqual(isoSluttdato);
        });
    });

    describe('trimArbeidstidTilTillattEndringsperiode', () => {
        const isoPeriode1 = '2022-01-01/2022-01-14';
        const isoPeriode2 = '2022-01-15/2022-02-01';

        const perioder: K9SakArbeidstidPeriodeMap = {
            [isoPeriode1]: {
                faktiskArbeidTimerPerDag,
                jobberNormaltTimerPerDag,
            },
            [isoPeriode2]: {
                faktiskArbeidTimerPerDag,
                jobberNormaltTimerPerDag,
            },
        };
        it('beholder alle perioder når endringsperioden er større enn perioder på sak', () => {
            const tillattPeriode = ISODateRangeToDateRange('2021-12-31/2022-02-02');
            const result = trimArbeidstidTilTillattEndringsperiode(perioder, tillattPeriode);
            const keys = Object.keys(result);
            expect(keys[0]).toEqual(isoPeriode1);
            expect(keys[1]).toEqual(isoPeriode2);
        });
        it('endrer startdato i en periode dersom endringsperioden ikke dekker hele perioden', () => {
            const tillattPeriode = ISODateRangeToDateRange('2022-01-05/2022-02-02');
            const result = trimArbeidstidTilTillattEndringsperiode(perioder, tillattPeriode);
            const keys = Object.keys(result);
            expect(keys[0]).toEqual('2022-01-05/2022-01-14');
            expect(keys[1]).toEqual(isoPeriode2);
        });
        it('endrer start og sluttdato dersom endringsperioden ikke dekker alle perioder', () => {
            const tillattPeriode = ISODateRangeToDateRange('2022-01-05/2022-01-18');
            const result = trimArbeidstidTilTillattEndringsperiode(perioder, tillattPeriode);
            const keys = Object.keys(result);
            expect(keys[0]).toEqual('2022-01-05/2022-01-14');
            expect(keys[1]).toEqual('2022-01-15/2022-01-18');
        });
        it('returnerer tomt objekt dersom alle perioder er utenfor endringsperiode', () => {
            const tillattPeriode = ISODateRangeToDateRange('2022-02-02/2022-02-03');
            const result = trimArbeidstidTilTillattEndringsperiode(perioder, tillattPeriode);
            expect(Object.keys(result)).toHaveLength(0);
        });
    });
});
