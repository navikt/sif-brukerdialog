import { ISODateToDate } from '@navikt/sif-common-utils';
import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';

export const SøkerMock: Søker = {
    fødselsnummer: '09908799647',
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
