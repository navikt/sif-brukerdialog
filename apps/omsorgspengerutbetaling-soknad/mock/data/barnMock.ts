const barn2Fom13 = {
    barn: [
        {
            fødselsdato: '2009-01-02',
            fornavn: 'Barn',
            mellomnavn: 'Barne',
            etternavn: 'Barnesen',
            aktørId: '1',
        },
        { fødselsdato: '2008-01-02', fornavn: 'Mock', etternavn: 'Mocknes', aktørId: '2' },
    ],
};

const ettEllerToUnder13 = {
    barn: [
        {
            fødselsdato: '2022-01-02',
            fornavn: 'Barn',
            mellomnavn: 'Barne',
            etternavn: 'Barnesen',
            aktørId: '1',
        },
        { fødselsdato: '2020-01-02', fornavn: 'Mock', etternavn: 'Mocknes', aktørId: '2' },
    ],
};
const ingenBarn = {
    barn: [],
};

const kunBarnOver13 = {
    barn: [
        {
            fødselsdato: '2012-01-05',
            fornavn: 'Barn',
            mellomnavn: 'Barne',
            etternavn: 'Barnesen',
            aktørId: '1',
        },
    ],
};

const overOgUnder13 = {
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

const treBarnUnder13 = {
    barn: [
        {
            fødselsdato: '2022-01-02',
            fornavn: 'Barn',
            mellomnavn: 'Barne',
            etternavn: 'Barnesen',
            aktørId: '1',
        },
        { fødselsdato: '2020-01-02', fornavn: 'Mock', etternavn: 'Mocknes', aktørId: '2' },
        { fødselsdato: '2021-01-02', fornavn: 'Smilende', etternavn: 'Sekk', aktørId: '3' },
    ],
};

export const barnMock = {
    barn2Fom13,
    ettEllerToUnder13,
    ingenBarn,
    kunBarnOver13,
    overOgUnder13,
    treBarnUnder13,
};
