import { ISODateToDate } from '@navikt/sif-common-utils';

import { Søker } from '../../types/Soker';
import { testTestesen } from '../entiteter/søkere';

export const mockSøker: Søker = {
    aktørId: testTestesen.aktørId,
    fødselsnummer: testTestesen.fødselsnummer,
    fødselsdato: ISODateToDate(testTestesen.fødselsdato),
    fornavn: testTestesen.fornavn!,
    etternavn: testTestesen.etternavn!,
    mellomnavn: testTestesen.mellomnavn,
};
