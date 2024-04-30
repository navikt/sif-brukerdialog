import { ISODateToDate } from '@navikt/sif-common-utils';
import { Søker } from '../../app/types/Søker';
import { ArbeidsgiverResponse } from '../../app/types/Arbeidsgiver';

export const SøkerMock: Søker = {
    fødselsnummer: '30086421581',
    fornavn: 'GODSLIG',
    aktørId: '132',
    fødselsdato: ISODateToDate('1990-01-01'),
    etternavn: 'KRONJUVEL',
};

export const arbeidsgivereStorybookMock: ArbeidsgiverResponse = {
    organisasjoner: [
        {
            navn: 'Arbeids- og velferdsetaten',
            organisasjonsnummer: '123451234',
        },
        {
            navn: 'Arbeids- og sosialdepartementet',
            organisasjonsnummer: '123451235',
        },
    ],
};
