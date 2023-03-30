import { dateToISODate, ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { K9Sak } from '../../types/K9Sak';
import { getPeriodeForArbeidsgiverOppslag, getSamletDateRangeForK9Saker } from '../k9SakUtils';

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

    describe('getPeriodeForArbeidsgiverOppslag', () => {
        const endringsperiode = ISODateRangeToDateRange('2022-05-01/2022-10-01');

        it('returnerer minste dateRange ut fra maks endringsperiode og samletSøknadsperiode', () => {
            const samletSøknadsperiode = ISODateRangeToDateRange('2022-06-01/2022-09-01');
            const result = getPeriodeForArbeidsgiverOppslag(samletSøknadsperiode, endringsperiode);
            expect(dateToISODate(result.from)).toEqual('2022-06-01');
            expect(dateToISODate(result.to)).toEqual('2022-09-01');
        });
        it('returnerer endringsperiode hvis samletSøknadsperiode går utover endringsperiode', () => {
            const samletSøknadsperiode = ISODateRangeToDateRange('2021-01-01/2023-01-01');
            const result = getPeriodeForArbeidsgiverOppslag(samletSøknadsperiode, endringsperiode);
            expect(dateToISODate(result.from)).toEqual('2022-05-01');
            expect(dateToISODate(result.to)).toEqual('2022-10-01');
        });
    });
});
