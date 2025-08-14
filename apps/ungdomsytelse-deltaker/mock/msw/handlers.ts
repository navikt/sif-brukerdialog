import { http, HttpResponse } from 'msw';
import { store } from '../state/store';
import { mockUtils } from '../utils/mockUtils';
import { ScenarioType } from '../scenarios/types';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';

store.init(ScenarioType.harSøkt);

export const getHandlers = () => [
    // Mock andre kall som kommer fra dekoratør
    http.get('*skyra*', () => new HttpResponse(null, { status: 200 })),
    http.post('*skyra*', () => new HttpResponse(null, { status: 200 })),
    http.post('*sentry*', () => new HttpResponse(null, { status: 200 })),
    http.get('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
    http.get('*nav.no*', () => new HttpResponse(null, { status: 200 })),
    http.get('*www.nav.no/dekoratoren*', () => new HttpResponse(null, { status: 200 })),
    http.get('*login*', () => new HttpResponse(null, { status: 200 })),

    // App api mocking
    http.get('**/deltaker/hent-kontonummer', () => {
        // return HttpResponse.json({ harKontonummer: true, kontonummer: '12345678901' });
        return HttpResponse.json({ error: { message: '503' } }, { status: 503 });
    }),

    http.get('**/oppslag/soker', () => HttpResponse.json(store.get().søker)),

    http.get('**/oppslag/barn', () => HttpResponse.json(store.get().barn)),

    http.get('**/oppslag/arbeidsgiver', () => HttpResponse.json(store.get().arbeidsgiver)),

    http.get('**/deltakelse/register/hent/alle', () => HttpResponse.json(store.get().deltakelser)),

    http.put('**/deltakelse/register/:id/marker-har-sokt', () => new HttpResponse(null, { status: 500 })),

    http.get('**/deltakelse/register/oppgave/:oppgaveReferanse/apnet', ({ params }) => {
        const ref = params.oppgaveReferanse;
        if (!ref || typeof ref !== 'string') return new HttpResponse(null, { status: 400 });
        const oppgave = mockUtils.setOppgaveSomÅpnet(ref as string);
        return HttpResponse.json(oppgave);
    }),

    http.get('**/deltakelse/register/oppgave/:oppgaveReferanse/lukk', ({ params }) => {
        const ref = params.oppgaveReferanse;
        if (!ref || typeof ref !== 'string') return new HttpResponse(null, { status: 400 });
        const oppgave = mockUtils.setOppgaveSomLukket(ref);
        return HttpResponse.json(oppgave);
    }),

    http.post('**/ungdomsytelse/soknad/innsending', () => {
        mockUtils.setDeltakelseSøktFor();
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
];
