import { ISODateRangeToDateRange, dateToISODate } from '@navikt/sif-common-utils/lib';
import { getFørsteDagFørOpptjeningsperiode, getOpptjeningsperiodeStartDato } from '../søknadsperiodeUtils';

describe('søknadsperiodeUtils', () => {
    describe('getOpptjeningsperiodeStartDato', () => {
        it('returnerer riktig startdato for opptjeningsperioden', () => {
            const result = getOpptjeningsperiodeStartDato(ISODateRangeToDateRange('2023-07-30/2023-10-31'));
            expect(dateToISODate(result)).toEqual('2023-07-02');
        });
    });
    describe('getFørsteDagFørOpptjeningsperiode', () => {
        it('returnerer riktig startdato for opptjeningsperioden', () => {
            const result = getFørsteDagFørOpptjeningsperiode(ISODateRangeToDateRange('2023-07-30/2023-10-31'));
            expect(dateToISODate(result)).toEqual('2023-07-01');
        });
    });
});
