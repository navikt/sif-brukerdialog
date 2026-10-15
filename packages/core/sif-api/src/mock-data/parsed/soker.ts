import { Søker } from '../../k9-brukerdialog-prosessering/soker/Soker';
import { testTestesen } from '../entiteter/sokere';

export const mockSøker: Søker = {
    aktørId: testTestesen.aktørId,
    fødselsnummer: testTestesen.fødselsnummer,
    fødselsdato: testTestesen.fødselsdato,
    fornavn: testTestesen.fornavn!,
    etternavn: testTestesen.etternavn!,
    mellomnavn: testTestesen.mellomnavn,
};
