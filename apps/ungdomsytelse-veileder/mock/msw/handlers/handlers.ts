/* eslint-disable max-len */
/* eslint-disable no-constant-condition */
import { delay, http, HttpResponse } from 'msw';
import { mockUtils } from '../mocks/mockUtils';

const slowDown = (ms: number) => (1 + 1 === 1 ? Promise.resolve() : delay(ms));

export const handlers = [
    http.get('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
    http.get('*login*', () => new HttpResponse(null, { status: 200 })),

    http.post<any, any>('**/oppslag/deltaker', async ({ request }) => {
        if (1 + 1 === 3) {
            return HttpResponse.json(
                {
                    type: 'about:blank',
                    title: 'Title - Deltaker ikke funnet',
                    status: 404,
                    detail: 'Detail: Deltaker ikke funnet',
                    instance: '**/oppslag/deltaker',
                },
                { status: 404 },
            );
        }
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

    http.delete('**/veileder/register/deltakelse/:deltakelseId/fjern', async () => {
        return new HttpResponse(null, { status: 403 });
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
        if (1 + 1 === 3) {
            return HttpResponse.json(
                {
                    type: 'about:blank',
                    title: 'Not Found',
                    status: 404,
                    detail: 'Fant ingen deltaker med id 699b9f97-b0d7-4b78-9b8e-8758feb9e0fd',
                    instance: '/veileder/register/deltaker/699b9f97-b0d7-4b78-9b8e-8758feb9e0fd/deltakelser',
                },
                { status: 404 },
            );
        }
        return HttpResponse.json(data);
    }),

    http.post<any, any>('**/veileder/register/deltaker/innmelding', async ({ request }) => {
        const { deltakerIdent, startdato } = await request.json();
        const response = mockUtils.meldInnDeltaker(deltakerIdent, startdato);
        await slowDown(75);
        return HttpResponse.json(response);
    }),

    http.put<any, any>('**/veileder/register/deltakelse/:deltakelseId/endre/startdato', async ({ request, params }) => {
        if (1 + 1 === 3) {
            return HttpResponse.json(
                {
                    type: '/problem-details/internal-server-error',
                    title: 'Et uventet feil har oppstått',
                    status: 500,
                    detail: 'Cannot update previous revision for entity no.nav.ung.deltakelseopplyser.domene.register.UngdomsprogramDeltakelseDAO_historikk and id be10ed2a-9ea7-4d7c-b2a0-1d735a685389 (0 rows modified).',
                    instance:
                        'https://ungdomsytelse-veileder.intern.dev.nav.no/veileder/register/deltakelse/be10ed2a-9ea7-4d7c-b2a0-1d735a685389/endre/startdato',
                },
                { status: 500 },
            );
        }
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
];
