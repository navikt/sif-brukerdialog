import { DateRange, dateToISODate, ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { K9Sak } from '@types';

import { getSamletDateRangeForK9Saker, isK9SakErInnenforGyldigEndringsperiode } from '../k9SakUtils';

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
describe('k9SakErInnenforGyldigEndringsperiode', () => {
    const endringsperiode: DateRange = ISODateRangeToDateRange('2021-06-15/2021-12-01');
    it('returnerer true når sak slutter innenfor endringsperiode', () => {
        const sak: K9Sak = {
            ytelse: {
                søknadsperioder: [
                    { from: ISODateToDate('2021-01-01'), to: ISODateToDate('2021-01-02') },
                    { from: ISODateToDate('2021-05-03'), to: ISODateToDate('2021-07-04') },
                ],
            },
        } as any;
        const result = isK9SakErInnenforGyldigEndringsperiode(sak, endringsperiode);
        expect(result).toBeTruthy();
    });
    it('returnerer false når sak slutter før endringsperiode', () => {
        const sak: K9Sak = {
            ytelse: {
                søknadsperioder: [
                    { from: ISODateToDate('2021-01-01'), to: ISODateToDate('2021-01-02') },
                    { from: ISODateToDate('2021-01-03'), to: ISODateToDate('2021-01-04') },
                ],
            },
        } as any;
        const result = isK9SakErInnenforGyldigEndringsperiode(sak, endringsperiode);
        expect(result).toBeFalsy();
    });
});
