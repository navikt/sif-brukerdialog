import { zBarnOppslag } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

type BarnEntitet = z.input<typeof zBarnOppslag>;

export const alfaTestesen: BarnEntitet = {
    fornavn: 'Alfa',
    etternavn: 'Testesen',
    aktørId: '2811762539343',
    fødselsdato: '2019-06-08',
};

export const betaTestesen: BarnEntitet = {
    fornavn: 'Beta',
    etternavn: 'Testesen',
    aktørId: '9876543210123',
    fødselsdato: '2021-03-15',
};
