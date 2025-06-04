import {
    DeltakelseHistorikkDto,
    DeltakelseOpplysningDto,
    DeltakerPersonalia,
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

const deltakelse: DeltakelseOpplysningDto = {
    id: '2a270c69-9a5b-4a94-b27e-53f6e70bc35f',
    deltaker: {
        id: '6369f9a3-5a38-4b90-b93a-695fabe8c6f9',
        deltakerIdent: '26430569928',
    },
    fraOgMed: '2025-05-05',
    tilOgMed: '2026-01-01',
    søktTidspunkt: '2025-05-31T03:58:29.015999Z',
    oppgaver: [],
};

const historikk: DeltakelseHistorikkDto[] = [
    {
        revisjonstype: Revisjonstype.OPPRETTET,
        revisjonsnummer: 1312,
        id: '366feba0-0810-4268-9efa-574aa7425c43',
        fom: '2025-05-01',

        opprettetAv: 'Z990501 (veileder)',
        opprettetTidspunkt: '2025-05-31T03:58:01.778344Z',
        endretAv: 'Z990501 (veileder)',
        endretTidspunkt: '2025-05-31T03:58:01.778344Z',
    },
    {
        revisjonstype: Revisjonstype.ENDRET,
        revisjonsnummer: 1313,
        id: '366feba0-0810-4268-9efa-574aa7425c43',
        fom: '2025-05-01',

        opprettetAv: 'Z990501 (veileder)',
        opprettetTidspunkt: '2025-05-31T03:58:01.778344Z',
        endretAv: '08520285297 (deltaker)',
        endretTidspunkt: '2025-05-31T03:58:29.015999Z',
        søktTidspunkt: '2025-05-31T03:58:29.014744Z',
    },
    {
        revisjonstype: Revisjonstype.ENDRET,
        revisjonsnummer: 1314,
        id: '366feba0-0810-4268-9efa-574aa7425c43',
        fom: '2025-05-02',

        opprettetAv: 'Z990501 (veileder)',
        opprettetTidspunkt: '2025-05-31T03:58:01.778344Z',
        endretAv: 'Z990501 (veileder)',
        endretTidspunkt: '2025-05-31T03:58:59.763329Z',
        søktTidspunkt: '2025-05-31T03:58:29.014744Z',
    },
    {
        revisjonstype: Revisjonstype.ENDRET,
        revisjonsnummer: 1315,
        id: '366feba0-0810-4268-9efa-574aa7425c43',
        fom: '2025-05-02',
        tom: '2025-12-31',
        opprettetAv: 'Z990501 (veileder)',
        opprettetTidspunkt: '2025-05-31T03:58:01.778344Z',
        endretAv: 'Z990501 (veileder)',
        endretTidspunkt: '2025-05-31T04:00:45.045142Z',
        søktTidspunkt: '2025-05-31T03:58:29.014744Z',
    },
];

export const deltaker2Mock = {
    deltakerPersonalia,
    deltakelse,
    historikk,
};
