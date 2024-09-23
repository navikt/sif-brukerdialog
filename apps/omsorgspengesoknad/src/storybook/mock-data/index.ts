import { ISODateToDate } from '@navikt/sif-common-utils';
import { Søker } from '../../app/types/Søker';
import { RegistrertBarn } from '../../app/types/RegistrertBarn';

export const SøkerMock: Søker = {
    fødselsnummer: '30086421581',
    fornavn: 'GODSLIG',
    aktørId: '132',
    fødselsdato: ISODateToDate('1990-01-01'),
    etternavn: 'KRONJUVEL',
};

export const RegistrerteBarnMock: RegistrertBarn[] = [
    {
        fødselsdato: ISODateToDate('1990-01-01'),
        fornavn: 'Barn',
        mellomnavn: 'Barne',
        etternavn: 'Barnesen',
        aktørId: '1',
    },
    {
        fødselsdato: ISODateToDate('1990-01-02'),
        fornavn: 'Mock',
        etternavn: 'Mocknes',
        aktørId: '2',
    },
];
