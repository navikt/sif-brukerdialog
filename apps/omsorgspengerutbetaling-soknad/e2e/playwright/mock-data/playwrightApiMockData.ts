const getDateNYearsAgo = (years: number): Date => {
    const currentDate = new Date();
    const year = currentDate.getFullYear() - years;
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    return new Date(year, month, day);
};

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
            fornavn: 'ALFABETISK 19 år',
            etternavn: 'FAGGOTT',
            aktørId: '2811762539343',
            fødselsdato: getDateNYearsAgo(19),
            fødselsnummer: '08861999573',
        },
        {
            aktørId: '98765',
            fornavn: 'Liam 18 år',
            etternavn: 'Brown',
            fødselsdato: getDateNYearsAgo(18),
        },
        {
            aktørId: '12345',
            fornavn: 'Emma 16 år',
            etternavn: 'Johnson',
            mellomnavn: 'Marie',
            fødselsdato: getDateNYearsAgo(16),
        },
        {
            aktørId: '67890',
            fornavn: 'Noah 13 år',
            etternavn: 'Smith',
            fødselsdato: getDateNYearsAgo(13),
        },
        {
            aktørId: '54321',
            fornavn: 'Olivia',
            etternavn: 'Davis',
            mellomnavn: 'Grace',
            fødselsdato: getDateNYearsAgo(10),
        },
    ],
};

export const playwrightApiMockData = {
    barnMock,
    søkerMock,
};
