import { dateToISODate } from '@navikt/sif-common-utils';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { describe, expect, it } from 'vitest';

import { OpphorVedMaksdatoOppgave, ParsedOppgavetype } from '../../../types/Oppgave';
import { parseOppgaverElement } from '../parseOppgaverElement';

const baseOppgave = {
    oppgaveReferanse: 'ae12cd84-1bc5-4f3a-9d2e-7b4a8c3f1e90',
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.ULØST,
    opprettetDato: '2026-05-01T08:00:00.000Z',
    frist: '2026-05-15T07:00:00.000Z',
};

const oppgaveMedFrist = (frist: string) => ({
    ...baseOppgave,
    frist,
    oppgavetype: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO,
    oppgavetypeData: { type: 'OPPHOR_VED_MAKSDATO', maxDato: '2026-06-30', sluttdato: '2026-06-30' },
});

describe('getSisteDatoEnKanSvare – tidssonerobusthet', () => {
    it('beregner sisteDatoEnKanSvare som lokal kalenderdag før fristen', () => {
        /**
         * Frist er 07:00 UTC = 00:00 PDT (SF, UTC-7).
         * Med lokal dayjs ville SF gi Apr 10 → subtract 1 → Apr 9 ❌
         * Med UTC-lesing: Apr 11 UTC → subtract 1 → Apr 10 ✅
         */
        const [result] = parseOppgaverElement(OppgaveYtelsetype.UNGDOMSYTELSE, [
            oppgaveMedFrist('2026-05-15T07:00:00.000Z'),
        ]);
        expect(dateToISODate((result as OpphorVedMaksdatoOppgave).sisteDatoEnKanSvare)).toBe('2026-05-14');
    });

    it('beregner sisteDatoEnKanSvare korrekt for frist midt på dagen UTC', () => {
        const [result] = parseOppgaverElement(OppgaveYtelsetype.UNGDOMSYTELSE, [
            oppgaveMedFrist('2026-05-15T12:00:00.000Z'),
        ]);
        expect(dateToISODate((result as OpphorVedMaksdatoOppgave).sisteDatoEnKanSvare)).toBe('2026-05-14');
    });
});

describe('parseOppgaverElement – BEKREFT_OPPHOR_VED_MAKSDATO', () => {
    it('mapper maxDato til oppgavetypeData.maksdato som Date', () => {
        const [result] = parseOppgaverElement(OppgaveYtelsetype.UNGDOMSYTELSE, [
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
        expect(dateToISODate(oppgave.oppgavetypeData.maksdato)).toBe('2026-06-30');
    });

    it('bevarer sluttdato som Date', () => {
        const [result] = parseOppgaverElement(OppgaveYtelsetype.UNGDOMSYTELSE, [
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
        expect(dateToISODate(oppgave.oppgavetypeData.sluttdato)).toBe('2026-06-25');
    });

    it('parser VARSEL_SVAR-respons korrekt', () => {
        const [result] = parseOppgaverElement(OppgaveYtelsetype.UNGDOMSYTELSE, [
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
        const [result] = parseOppgaverElement(OppgaveYtelsetype.UNGDOMSYTELSE, [
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
