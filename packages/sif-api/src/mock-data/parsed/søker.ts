import { Søker } from '../../types/Soker';
import { testTestesen } from '../entiteter/søkere';

export const mockSøker: Søker = {
    aktørId: testTestesen.aktørId,
    fødselsnummer: testTestesen.fødselsnummer,
    fødselsdato: testTestesen.fødselsdato,
    fornavn: testTestesen.fornavn!,
    etternavn: testTestesen.etternavn!,
    mellomnavn: testTestesen.mellomnavn,
};
