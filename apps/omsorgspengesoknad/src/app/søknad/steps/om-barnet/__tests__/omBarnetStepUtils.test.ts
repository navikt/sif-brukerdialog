import dayjs from 'dayjs';
import { barnet18årOgKanFortsette } from '../omBarnetStepUtils';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';

const registrertBarn: RegistrertBarn[] = [
    {
        aktørId: '1',
        etternavn: 'B',
        fornavn: 'A',
        fødselsdato: new Date('2004-09-15'),
    },
    {
        aktørId: '2',
        etternavn: 'B',
        fornavn: 'A',
        fødselsdato: new Date('2004-09-15'),
    },
    {
        aktørId: '3',
        etternavn: 'B',
        fornavn: 'A',
        fødselsdato: new Date('2020-01-15'),
    },
];

describe('barnet18årOgKanFortsette', () => {
    it('should return true if the person is 18 years old and today is before April 1 of the following year', () => {
        const currentDate = dayjs('2023-04-01').toDate();
        const result = barnet18årOgKanFortsette(currentDate, registrertBarn, '1');
        expect(result).toBe(true);
    });

    it('should return false if the person is 18 years old and today is after April 1 of the following year', () => {
        const currentDate = dayjs('2023-04-02').toDate();
        const result = barnet18årOgKanFortsette(currentDate, registrertBarn, '2');
        expect(result).toBe(false);
    });

    it('should return true if the person is not yet 18 years old Before 1 April', () => {
        const currentDate = dayjs('2023-03-15').toDate();
        const result = barnet18årOgKanFortsette(currentDate, registrertBarn, '3');
        expect(result).toBe(true);
    });

    it('should return true if the person is not yet 18 years old After 1 April', () => {
        const currentDate = dayjs('2023-04-15').toDate();
        const result = barnet18årOgKanFortsette(currentDate, registrertBarn, '3');
        expect(result).toBe(true);
    });
});
