import { ISODateToDate } from '@navikt/sif-common-utils';

import { IntlTextFn } from '../../i18n';
import { Pleietrengende } from '../../types';
import { personaliaUtils } from '../personaliaUtils';

const pleietrengendeMedNavn: Pleietrengende = {
    anonymisert: false,
    fødselsdato: ISODateToDate('2021-01-01'),
    fornavn: 'Ola',
    etternavn: 'Nordmann',
    mellomnavn: 'Nord',
};

const pleietrengendeAnonymisert: Pleietrengende = {
    anonymisert: true,
    fødselsdato: ISODateToDate('2021-01-01'),
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
