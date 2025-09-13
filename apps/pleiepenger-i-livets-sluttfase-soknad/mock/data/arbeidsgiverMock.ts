const frilansoppdrag = {
    type: 'type oppdrag',
    organisasjonsnummer: '991012133',
    navn: 'Hurdal frilanssenter',
    ansattFom: '2022-01-01',
    ansattTom: '2022-01-15',
};
export const arbeidsgiverMock = {
    organisasjoner: [
        {
            navn: 'Arbeids- og velferdsetaten',
            organisasjonsnummer: '123451234',
            ansattFom: '2019-09-25',
            ansattTom: null,
        },
    ],
    frilansoppdrag: [frilansoppdrag],
};
