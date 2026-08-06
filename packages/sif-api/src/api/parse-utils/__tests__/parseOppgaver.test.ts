import {
    BostedsvilkårIkkeOppfyltÅrsak,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { describe, expect, it } from 'vitest';

import {
    BostedVilkårOppgave,
    BostedVilkårOpphørOppgave,
    OpphorVedMaksdatoOppgave,
    ParsedOppgavetype,
} from '../../../types/Oppgave';
import { parseOppgaver } from '../parseOppgaver';

const baseOppgave = {
    oppgaveReferanse: 'ae12cd84-1bc5-4f3a-9d2e-7b4a8c3f1e90',
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.ULØST,
    opprettetDato: '2026-05-01T08:00:00.000Z',
    frist: '2026-05-15T07:00:00.000Z',
};

describe('parseOppgaver - BEKREFT_OPPHOR_VED_MAKSDATO', () => {
    it('setter frist til dagen før oppgavens frist', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                frist: '2026-05-15T07:00:00.000Z',
                oppgavetype: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO,
                oppgavetypeData: { type: 'OPPHOR_VED_MAKSDATO', maxDato: '2026-06-30', sluttdato: '2026-06-30' },
            },
        ]);
        expect((result as OpphorVedMaksdatoOppgave).frist).toBe('2026-05-14');
    });

    it('mapper maxDato til oppgavetypeData.maksdato som ISODate', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO,
                oppgavetypeData: {
                    type: 'OPPHOR_VED_MAKSDATO',
                    maxDato: '2026-06-30',
                    sluttdato: '2026-06-30',
                },
            },
        ]);

        const oppgave = result as OpphorVedMaksdatoOppgave;
        expect(oppgave.parsedOppgavetype).toBe(ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO);
        expect(oppgave.oppgavetypeData.maksdato).toEqual('2026-06-30');
    });

    it('bevarer sluttdato som ISODate', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO,
                oppgavetypeData: {
                    type: 'OPPHOR_VED_MAKSDATO',
                    maxDato: '2026-06-30',
                    sluttdato: '2026-06-25',
                },
            },
        ]);

        const oppgave = result as OpphorVedMaksdatoOppgave;
        expect(oppgave.oppgavetypeData.sluttdato).toEqual('2026-06-25');
    });

    it('parser VARSEL_SVAR-respons korrekt', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO,
                oppgavetypeData: {
                    type: 'OPPHOR_VED_MAKSDATO',
                    maxDato: '2026-06-30',
                    sluttdato: '2026-06-30',
                },
                respons: {
                    type: 'VARSEL_SVAR',
                    harUttalelse: true,
                    uttalelseFraBruker: 'Jeg er uenig',
                },
                status: OppgaveStatus.LØST,
                løstDato: '2026-05-10T12:00:00.000Z',
            },
        ]);

        const oppgave = result as OpphorVedMaksdatoOppgave;
        expect(oppgave.respons).toEqual({
            type: 'VARSEL_SVAR',
            harUttalelse: true,
            uttalelseFraBruker: 'Jeg er uenig',
        });
    });

    it('setter respons til undefined når ingen respons er oppgitt', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO,
                oppgavetypeData: {
                    type: 'OPPHOR_VED_MAKSDATO',
                    maxDato: '2026-06-30',
                    sluttdato: '2026-06-30',
                },
            },
        ]);

        const oppgave = result as OpphorVedMaksdatoOppgave;
        expect(oppgave.respons).toBeUndefined();
    });
});

const baseBostedData = {
    erBosattITrondheim: false,
    ikkeOppfyltÅrsak: BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
    fom: '2026-01-01',
};

const baseBostedOppgavetypeData = { type: 'BOSTED' as const, ...baseBostedData, tom: '2026-03-31' };
const baseBostedOpphørOppgavetypeData = { type: 'BOSTED_OPPHØR' as const, ...baseBostedData };

describe('parseOppgaver - BEKREFT_BOSTED (BostedVilkårOppgave)', () => {
    it('setter parsedOppgavetype til BEKREFT_BOSTED når data har tom', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: { type: 'BOSTED', ...baseBostedData, tom: '2026-03-31' },
            },
        ]);

        expect((result as BostedVilkårOppgave).parsedOppgavetype).toBe(ParsedOppgavetype.BEKREFT_BOSTED);
    });

    it('mapper fom og tom til periode.from og periode.to', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: { type: 'BOSTED' as const, ...baseBostedData, tom: '2026-03-31' },
            },
        ]);

        const oppgave = result as BostedVilkårOppgave;
        expect(oppgave.oppgavetypeData.periode.from).toBe('2026-01-01');
        expect(oppgave.oppgavetypeData.periode.to).toBe('2026-03-31');
    });

    it('bevarer erBosattITrondheim og ikkeOppfyltÅrsak', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: baseBostedOppgavetypeData,
            },
        ]);

        const oppgave = result as BostedVilkårOppgave;
        expect(oppgave.oppgavetypeData.erBosattITrondheim).toBe(false);
        expect(oppgave.oppgavetypeData.ikkeOppfyltÅrsak).toBe(
            BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        );
    });

    it('setter frist til dagen før oppgavens frist', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                frist: '2026-05-15T07:00:00.000Z',
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: baseBostedOppgavetypeData,
            },
        ]);

        expect((result as BostedVilkårOppgave).frist).toBe('2026-05-14');
    });

    it('parser VARSEL_SVAR-respons korrekt', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: baseBostedOppgavetypeData,
                respons: { type: 'VARSEL_SVAR', harUttalelse: true, uttalelseFraBruker: 'Ok' },
                status: OppgaveStatus.LØST,
                løstDato: '2026-05-10T12:00:00.000Z',
            },
        ]);

        const oppgave = result as BostedVilkårOppgave;
        expect(oppgave.respons).toEqual({ type: 'VARSEL_SVAR', harUttalelse: true, uttalelseFraBruker: 'Ok' });
    });

    it('setter respons til undefined når ingen respons er oppgitt', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: baseBostedOppgavetypeData,
            },
        ]);

        expect((result as BostedVilkårOppgave).respons).toBeUndefined();
    });
});

describe('parseOppgaver - BEKREFT_BOSTED (BostedVilkårOpphørOppgave)', () => {
    it('setter parsedOppgavetype til BEKREFT_BOSTED_OPPHØR når data mangler tom', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: baseBostedOpphørOppgavetypeData,
            },
        ]);

        expect((result as BostedVilkårOpphørOppgave).parsedOppgavetype).toBe(ParsedOppgavetype.BEKREFT_BOSTED_OPPHØR);
    });

    it('bevarer fom som ISODate', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: baseBostedOpphørOppgavetypeData,
            },
        ]);

        const oppgave = result as BostedVilkårOpphørOppgave;
        expect(oppgave.oppgavetypeData.fom).toBe('2026-01-01');
    });

    it('bevarer erBosattITrondheim og ikkeOppfyltÅrsak', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: baseBostedOpphørOppgavetypeData,
            },
        ]);

        const oppgave = result as BostedVilkårOpphørOppgave;
        expect(oppgave.oppgavetypeData.erBosattITrondheim).toBe(false);
        expect(oppgave.oppgavetypeData.ikkeOppfyltÅrsak).toBe(
            BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        );
    });

    it('setter frist til dagen før oppgavens frist', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                frist: '2026-05-15T07:00:00.000Z',
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: baseBostedOpphørOppgavetypeData,
            },
        ]);

        expect((result as BostedVilkårOpphørOppgave).frist).toBe('2026-05-14');
    });

    it('parser VARSEL_SVAR-respons korrekt', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: baseBostedOpphørOppgavetypeData,
                respons: { type: 'VARSEL_SVAR', harUttalelse: false, uttalelseFraBruker: undefined },
                status: OppgaveStatus.LØST,
                løstDato: '2026-05-10T12:00:00.000Z',
            },
        ]);

        const oppgave = result as BostedVilkårOpphørOppgave;
        expect(oppgave.respons).toEqual({ type: 'VARSEL_SVAR', harUttalelse: false, uttalelseFraBruker: undefined });
    });

    it('setter respons til undefined når ingen respons er oppgitt', () => {
        const [result] = parseOppgaver(OppgaveYtelsetype.UNGDOMSYTELSE, [
            {
                ...baseOppgave,
                oppgavetype: OppgaveType.BEKREFT_BOSTED,
                oppgavetypeData: baseBostedOpphørOppgavetypeData,
            },
        ]);

        expect((result as BostedVilkårOpphørOppgave).respons).toBeUndefined();
    });
});
