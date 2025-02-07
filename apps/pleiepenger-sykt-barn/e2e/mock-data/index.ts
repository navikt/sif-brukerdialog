const søker = {
    fornavn: 'Test',
    mellomnavn: undefined,
    etternavn: 'Testesen',
    fødselsnummer: '23058916765',
    aktørId: '123',
    fødselsdato: '1989-05-23',
};

const barn = {
    barn: [
        {
            fornavn: 'ALFABETISK',
            etternavn: 'FAGGOTT',
            aktørId: '2811762539343',
            fødselsdato: '2019-06-08',
            fødselsnummer: '08861999573',
        },
        { fødselsdato: '2020-04-20', fornavn: 'Barn', mellomnavn: 'Barne', etternavn: 'Barnesen', aktørId: '123' },
        { fødselsdato: '2015-01-02', fornavn: 'Mock', etternavn: 'Mocknes', aktørId: '2' },
    ],
};
const frilansoppdrag = {
    type: 'type oppdrag',
    organisasjonsnummer: '991012133',
    navn: 'Hurdal frilanssenter',
    ansattFom: '2022-01-01',
    ansattTom: '2022-01-15',
};

const arbeidsgiver = {
    organisasjoner: [{ navn: 'WHOA.BOA', organisasjonsnummer: '947064649' }],
    frilansoppdrag: [frilansoppdrag],
    privatarbeidsgiver: [],
};

export const e2eMockData = {
    frilansoppdrag,
    barn,
    arbeidsgiver,
    søker,
};
