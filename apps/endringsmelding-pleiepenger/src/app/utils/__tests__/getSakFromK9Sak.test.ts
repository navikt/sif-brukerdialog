import { DateRange, dateToISODate, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver } from '../../types/Arbeidsgiver';
import { K9SakArbeidstid } from '../../types/K9Sak';
import { _getSakFromK9Sak } from '../getSakFromK9Sak';

const { getEndringsperiodeForArbeidsgiver } = _getSakFromK9Sak;

const sakArbeidstid: K9SakArbeidstid = {
    arbeidstakerList: [
        {
            norskIdentitetsnummer: '123',
            organisasjonsnummer: '123',
            arbeidstidInfo: {
                perioder: {
                    '2022-01-01/2022-02-01': {
                        faktiskArbeidTimerPerDag: { hours: '0', minutes: '0' },
                        jobberNormaltTimerPerDag: { hours: '8', minutes: '0' },
                    },
                },
            },
        },
    ],
    frilanserArbeidstidInfo: undefined,
    selvstendigNæringsdrivendeArbeidstidInfo: undefined,
};

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

    describe('getArbeidAktivitetArbeidstaker', () => {
        it('', () => {
            // const result = getArbak;
        });
    });
});
