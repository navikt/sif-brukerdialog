import { Søker } from '@navikt/sif-common-api';

export const søkerMock: Søker = {
    fornavn: 'Ola',
    etternavn: 'Nordmann',
    fødselsnummer: '12345678901',
    mellomnavn: '',
    aktørId: '123',
    fødselsdato: new Date('1990-01-01'),
};
