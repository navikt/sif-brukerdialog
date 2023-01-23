import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import { RegistrertBarn } from '../../app/types/RegistrertBarn';
import { Søker } from '../../app/types/Søker';

export const SøkerMock: Søker = {
    fødselsnummer: '30086421581',
    fornavn: 'GODSLIG',
    etternavn: 'KRONJUVEL',
    aktørId: '2320509955297',
    fødselsdato: ISODateToDate('1995-06-02'),
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
