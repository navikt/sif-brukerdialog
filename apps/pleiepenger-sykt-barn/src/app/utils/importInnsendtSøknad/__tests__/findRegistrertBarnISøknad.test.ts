import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import { RegistrerteBarn } from '../../../types';
import { InnsendtSøknadBarn } from '../../../types/InnsendtSøknad';
import { getRegistrertBarnISøknad, isBarnEtRegistrertBarn } from '../getRegistrertBarnISøknad';

const registrerteBarn: RegistrerteBarn[] = [
    { aktørId: '111' },
    { aktørId: '222', fødselsdato: ISODateToDate('2020-02-02') },
    { aktørId: '333', fødselsdato: ISODateToDate('2020-03-03') },
    { aktørId: '444', fødselsdato: ISODateToDate('2020-03-03') },
] as RegistrerteBarn[];

const søknadBarn = { aktørId: '111' } as InnsendtSøknadBarn;
const søknadBarnKunFødselsdato = { fødselsdato: '2020-02-02' } as InnsendtSøknadBarn;

describe('isBarnEtRegistrertBarn', () => {
    it('returnerer true når barn har samme aktørid som registrert barn', () => {
        expect(isBarnEtRegistrertBarn(søknadBarn, registrerteBarn[0])).toBeTruthy();
    });
    it('returnerer true når barn har samme fødselsdato som registrert barn og aktørid er undefined', () => {
        expect(isBarnEtRegistrertBarn({ ...søknadBarnKunFødselsdato }, registrerteBarn[1])).toBeTruthy();
    });
});

describe('findRegistrertBarnISøknad', () => {
    it('returnerer undefined dersom aktørid er undefined og fødselsdato ikke matcher', () => {
        expect(
            getRegistrertBarnISøknad({ aktørId: undefined, fødselsdato: '2020-01-01' }, registrerteBarn)
        ).toBeUndefined();
    });
    it('returnerer undefined dersom barns aktørId ikke er blant registrerte barn', () => {
        const result = getRegistrertBarnISøknad(
            {
                aktørId: '000',
                fødselsdato: '2020-01-01',
            },
            registrerteBarn
        );
        expect(result).toBeUndefined();
    });
    it(`returnerer barn dersom barns aktørid er blant registrerte barn`, () => {
        const result = getRegistrertBarnISøknad(
            {
                aktørId: '111',
                fødselsdato: '2020-01-01',
            },
            registrerteBarn
        );
        expect(result).toBeDefined();
        expect(result?.aktørId).toEqual('111');
    });
    it(`returnerer barn dersom aktørid er undefined og det er ett registrert barn med samme fødselsdato`, () => {
        const result = getRegistrertBarnISøknad(
            {
                fødselsdato: '2020-02-02',
            },
            registrerteBarn
        );
        expect(result).toBeDefined();
        expect(result?.aktørId).toEqual('222');
    });
    it(`returnerer undefined dersom aktørid er undefined og det er registrert flere barn med samme fødselsdato`, () => {
        const result = getRegistrertBarnISøknad(
            {
                fødselsdato: '2020-03-03',
            },

            registrerteBarn
        );
        expect(result).toBeUndefined();
    });
});
