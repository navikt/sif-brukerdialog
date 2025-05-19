import { http, HttpResponse } from 'msw';
import { mockUtils } from '../mocks/mockUtils';

export const getHandlers = () => {
    const { barn, arbeidsgiver, søker, deltakelser } = mockUtils.getData();

    return [
        http.get('*skyra*', () => new HttpResponse(null, { status: 200 })),
        http.post('*skyra*', () => new HttpResponse(null, { status: 200 })),
        http.post('*sentry*', () => new HttpResponse(null, { status: 200 })),
        http.get('*amplitude*', () => new HttpResponse(null, { status: 200 })),
        http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
        http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
        http.get('*nav.no*', () => new HttpResponse(null, { status: 200 })),
        http.get('*www.nav.no/dekoratoren*', () => new HttpResponse(null, { status: 200 })),
        http.get('*login*', () => new HttpResponse(null, { status: 200 })),

        http.get('**/deltaker/hent-kontonummer', async () => {
            return HttpResponse.json({ harKontonummer: true, kontonummer: '12345678901' });
        }),
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
            return HttpResponse.json(deltakelser);
        }),
        http.put('**/deltakelse/register/:id/marker-har-sokt', () => {
            return new HttpResponse(null, { status: 500 });
        }),
        http.post('**/ungdomsytelse/soknad/innsending', () => {
            mockUtils.setDeltakelseSøktFor(); // Forutsetter kun én deltakelse i mock-databasen
            return HttpResponse.json({});
        }),
        // http.post('**/ungdomsytelse/oppgavebekreftelse/innsending', async ({ request }) => {
        //     const text = await request.text();
        //     await delay(1000);
        //     try {
        //         // const data = zUngdomsytelseOppgavebekreftelse.parse(JSON.parse(text));
        //         // deltakelserMockStorage.actions.setOppgavebekreftelse(JSON.parse(text));
        //     } catch (e) {
        //         console.log(e);
        //     }
        //     return new HttpResponse(null, { status: 200 });
        // }),
        // http.post('**/ungdomsytelse/inntektsrapportering/innsending', async ({ request }) => {
        //     const text = await request.text();
        //     // const data = zUngdomsytelseInntektsrapportering.parse(JSON.parse(text));
        //     // deltakelserMockStorage.actions.setInntektRapportert(JSON.parse(text).oppgittInntektForPeriode);
        //     return Promise.resolve(new HttpResponse(null, { status: 200 }));
        // }),
        // http.get(`**/mellomlagring/${YTELSE}`, () => {
        //     const data = localStorage.getItem(MellomlagringStorageKey);
        //     const jsonData = JSON.parse(JSON.stringify(data) || '{}');
        //     const returnData: MellomlagringDTO = jsonData || {
        //         søknad: {
        //             bekrefter: true,
        //             barn: 'yes',
        //             kontonummer: 'no',
        //         },
        //         meta: { aktivtSteg: Steg.BARN, hash: '' },
        //     };
        //     return HttpResponse.json(returnData, { status: 200 });
        // }),
        // http.post(`**/mellomlagring/${YTELSE}`, async ({ request }) => {
        //     const data = await request.text();
        //     localStorage.setItem(MellomlagringStorageKey, data);
        //     return new HttpResponse(null, { status: 200 });
        // }),
        // http.put(`**/mellomlagring/${YTELSE}`, async ({ request }) => {
        //     const data = await request.text();
        //     localStorage.setItem(MellomlagringStorageKey, data);
        //     return new HttpResponse(null, { status: 200 });
        // }),
        // http.delete(`**/mellomlagring/${YTELSE}`, () => {
        //     localStorage.setItem(MellomlagringStorageKey, '');
        //     return new HttpResponse(null, { status: 200 });
        // }),
    ];
};
