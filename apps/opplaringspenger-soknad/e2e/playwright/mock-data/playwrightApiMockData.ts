import { Institusjon } from '../../../src/app/api/institusjonService';

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

const institusjonerMock: Institusjon[] = [
    { uuid: '1', navn: 'Ahus (Akershus universitetssykehus)' },
    { uuid: '2', navn: 'Barnas Fysioterapisenter i Bergen' },
    { uuid: '3', navn: 'Barnas språksenter' },
    { uuid: '4', navn: 'Beitostølen Helsesportsenter' },
];

export const playwrightApiMockData = {
    søkerMock,
    arbeidsgiverMock,
    institusjonerMock,
};
