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

describe('parseOppgaverElement - BEKREFT_OPPHOR_VED_MAKSDATO', () => {
    it('setter frist til dagen før oppgavens frist', () => {
        const [result] = parseOppgaverElement(OppgaveYtelsetype.UNGDOMSYTELSE, [
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
        expect(oppgave.oppgavetypeData.maksdato).toEqual('2026-06-30');
    });

    it('bevarer sluttdato som ISODate', () => {
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
        expect(oppgave.oppgavetypeData.sluttdato).toEqual('2026-06-25');
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
