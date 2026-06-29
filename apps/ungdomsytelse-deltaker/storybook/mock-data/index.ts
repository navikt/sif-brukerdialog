import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { ISODate } from '@sif/utils';

export const SøkerMock: Søker = {
    fødselsnummer: '09908799647',
    fornavn: 'GODSLIG',
    aktørId: '132',
    fødselsdato: '1990-01-01' as ISODate,
    etternavn: 'KRONJUVEL',
};

export const RegistrerteBarnMock: RegistrertBarn[] = [
    {
        fødselsdato: '1990-01-01' as ISODate,
        fornavn: 'Barn',
        mellomnavn: 'Barne',
        etternavn: 'Barnesen',
        aktørId: '1',
    },
    {
        fødselsdato: '1990-01-02' as ISODate,
        fornavn: 'Mock',
        etternavn: 'Mocknes',
        aktørId: '2',
    },
];
