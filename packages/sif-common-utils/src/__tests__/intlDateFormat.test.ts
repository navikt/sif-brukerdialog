import { ISODateToDate } from '../';
import { intlDateFormats } from '../intlDateFormats';

describe('intlDateFormat', () => {
    const date = ISODateToDate('2020-01-04');

    it('compact', () => {
        const result = Intl.DateTimeFormat('nb', intlDateFormats.compact).format(date);
        expect(result).toEqual('04.01.2020');
    });
    it('dateShortMonthYear', () => {
        const result = Intl.DateTimeFormat('nb', intlDateFormats.dateShortMonthYear).format(date);
        expect(result).toEqual('4. jan. 2020');
    });
    it('weekday', () => {
        const result = Intl.DateTimeFormat('nb', intlDateFormats.weekday).format(date);
        expect(result).toEqual('lørdag');
    });
    it('weekdayCompactDate', () => {
        const result = Intl.DateTimeFormat('nb', intlDateFormats.weekdayCompactDate).format(date);
        expect(result).toEqual('lørdag 04.01.2020');
    });
    it('weekdayDateMonth', () => {
        const result = Intl.DateTimeFormat('nb', intlDateFormats.weekdayDateMonth).format(date);
        expect(result).toEqual('lørdag 4. januar');
    });
    it('weekdayDateMonthYear', () => {
        const result = Intl.DateTimeFormat('nb', intlDateFormats.weekdayDateMonthYear).format(date);
        expect(result).toEqual('lørdag 4. januar 2020');
    });
    it('weekdayDateShortMonth', () => {
        const result = Intl.DateTimeFormat('nb', intlDateFormats.weekdayDateShortMonth).format(date);
        expect(result).toEqual('lørdag 4. jan.');
    });
    it('weekdayDateShortMonthYear', () => {
        const result = Intl.DateTimeFormat('nb', intlDateFormats.weekdayDateShortMonthYear).format(date);
        expect(result).toEqual('lørdag 4. jan. 2020');
    });

    describe('nynorsk', () => {
        it('weekday', () => {
            const result = Intl.DateTimeFormat('nn', intlDateFormats.weekday).format(date);
            expect(result).toEqual('laurdag');
        });
        it('weekdayCompactDate', () => {
            const result = Intl.DateTimeFormat('nn', intlDateFormats.weekdayCompactDate).format(date);
            expect(result).toEqual('laurdag 04.01.2020');
        });
        it('weekdayDateMonth', () => {
            const result = Intl.DateTimeFormat('nn', intlDateFormats.weekdayDateMonth).format(date);
            expect(result).toEqual('laurdag 4. januar');
        });
        it('weekdayDateMonthYear', () => {
            const result = Intl.DateTimeFormat('nn', intlDateFormats.weekdayDateMonthYear).format(date);
            expect(result).toEqual('laurdag 4. januar 2020');
        });
        it('weekdayDateShortMonth', () => {
            const result = Intl.DateTimeFormat('nn', intlDateFormats.weekdayDateShortMonth).format(date);
            expect(result).toEqual('laurdag 4. jan.');
        });
        it('weekdayDateShortMonthYear', () => {
            const result = Intl.DateTimeFormat('nn', intlDateFormats.weekdayDateShortMonthYear).format(date);
            expect(result).toEqual('laurdag 4. jan. 2020');
        });
    });
});
