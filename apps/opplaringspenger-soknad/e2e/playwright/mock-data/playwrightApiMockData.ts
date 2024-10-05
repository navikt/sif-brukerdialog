const søkerMock = {
    aktørId: '2320509955297',
    fødselsdato: '1995-06-02',
    fødselsnummer: '02869599258',
    fornavn: 'PRESENTABEL',
    mellomnavn: null,
    etternavn: 'HOFTE',
};

const arbeidsgiverMock = {
    organisasjoner: [{ navn: 'Arbeids- og velferdsetaten', organisasjonsnummer: '123451234' }],
};

export const playwrightApiMockData = {
    søkerMock,
    arbeidsgiverMock,
};
