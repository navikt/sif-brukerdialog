import { maskString } from '../maskString';

describe('maskString', () => {
    it('returnerer undefined for tom eller undefined string', () => {
        expect(maskString(undefined)).toBeUndefined();
        expect(maskString('')).toBeUndefined();
    });
    it('returnerer undefined hvis lengden på string er mindre enn minLength', () => {
        expect(maskString('123', 5)).toBeUndefined();
    });
    it('returnerer riktig masket streng for string på minLength', () => {
        expect(maskString('12345', 5)).toEqual('12***');
    });
    it('returnerer riktig masket streng for string lengre enn minLength', () => {
        expect(maskString('1234567890', 5)).toEqual('12345*****');
    });
});
