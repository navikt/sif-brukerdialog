import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { K9Sak } from '@types';
import { getSamletDateRangeForK9Saker } from '../k9SakUtils';

describe('getDateRangeForSaker', () => {
    it('returnerer riktig når det er én sak', () => {
        const sak: K9Sak = {
            ytelse: { søknadsperioder: [{ from: ISODateToDate('2021-01-01'), to: ISODateToDate('2021-01-02') }] },
        } as any;
        const range = getSamletDateRangeForK9Saker([sak]);
        expect(range).toBeDefined();
        if (range) {
            expect(dateToISODate(range.from)).toEqual('2021-01-01');
            expect(dateToISODate(range.to)).toEqual('2021-01-02');
        }
    });
    it('returnerer undefined når det ikke er noen saker', () => {
        const range = getSamletDateRangeForK9Saker([]);
        expect(range).toBeUndefined();
    });
    it('returnerer riktig når det er to saker som ikke overlapper', () => {
        const sak: K9Sak = {
            ytelse: {
                søknadsperioder: [
                    { from: ISODateToDate('2021-01-01'), to: ISODateToDate('2021-01-02') },
                    { from: ISODateToDate('2021-01-03'), to: ISODateToDate('2021-01-04') },
                ],
            },
        } as any;
        const range = getSamletDateRangeForK9Saker([sak]);
        expect(range).toBeDefined();
        if (range) {
            expect(dateToISODate(range.from)).toEqual('2021-01-01');
            expect(dateToISODate(range.to)).toEqual('2021-01-04');
        }
    });
    it('returnerer riktig når det er to saker som overlapper', () => {
        const sak: K9Sak = {
            ytelse: {
                søknadsperioder: [
                    { from: ISODateToDate('2021-01-01'), to: ISODateToDate('2021-01-02') },
                    { from: ISODateToDate('2021-01-02'), to: ISODateToDate('2021-01-03') },
                ],
            },
        } as any;
        const range = getSamletDateRangeForK9Saker([sak]);
        expect(range).toBeDefined();
        if (range) {
            expect(dateToISODate(range.from)).toEqual('2021-01-01');
            expect(dateToISODate(range.to)).toEqual('2021-01-03');
        }
    });
});
