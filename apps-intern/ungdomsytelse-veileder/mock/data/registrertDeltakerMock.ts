import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils';
import {
    DeltakelseDto,
    DeltakelseHistorikkDto,
    DeltakerPersonalia,
    Endringstype,
    Revisjonstype,
} from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { addUkedagerToDate } from '../../src/utils/deltakelseUtils';

const deltakerPersonalia: DeltakerPersonalia = {
    id: '699b9f97-b0d7-4b78-9b8e-8758feb9e0fd',
    deltakerIdent: '03867198392',
    navn: {
        fornavn: 'PRESENTABEL',
        etternavn: 'HOFTE',
    },
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2013-05-10',
    sisteMuligeInnmeldingsdato: '2029-04-10',
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
    harOpphørsvedtak: false,
    søktTidspunkt: '2025-05-21T12:00:20.859873Z',
    harForlengetPeriode: false,
    forlengetPeriodeMaksDato: dateToISODate(addUkedagerToDate(ISODateToDate('2025-03-10'), 260)),
    periodeMaksDato: dateToISODate(addUkedagerToDate(ISODateToDate('2025-03-10'), 260)),
    harUtvidetKvote: false,
    kvoteMaksDato: dateToISODate(addUkedagerToDate(ISODateToDate('2025-03-10'), 260)),
};

const deltakelseHistorikk: DeltakelseHistorikkDto[] = [
    {
        tidspunkt: '2026-04-10T08:30:35.520709Z',
        endringstype: Endringstype.DELTAKER_MELDT_INN,
        revisjonstype: Revisjonstype.OPPRETTET,
        endring: 'Deltaker er meldt inn i programmet.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2026-04-10T08:30:53.180905Z',
        endringstype: Endringstype.DELTAKER_HAR_SØKT_YTELSE,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Deltaker har søkt om ytelse den 10.04.2026 10:30.',
        aktør: '24529831982 (deltaker)',
    },
    {
        tidspunkt: '2026-04-10T08:31:23.024729Z',
        endringstype: Endringstype.ENDRET_STARTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Startdato for deltakelse er endret fra 01.04.2026 til 30.03.2026.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2026-04-13T05:03:13.90676Z',
        endringstype: Endringstype.ENDRET_STARTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Startdato for deltakelse er endret fra 30.03.2026 til 01.04.2026.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2026-04-13T05:04:40.63387Z',
        endringstype: Endringstype.DELTAKER_MELDT_UT,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Deltaker meldt ut med sluttdato 01.07.2026.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2026-04-15T07:02:44.407824Z',
        endringstype: Endringstype.ENDRET_SLUTTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Sluttdato for deltakelse er endret fra 01.07.2026 til 06.07.2026.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2026-04-24T11:21:25.722868Z',
        endringstype: Endringstype.ENDRET_SLUTTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Sluttdato for deltakelse er endret fra 06.07.2026 til 13.07.2026.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: '2026-04-30T05:01:35.127062Z',
        endringstype: Endringstype.FORLENGET_PERIODE,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Perioden er forlenget med 8 uker (fra 01.04.2026 til 25.05.2027).',
        aktør: 'Z990501 (veileder)',
    },
];

export const registrertDeltakerMock = {
    id: deltakerPersonalia.id!,
    deltakerPersonalia,
    deltakelse,
    deltakelseHistorikk,
};
