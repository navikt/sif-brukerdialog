const søkerMock = {
    aktørId: '2320509955297',
    fødselsdato: '1995-06-02',
    fødselsnummer: '02869599258',
    fornavn: 'PRESENTABEL',
    mellomnavn: null,
    etternavn: 'HOFTE',
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
        { fødselsdato: '2020-04-20', fornavn: 'Barn', etternavn: 'Barnesen', aktørId: '123' },
        { fødselsdato: '2015-01-02', fornavn: 'Mock', etternavn: 'Mocknes', aktørId: '2' },
    ],
};

const annenForelderMock = {
    navn: 'Test Forelder',
    fnr: '31929198533',
};

export const cyApiMockData = {
    barnMock,
    søkerMock,
    annenForelderMock,
};
