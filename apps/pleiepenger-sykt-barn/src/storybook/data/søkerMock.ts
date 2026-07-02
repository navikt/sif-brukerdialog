import { Søker } from '@navikt/sif-common-api';
import { ISODate } from '@navikt/sif-common-utils';

export const søkerMock: Søker = {
    fornavn: 'Ola',
    etternavn: 'Nordmann',
    fødselsnummer: '12345678901',
    mellomnavn: '',
    aktørId: '123',
    fødselsdato: '1990-01-01' as ISODate,
};
