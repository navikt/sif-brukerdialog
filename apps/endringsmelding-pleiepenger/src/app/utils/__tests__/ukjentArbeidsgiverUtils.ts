import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateToISODate, ISODate, ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { getSøknadsperioderForUkjentArbeidsforhold } from '../ukjentArbeidsforholdUtils';

describe('ukjentArbeidsforholdUtils', () => {
    describe('getSøknadsperioderForUkjentArbeidsforhold', () => {
        const søknadsperioder: DateRange[] = [
            ISODateRangeToDateRange('2020-01-01/2020-02-01'),
            ISODateRangeToDateRange('2020-05-01/2020-06-01'),
        ];
        it('avgrenser søknadsperioder til ansettelsesperiode med fom og tom', () => {
            const fomIsoDate: ISODate = '2020-01-15';
            const tomIsoDate: ISODate = '2020-05-16';
            const perioder = getSøknadsperioderForUkjentArbeidsforhold(
                søknadsperioder,
                ISODateToDate(fomIsoDate),
                ISODateToDate(tomIsoDate),
            );
            expect(perioder.length).toBe(2);
            expect(dateToISODate(perioder[0].from)).toEqual(fomIsoDate);
            expect(dateToISODate(perioder[0].to)).toEqual('2020-02-01');
            expect(dateToISODate(perioder[1].from)).toEqual('2020-05-01');
            expect(dateToISODate(perioder[1].to)).toEqual(tomIsoDate);
        });
        it('avgrenser søknadsperioder til ansettelsesperiode med bare fom', () => {
            const fomIsoDate: ISODate = '2020-01-15';
            const perioder = getSøknadsperioderForUkjentArbeidsforhold(
                søknadsperioder,
                ISODateToDate(fomIsoDate),
                undefined,
            );
            expect(perioder.length).toBe(2);
            expect(dateToISODate(perioder[0].from)).toEqual(fomIsoDate);
            expect(dateToISODate(perioder[0].to)).toEqual('2020-02-01');
            expect(dateToISODate(perioder[1].from)).toEqual('2020-05-01');
            expect(dateToISODate(perioder[1].to)).toEqual('2020-06-01');
        });
        it('avgrenser søknadsperioder til ansettelsesperiode med bare tom', () => {
            const tomIsoDate: ISODate = '2020-01-15';
            const perioder = getSøknadsperioderForUkjentArbeidsforhold(
                søknadsperioder,
                undefined,
                ISODateToDate(tomIsoDate),
            );
            expect(perioder.length).toBe(1);
            expect(dateToISODate(perioder[0].from)).toEqual('2020-01-01');
            expect(dateToISODate(perioder[0].to)).toEqual(tomIsoDate);
        });
    });
});
