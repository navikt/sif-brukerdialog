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

export const playwrightApiMockData = {
    barnMock,
    søkerMock,
};
