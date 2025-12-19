import {
    DeltakelseDto,
    DeltakelseHistorikkDto,
    DeltakerPersonalia,
    Endringstype,
    Revisjonstype,
} from '@navikt/ung-deltakelse-opplyser-api-veileder';

const deltakerPersonalia: DeltakerPersonalia = {
    id: '699b9f97-b0d7-4b78-9b8e-8758feb9e0fd',
    deltakerIdent: '03867198392',
    navn: {
        fornavn: 'PRESENTABEL',
        etternavn: 'HOFTE',
    },
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2013-05-10',
    sisteMuligeInnmeldingsdato: '2025-04-10',
    diskresjonskoder: [],
};

const deltakelse: DeltakelseDto = {
    id: '5e8d1e4c-801c-4d13-8987-abfae3eaaa00',
    deltaker: {
        id: '699b9f97-b0d7-4b78-9b8e-8758feb9e0fd',
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-03-10',
    tilOgMed: undefined,
    erSlettet: false,
    søktTidspunkt: '2025-05-21T12:00:20.859873Z',
};

const deltakelseHistorikk: DeltakelseHistorikkDto[] = [
    {
        revisjonstype: Revisjonstype.OPPRETTET,
        endringstype: Endringstype.DELTAKER_MELDT_INN,
        endring: 'Deltaker er meldt inn i programmet',
        aktør: 'Z990501 (veileder)',
        tidspunkt: '2025-05-31T03:58:01.778344Z',
    },
    {
        revisjonstype: Revisjonstype.ENDRET,
        endringstype: Endringstype.DELTAKER_HAR_SØKT_YTELSE,
        endring: 'Deltaker har sendt inn søknad',
        aktør: 'Z990501 (deltaker)',
        tidspunkt: '2025-06-01T03:58:01.778344Z',
    },
];

export const registrertDeltakerMock = {
    id: deltakerPersonalia.id!,
    deltakerPersonalia,
    deltakelse,
    deltakelseHistorikk,
};
