import { dateStringToDateObjectMapper, storageParser } from '../persistence/persistence';

const validISODate = '2000-10-10';

describe('persistence', () => {
    describe('storageParser', () => {
        it('does parses storage json correctly - plain', () => {
            const inputJson = {
                date: validISODate,
            };
            const result = storageParser(JSON.stringify(inputJson));
            expect(result).toEqual(inputJson);
        });

        it('does parses storage json correctly - date and datestring', () => {
            const date = new Date(2000, 10, 10);
            const inputJson = {
                date: validISODate,
                otherDate: new Date(2000, 10, 10),
                enVerdi: 12,
            };
            const expectedResult = { date: '2000-10-10', otherDate: date, enVerdi: 12 };
            const result = storageParser(JSON.stringify(inputJson));
            expect(result).toEqual(expectedResult);
        });
        it('does not parse datepicker ISOFormattedDate', () => {
            expect(dateStringToDateObjectMapper('key', validISODate)).toEqual(validISODate);
        });
        it('does parse other dates', () => {
            const date = new Date();
            expect(dateStringToDateObjectMapper('key', date.toString())).toEqual(date.toString());
        });
        it('does not parse other types', () => {
            expect(dateStringToDateObjectMapper('key', 'abc')).toEqual('abc');
            expect(dateStringToDateObjectMapper('key', '1')).toEqual('1');
        });
    });
});
