import {
    DeltakelseHistorikkDto,
    DeltakelseDto,
    DeltakerPersonalia,
    Endringstype,
    Revisjonstype,
} from '@navikt/ung-deltakelse-opplyser-api';

const deltakerPersonalia: DeltakerPersonalia = {
    id: '6369f9a3-5a38-4b90-b93a-695fabe8c6f9',
    deltakerIdent: '26430569928',
    navn: {
        fornavn: 'KONSEKVENT',
        mellomnavn: undefined,
        etternavn: 'FROKOSTBLANDING',
    },
    fødselsdato: '2005-03-26',
    førsteMuligeInnmeldingsdato: '2025-01-01',
    sisteMuligeInnmeldingsdato: '2034-03-26',
};

const deltakelse: DeltakelseDto = {
    id: '2a270c69-9a5b-4a94-b27e-53f6e70bc35f',
    deltaker: {
        id: '6369f9a3-5a38-4b90-b93a-695fabe8c6f9',
        deltakerIdent: '26430569928',
    },
    fraOgMed: '2025-05-05',
    tilOgMed: '2026-01-01',
    søktTidspunkt: '2025-05-31T03:58:29.015999Z',
};

const historikk: DeltakelseHistorikkDto[] = [
    {
        tidspunkt: '2025-05-30T09:59:25.469966Z',
        endringstype: Endringstype.DELTAKER_MELDT_INN,
        revisjonstype: Revisjonstype.OPPRETTET,
        endring: 'Deltaker er meldt inn i programmet.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-05-30T10:33:39.879349Z',
        endringstype: Endringstype.DELTAKER_HAR_SØKT_YTELSE,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Deltaker har søkt om ytelse den 30.05.2025 12:33.',
        aktør: 'system',
    },
    {
        tidspunkt: '2025-05-30T10:34:03.308633Z',
        endringstype: Endringstype.ENDRET_STARTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Startdato for deltakelse er endret fra 2025-09-01 til 2025-08-01.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-05-30T14:58:24.220027Z',
        endringstype: Endringstype.ENDRET_STARTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Startdato for deltakelse er endret fra 2025-08-01 til 2025-08-04.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-05-30T18:44:23.142946Z',
        endringstype: Endringstype.ENDRET_SLUTTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Sluttdato for deltakelse er satt til 2026-03-02.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-05-30T19:54:09.605508Z',
        endringstype: Endringstype.ENDRET_SLUTTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Sluttdato for deltakelse er endret fra 2026-03-02 til 2026-03-09.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-05-30T20:02:21.465102Z',
        endringstype: Endringstype.ENDRET_SLUTTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Sluttdato for deltakelse er endret fra 2026-03-09 til 2026-03-02.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-05-30T20:02:41.503637Z',
        endringstype: Endringstype.ENDRET_STARTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Startdato for deltakelse er endret fra 2025-08-04 til 2025-08-11.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-05-30T20:03:10.540266Z',
        endringstype: Endringstype.ENDRET_SLUTTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Sluttdato for deltakelse er endret fra 2026-03-02 til 2026-03-09.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-06-03T15:06:40.276048Z',
        endringstype: Endringstype.ENDRET_STARTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Startdato for deltakelse er endret fra 2025-08-11 til 2025-08-04.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-06-05T09:14:07.328851Z',
        endringstype: Endringstype.ENDRET_STARTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Startdato for deltakelse er endret fra 2025-08-04 til 2025-08-01.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-06-05T09:14:08.277295Z',
        endringstype: Endringstype.ENDRET_SLUTTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Sluttdato for deltakelse er endret fra 2026-03-09 til 2026-03-30.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-06-05T09:16:47.014958Z',
        endringstype: Endringstype.ENDRET_SLUTTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Sluttdato for deltakelse er endret fra 2026-03-30 til 2026-03-31.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2025-06-05T09:16:48.182435Z',
        endringstype: Endringstype.ENDRET_STARTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Startdato for deltakelse er endret fra 2025-08-01 til 2025-08-04.',
        aktør: 'Z990501 (veileder)',
    },
];

export const deltaker2Mock = {
    deltakerPersonalia,
    deltakelse,
    historikk,
};
