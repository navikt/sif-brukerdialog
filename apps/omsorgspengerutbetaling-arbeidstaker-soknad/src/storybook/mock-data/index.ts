import { ISODateToDate } from '@navikt/sif-common-utils';
import { Søker } from '../../app/types/Søker';

export const SøkerMock: Søker = {
    fødselsnummer: '30086421581',
    fornavn: 'GODSLIG',
    aktørId: '132',
    fødselsdato: ISODateToDate('1990-01-01'),
    etternavn: 'KRONJUVEL',
};
