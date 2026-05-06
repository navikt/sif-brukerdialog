import { BarnOppslag } from '@navikt/k9-brukerdialog-prosessering-api';

type BarnEntitet = Omit<BarnOppslag, 'fødselsdato'> & { fødselsdato: string };

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
