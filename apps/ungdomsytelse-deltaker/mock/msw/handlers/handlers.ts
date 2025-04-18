import { delay, http, HttpResponse } from 'msw';
import { getScenarioFromLocalStorage } from '../../../src/dev/scenarioer';
import { getScenarioMockData } from '../mocks/scenarioes';
import { deltakelserMockStorage } from './deltakelseMockStorage';

export const getHandlers = () => {
    const scenario = getScenarioFromLocalStorage();
    const { barn, arbeidsgiver, søker } = getScenarioMockData(scenario.value);

    return [
        http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
        http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
        http.get('*nav.no*', () => new HttpResponse(null, { status: 200 })),
        http.get('*login*', () => new HttpResponse(null, { status: 200 })),

        http.get('**/oppslag/soker', () => {
            return HttpResponse.json(søker);
        }),
        http.get('**/oppslag/barn', () => {
            return HttpResponse.json(barn);
        }),
        http.get('**/oppslag/arbeidsgiver', () => {
            return HttpResponse.json(arbeidsgiver);
        }),
        http.get('**/deltakelse/register/hent/alle', () => {
            return HttpResponse.json(deltakelserMockStorage.get());
        }),
        http.post('**/marker-har-sokt', () => {
            return HttpResponse.json({});
        }),
        http.post('**/ungdomsytelse/soknad/innsending', () => {
            deltakelserMockStorage.actions.setDeltakelseSøktFor();
            return new HttpResponse(null, { status: 200 });
        }),
        http.post('**/ungdomsytelse/oppgavebekreftelse/innsending', async ({ request }) => {
            const text = await request.text();
            await delay(1000);
            try {
                // const data = zUngdomsytelseOppgavebekreftelse.parse(JSON.parse(text));
                deltakelserMockStorage.actions.setOppgavebekreftelse(JSON.parse(text));
            } catch (e) {
                console.log(e);
            }
            return new HttpResponse(null, { status: 200 });
        }),
        http.post('**/ungdomsytelse/inntektsrapportering/innsending', async ({ request }) => {
            const text = await request.text();
            // const data = zUngdomsytelseInntektsrapportering.parse(JSON.parse(text));
            deltakelserMockStorage.actions.setInntektRapportert(JSON.parse(text).oppgittInntektForPeriode);
            return Promise.resolve(new HttpResponse(null, { status: 200 }));
        }),
    ];
};
