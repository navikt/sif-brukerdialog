import { Oppgavetype } from '../../../../../src/api/schemas/oppgaveSchema';
import { DeltakelseDTO } from '../../deltakelseDTOSchema';

export const deltakelserHarSøkt: DeltakelseDTO[] = [
    {
        id: '123',
        programperiodeFraOgMed: '2024-07-01',
        programperiodeTilOgMed: '2025-06-30',
        harSøkt: true,
        oppgaver: [
            {
                type: Oppgavetype.bekreftEndretStartdato,
                startdato: '2024-07-01',
                svarfrist: '2024-07-31',
            },
            {
                type: Oppgavetype.bekreftEndretSluttdato,
                sluttdato: '2024-07-01',
                svarfrist: '2024-07-31',
            },
        ],
        rapporteringsPerioder: [
            {
                fraOgMed: '2024-07-01',
                tilOgMed: '2024-07-31',
                harRapportert: true,
                kanRapportere: true,
                inntekt: {
                    arbeidstakerOgFrilansInntekt: 0,
                    næringsinntekt: 0,
                    inntektFraYtelse: 0,
                    summertInntekt: 0,
                },
            },
            {
                fraOgMed: '2024-08-01',
                tilOgMed: '2024-08-31',
                harRapportert: true,
                kanRapportere: true,
                inntekt: {
                    arbeidstakerOgFrilansInntekt: 0,
                    næringsinntekt: 0,
                    inntektFraYtelse: 0,
                    summertInntekt: 0,
                },
            },
            {
                fraOgMed: '2024-09-01',
                tilOgMed: '2024-09-30',
                harRapportert: true,
                kanRapportere: true,
                inntekt: {
                    arbeidstakerOgFrilansInntekt: 0,
                    næringsinntekt: 0,
                    inntektFraYtelse: 0,
                    summertInntekt: 0,
                },
            },
            {
                fraOgMed: '2024-10-01',
                tilOgMed: '2024-10-31',
                harRapportert: true,
                kanRapportere: true,
                inntekt: {
                    arbeidstakerOgFrilansInntekt: 0,
                    næringsinntekt: 0,
                    inntektFraYtelse: 0,
                    summertInntekt: 0,
                },
            },
            {
                fraOgMed: '2024-11-01',
                tilOgMed: '2024-11-30',
                harRapportert: true,
                kanRapportere: true,
                inntekt: {
                    arbeidstakerOgFrilansInntekt: 0,
                    næringsinntekt: 0,
                    inntektFraYtelse: 0,
                    summertInntekt: 0,
                },
            },
            {
                fraOgMed: '2024-12-01',
                tilOgMed: '2024-12-31',
                harRapportert: true,
                kanRapportere: true,
                inntekt: {
                    arbeidstakerOgFrilansInntekt: 2180,
                    næringsinntekt: 0,
                    inntektFraYtelse: 1500,
                    summertInntekt: 0,
                },
            },
            {
                fraOgMed: '2025-01-01',
                tilOgMed: '2025-01-31',
                harRapportert: false,
                kanRapportere: true,
                inntekt: null,
            },
            {
                fraOgMed: '2025-02-01',
                tilOgMed: '2025-02-28',
                harRapportert: false,
                kanRapportere: false,
                inntekt: null,
            },
            {
                fraOgMed: '2025-03-01',
                tilOgMed: '2025-03-31',
                harRapportert: false,
                kanRapportere: false,
                inntekt: null,
            },
            {
                fraOgMed: '2025-04-01',
                tilOgMed: '2025-04-30',
                harRapportert: false,
                kanRapportere: false,
                inntekt: null,
            },
            {
                fraOgMed: '2025-05-01',
                tilOgMed: '2025-05-31',
                harRapportert: false,
                kanRapportere: false,
                inntekt: null,
            },
            {
                fraOgMed: '2025-06-01',
                tilOgMed: '2025-06-30',
                harRapportert: false,
                kanRapportere: false,
                inntekt: null,
            },
        ],
    },
];
