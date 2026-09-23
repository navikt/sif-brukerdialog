import {
    AndreLivsoppholdsytelserAvklaringKildeType,
    AndreLivsoppholdsytelserIkkeOppfyltÅrsak,
    BostedsavklaringKildeType,
    BostedsvilkårIkkeOppfyltÅrsak,
    BrukerdialogOppgaveDto,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
    PeriodeEndringType,
} from '@navikt/ung-brukerdialog-api';
import { describe, expect, it } from 'vitest';

import { ParsedOppgavetype } from '../../../types/Oppgave';
import { parseOppgaver } from '../parseOppgaver';

const baseOppgave = {
    oppgaveReferanse: 'ae12cd84-1bc5-4f3a-9d2e-7b4a8c3f1e90',
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.ULØST,
    opprettetDato: '2026-05-01T08:00:00.000Z',
    frist: '2026-05-15T07:00:00.000Z',
};

type RegistryTestCase = {
    navn: string;
    oppgavetype: OppgaveType;
    oppgavetypeData: BrukerdialogOppgaveDto['oppgavetypeData'];
    forventetParsedOppgavetype: ParsedOppgavetype;
};

/**
 * Én rad per registrert oppgavetype i `oppgaveParsers`, pluss de alternative utfallene
 * `parseEndretPeriodeOppgave` og `parseEndretSluttdatoOppgave` kan produsere. Dette fanger opp
 * at riktig parser er koblet til riktig `OppgaveType`-nøkkel i registeret – noe `satisfies Record`
 * ikke fanger dersom to parsere byttes om.
 */
const registryTestCases: RegistryTestCase[] = [
    {
        navn: 'BEKREFT_BOSTED',
        oppgavetype: OppgaveType.BEKREFT_BOSTED,
        oppgavetypeData: {
            type: 'BOSTED',
            erBosattITrondheim: false,
            fom: '2026-01-01',
            tom: '2026-03-31',
            ikkeOppfyltÅrsak: BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
            kilde: BostedsavklaringKildeType.FOLKEREGISTER,
            varseltekst: 'mock',
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_BOSTED,
    },
    {
        navn: 'BEKREFT_ENDRET_STARTDATO',
        oppgavetype: OppgaveType.BEKREFT_ENDRET_STARTDATO,
        oppgavetypeData: {
            type: 'ENDRET_STARTDATO',
            forrigeStartdato: '2026-01-01',
            nyStartdato: '2026-01-15',
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
    },
    {
        navn: 'BEKREFT_ENDRET_SLUTTDATO (med forrige sluttdato)',
        oppgavetype: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
        oppgavetypeData: {
            type: 'ENDRET_SLUTTDATO',
            forrigeSluttdato: '2026-02-01',
            nySluttdato: '2026-03-01',
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    },
    {
        navn: 'BEKREFT_ENDRET_SLUTTDATO (uten forrige sluttdato => meldt ut)',
        oppgavetype: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
        oppgavetypeData: {
            type: 'ENDRET_SLUTTDATO',
            nySluttdato: '2026-03-01',
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_MELDT_UT,
    },
    {
        navn: 'BEKREFT_ENDRET_PERIODE (kun endret startdato)',
        oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
        oppgavetypeData: {
            type: 'ENDRET_PERIODE',
            endringer: [PeriodeEndringType.ENDRET_STARTDATO],
            forrigePeriode: { fomDato: '2026-01-01' },
            nyPeriode: { fomDato: '2026-01-15' },
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
    },
    {
        navn: 'BEKREFT_ENDRET_PERIODE (kun endret sluttdato, med forrige sluttdato)',
        oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
        oppgavetypeData: {
            type: 'ENDRET_PERIODE',
            endringer: [PeriodeEndringType.ENDRET_SLUTTDATO],
            forrigePeriode: { fomDato: '2026-01-01', tomDato: '2026-02-01' },
            nyPeriode: { fomDato: '2026-01-01', tomDato: '2026-03-01' },
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    },
    {
        navn: 'BEKREFT_ENDRET_PERIODE (kun endret sluttdato, uten forrige sluttdato => meldt ut)',
        oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
        oppgavetypeData: {
            type: 'ENDRET_PERIODE',
            endringer: [PeriodeEndringType.ENDRET_SLUTTDATO],
            forrigePeriode: { fomDato: '2026-01-01' },
            nyPeriode: { fomDato: '2026-01-01', tomDato: '2026-03-01' },
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_MELDT_UT,
    },
    {
        navn: 'BEKREFT_ENDRET_PERIODE (fjernet periode)',
        oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
        oppgavetypeData: {
            type: 'ENDRET_PERIODE',
            endringer: [PeriodeEndringType.FJERNET_PERIODE],
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE,
    },
    {
        navn: 'BEKREFT_ENDRET_PERIODE (endret start- og sluttdato)',
        oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
        oppgavetypeData: {
            type: 'ENDRET_PERIODE',
            endringer: [PeriodeEndringType.ENDRET_STARTDATO, PeriodeEndringType.ENDRET_SLUTTDATO],
            forrigePeriode: { fomDato: '2026-01-01', tomDato: '2026-02-01' },
            nyPeriode: { fomDato: '2026-01-10', tomDato: '2026-03-01' },
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO,
    },
    {
        navn: 'BEKREFT_AVVIK_REGISTERINNTEKT',
        oppgavetype: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT,
        oppgavetypeData: {
            type: 'KONTROLLER_REGISTERINNTEKT',
            fraOgMed: '2026-01-01',
            tilOgMed: '2026-01-31',
            gjelderDelerAvMåned: false,
            registerinntekt: {
                totalInntekt: 10000,
                totalInntektArbeidOgFrilans: 10000,
                totalInntektYtelse: 0,
            },
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    },
    {
        navn: 'RAPPORTER_INNTEKT',
        oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
        oppgavetypeData: {
            type: 'INNTEKTSRAPPORTERING',
            fraOgMed: '2026-01-01',
            tilOgMed: '2026-01-31',
            gjelderDelerAvMåned: false,
        },
        forventetParsedOppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
    },
    {
        navn: 'SØK_YTELSE',
        oppgavetype: OppgaveType.SØK_YTELSE,
        oppgavetypeData: {
            type: 'SØK_YTELSE',
            fomDato: '2026-01-01',
        },
        forventetParsedOppgavetype: ParsedOppgavetype.SØK_YTELSE,
    },
    {
        navn: 'BEKREFT_OPPHOR_VED_MAKSDATO',
        oppgavetype: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO,
        oppgavetypeData: {
            type: 'OPPHOR_VED_MAKSDATO',
            maxDato: '2026-06-30',
            sluttdato: '2026-06-30',
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO,
    },
    {
        navn: 'BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER',
        oppgavetype: OppgaveType.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER,
        oppgavetypeData: {
            type: 'ANDRE_LIVSOPPHOLDSYTELSER',
            ikkeOppfyltÅrsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ARBEIDSAVKLARINGSPENGER,
            fom: '2026-01-01',
            tom: '2026-03-31',
            kilde: AndreLivsoppholdsytelserAvklaringKildeType.NAV,
            varseltekst: 'mock',
        },
        forventetParsedOppgavetype: ParsedOppgavetype.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER,
    },
];

/** Disse oppgavetypene finnes i backend, men er bevisst ikke støttet i frontend ennå. */
const ikkeStøttedeOppgavetyper: OppgaveType[] = [OppgaveType.BEKREFT_BISTAND, OppgaveType.BEKREFT_AKTIVITET];

describe('parseOppgaver - registeret ruter hver oppgavetype til riktig parser', () => {
    it.each(registryTestCases)('$navn', ({ oppgavetype, oppgavetypeData, forventetParsedOppgavetype }) => {
        const [result] = parseOppgaver([{ ...baseOppgave, oppgavetype, oppgavetypeData }]);

        expect(result.parsedOppgavetype).toBe(forventetParsedOppgavetype);
    });

    it('har minst én testrad for hver oppgavetype som er registrert i oppgaveParsers', () => {
        const testedeTyper = new Set([
            ...registryTestCases.map((testCase) => testCase.oppgavetype),
            ...ikkeStøttedeOppgavetyper,
        ]);

        Object.values(OppgaveType).forEach((oppgavetype) => {
            expect(testedeTyper.has(oppgavetype)).toBe(true);
        });
    });

    it.each(ikkeStøttedeOppgavetyper)('%s kaster feil fordi oppgavetypen ikke er støttet i frontend', (oppgavetype) => {
        expect(() =>
            parseOppgaver([{ ...baseOppgave, oppgavetype, oppgavetypeData: { type: 'IKKE_RELEVANT' } as never }]),
        ).toThrow();
    });
});
