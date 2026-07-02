import { Søker } from '@navikt/sif-common-api';
import { ISODate } from '@navikt/sif-common-utils';

export const søkerMock: Søker = {
    fødselsnummer: '09908799647',
    fornavn: 'GODSLIG',
    etternavn: 'KRONJUVEL',
    aktørId: '123',
    fødselsdato: '1964-08-30' as ISODate,
};
