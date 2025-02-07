const søkerMock = {
    aktørId: '2486083225079',
    fødselsdato: '1987-10-09',
    fødselsnummer: '09908799647',
    mellomnavn: null,
    myndig: true,
    fornavn: 'Test',
    etternavn: 'Testesen',
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
