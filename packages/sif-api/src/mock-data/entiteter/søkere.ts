import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

type SøkerEntitet = z.input<typeof zSøker>;

export const testTestesen: SøkerEntitet = {
    aktørId: '2320509955297',
    fødselsdato: '1985-06-02',
    fødselsnummer: '02068599258',
    fornavn: 'Test',
    mellomnavn: undefined,
    etternavn: 'Testesen',
};

export const noraKronjuvel: SøkerEntitet = {
    aktørId: '2486083225079',
    fødselsdato: '1987-10-09',
    fødselsnummer: '09908799647',
    fornavn: 'NORA',
    mellomnavn: undefined,
    etternavn: 'KRONJUVEL',
};

export const testBrukeresen: SøkerEntitet = {
    aktørId: '2320509955298',
    fødselsdato: '2005-06-02',
    fødselsnummer: '02869599258',
    fornavn: 'Test',
    mellomnavn: undefined,
    etternavn: 'Brukeresen',
};
