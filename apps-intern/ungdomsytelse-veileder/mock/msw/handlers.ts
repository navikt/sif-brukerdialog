/* eslint-disable no-constant-condition */
import { delay, http, HttpResponse } from 'msw';
import { mockUtils } from './mockUtils';

const slowDown = (ms: number) => (1 + 1 === 1 ? Promise.resolve() : delay(ms));

export const handlers = [
    http.post<any, any>('**/oppslag/deltaker', async ({ request }) => {
        const formData = await request.json();
        const deltakerIdent = formData.deltakerIdent;

        /** Kode 6/7 */
        if (deltakerIdent === '09847696068') {
            return new HttpResponse(null, { status: 403 });
        }
        const data = mockUtils.findDeltaker(deltakerIdent);
        return data ? HttpResponse.json(data) : new HttpResponse(null, { status: 404 });
    }),

    http.get('**/oppslag/deltaker/:id', async ({ params }) => {
        const { id } = params;
        const data = mockUtils.getDeltakerByDeltakerId(id as string);
        await slowDown(75);
        return data ? HttpResponse.json(data) : HttpResponse.error();
    }),

    http.delete('**/veileder/register/deltaker/:deltakerId/fjern', async ({ params }) => {
        const { deltakerId } = params;
        const data = mockUtils.fjernDeltaker(deltakerId as string);
        await slowDown(75);
        return data ? HttpResponse.json(data) : HttpResponse.error();
    }),

    http.get('**/veileder/register/deltakelse/:deltakelseId/historikk', async ({ params }) => {
        const { deltakelseId } = params;
        const data = mockUtils.getDeltakelseHistorikk(deltakelseId as string);
        await slowDown(75);
        return data ? HttpResponse.json(data) : HttpResponse.error();
    }),

    http.get('**/veileder/register/deltaker/:deltakerId/deltakelser', async ({ params }) => {
        const data = mockUtils.getDeltakelser(params.deltakerId as string);
        await slowDown(500);
        return HttpResponse.json(data);
    }),

    http.post<any, any>('**/veileder/register/deltaker/innmelding', async ({ request }) => {
        const { deltakerIdent, startdato } = await request.json();
        const response = mockUtils.meldInnDeltaker(deltakerIdent, startdato);
        await slowDown(75);
        return HttpResponse.json(response);
    }),

    http.put<any, any>('**/veileder/register/deltakelse/:deltakelseId/endre/startdato', async ({ request, params }) => {
        const { dato } = await request.json();
        const { deltakelseId } = params;
        await slowDown(75);
        const response = mockUtils.endreStartdato(deltakelseId, dato);
        return HttpResponse.json(response);
    }),

    http.put<any, any>('**/veileder/register/deltakelse/:deltakelseId/endre/sluttdato', async ({ request, params }) => {
        const { dato } = await request.json();
        const { deltakelseId } = params;
        await slowDown(75);
        const response = mockUtils.endreSluttdato(deltakelseId, dato);
        return HttpResponse.json(response);
    }),
    http.put<any, any>('**/veileder/register/deltakelse/:deltakelseId/avslutt', async ({ request, params }) => {
        const { utmeldingsdato } = await request.json();
        const { deltakelseId } = params;
        await slowDown(75);
        const response = mockUtils.endreSluttdato(deltakelseId, utmeldingsdato);
        return HttpResponse.json(response);
    }),
    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
