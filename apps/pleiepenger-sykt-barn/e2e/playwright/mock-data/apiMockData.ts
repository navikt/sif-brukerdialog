const søkerMock = {
    fornavn: 'Test',
    mellomnavn: undefined,
    etternavn: 'Testesen',
    fødselsnummer: '23058916765',
};

const barnMock = {
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

export const frilansoppdrag = {
    type: 'type oppdrag',
    organisasjonsnummer: '991012133',
    navn: 'Hurdal frilanssenter',
    ansattFom: '2022-01-01',
    ansattTom: '2022-01-15',
};

const arbeidsgivereMock = {
    organisasjoner: [{ navn: 'SJOKKERENDE ELEKTRIKER', organisasjonsnummer: '947064649', ansattFom: '2002-04-20' }],
    frilansoppdrag: [],
    privatarbeidsgiver: [],
};

export const frilansoppdrag1MockData = {
    type: 'type oppdrag',
    organisasjonsnummer: '991012133',
    navn: 'Hurdal frilanssenter',
    ansattFom: '2022-01-01',
    ansattTom: '2022-01-15',
};

export const frilansoppdrag2MockData = {
    type: 'type oppdrag',
    organisasjonsnummer: '991012134',
    navn: 'Svandalen frilanssenter',
    ansattFom: '2022-01-01',
    ansattTom: '2022-01-15',
};

export const apiMockData = {
    barnMock,
    arbeidsgivereMock,
    søkerMock,
};
