const søkerMock = {
    aktørId: '2320509955297',
    fødselsdato: '1995-06-02',
    fødselsnummer: '02869599258',
    fornavn: 'PRESENTABEL',
    mellomnavn: null,
    etternavn: 'HOFTE',
};

const arbeidsgiver = {
    organisasjoner: [
        { navn: 'Arbeids- og velferdsetaten', organisasjonsnummer: '123451234' },
        { navn: 'Arbeids- og sosialdepartementet', organisasjonsnummer: '123451235' },
    ],
};

const barnMock = {
    barn: [
        {
            fødselsdato: '2020-01-02',
            fornavn: 'Barn',
            mellomnavn: 'Barne',
            etternavn: 'Barnesen',
            aktørId: '1',
        },
        { fødselsdato: '2008-01-02', fornavn: 'Mock', etternavn: 'Mocknes', aktørId: '2' },
    ],
};

export const playwrightApiMockData = {
    søkerMock,
    barnMock,
    arbeidsgiver,
};
