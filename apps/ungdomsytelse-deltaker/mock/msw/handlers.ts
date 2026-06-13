import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { delay, http, HttpResponse } from 'msw';

import { ScenarioType } from '../scenarios/types';
import { store } from '../state/store';
import { mockUtils } from '../utils/mockUtils';

store.init(ScenarioType.søknad);

export const handlers = [
    http.get('**/deltaker/hent-kontonummer', () => {
        return HttpResponse.json({ harKontonummer: true, kontonummer: '12345678901' });
    }),

    http.get('**/oppslag/soker', () => HttpResponse.json(store.get().søker)),

    http.get('**/oppslag/barn', () => HttpResponse.json(store.get().barn)),

    http.get('**/oppslag/arbeidsgiver', () => HttpResponse.json(store.get().arbeidsgiver)),

    http.get('**/deltakelse/register/hent/alle/v2', () => HttpResponse.json(store.get().deltakelser)),

    http.put('**/deltakelse/register/:id/marker-har-sokt/v2', () => new HttpResponse(null, { status: 500 })),

    http.get('**/oppgave/hent/alle', () => {
        const oppgaver = store.get().oppgaver;
        return HttpResponse.json(oppgaver);
    }),

    http.get('**/mellomlagring/:ytelse', () => HttpResponse.json(store.get().mellomlagring ?? {})),

    http.post('**/mellomlagring/:ytelse', async ({ request }) => {
        await delay(50);
        const data = (await request.json()) as Record<string, unknown>;
        store.update({ mellomlagring: data });
        return HttpResponse.json({});
    }),

    http.put('**/mellomlagring/:ytelse', async ({ request }) => {
        await delay(50);
        const data = (await request.json()) as Record<string, unknown>;
        store.update({ mellomlagring: data });
        return HttpResponse.json({});
    }),

    http.delete('**/mellomlagring/:ytelse', () => {
        store.update({ mellomlagring: undefined });
        return HttpResponse.json({});
    }),

    http.post('**/ungdomsytelse/soknad/innsending', () => {
        store.setScenario(ScenarioType.søknadSendt);
        return HttpResponse.json({});
    }),

    http.post('**/ungdomsytelse/oppgavebekreftelse/innsending', async ({ request }) => {
        const text = await request.text();
        try {
            const parsed: UngdomsytelseOppgavebekreftelse = JSON.parse(text);
            mockUtils.setOppgavebekreftelse(parsed.oppgave.oppgaveReferanse, parsed);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
        }
        return new HttpResponse(null, { status: 200 });
    }),

    http.post('**/ungdomsytelse/inntektsrapportering/innsending', async ({ request }) => {
        const text = await request.text();
        const parsed = JSON.parse(text);
        mockUtils.setRapportertInntekt(parsed.oppgaveReferanse, parsed);
        return new HttpResponse(null, { status: 200 });
    }),

    http.get('*', () => new HttpResponse(null, { status: 200 })),
    http.post('*', () => new HttpResponse(null, { status: 200 })),
];
