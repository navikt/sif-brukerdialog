import { ISODateToDate } from '@navikt/sif-common-utils';
import { Pleietrengende } from '../../server/api-models/PleietrengendeSchema';
import { personaliaUtils } from '../personaliaUtils';
import { IntlTextFn } from '../../i18n';

const pleietrengendeMedNavn: Pleietrengende = {
    anonymisert: false,
    aktørId: '123',
    fødselsdato: ISODateToDate('2021-01-01'),
    fornavn: 'Ola',
    etternavn: 'Nordmann',
    mellomnavn: 'Nord',
    identitetsnummer: '12345678910',
};

const pleietrengendeAnonymisert: Pleietrengende = {
    anonymisert: true,
    aktørId: '123',
    fødselsdato: ISODateToDate('2021-01-01'),
    identitetsnummer: '12345678910',
};

describe('personaliaUtils', () => {
    const textFn: IntlTextFn = () => 'Barn født 01.01.2021';
    it('returnerer navn når pleietrengende ikke er anonymisert', () => {
        expect(personaliaUtils.navn(pleietrengendeMedNavn, textFn)).toEqual('Ola Nord Nordmann');
    });
    it('returnerer fødselsdato når pleietrengende er anonymisert', () => {
        expect(personaliaUtils.navn(pleietrengendeAnonymisert, textFn)).toEqual('Barn født 01.01.2021');
    });
});
