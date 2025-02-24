import { delay, http, HttpResponse } from 'msw';
import { getDeltakelser, getDeltakerByDeltakerId, getDeltakerByDeltakerIdent } from '../mocks/mockUtils';

export const handlers = [
    http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
    http.get('*login*', () => new HttpResponse(null, { status: 200 })),

    http.post<any, any>('**/oppslag/deltaker', async ({ request }) => {
        const formData = await request.json();
        const deltakerIdent = formData.deltakerIdent;
        const data = getDeltakerByDeltakerIdent(deltakerIdent);
        return data ? HttpResponse.json(data) : new HttpResponse(null, { status: 404 });
    }),

    http.get('**/oppslag/deltaker/:id', async ({ params }) => {
        const { id } = params;
        const data = getDeltakerByDeltakerId(id);
        return data ? HttpResponse.json(data) : HttpResponse.error();
    }),

    http.get('**/veileder/register/deltaker/:deltakerId/deltakelser', async ({ params }) => {
        const data = getDeltakelser(params.deltakerId);
        await delay(250);
        return HttpResponse.json(data);
    }),

    http.post<any, any>('**/veileder/register/deltaker/innmelding', async ({ request }) => {
        const { deltakerIdent, startdato } = await request.json();
        const response = {
            id: 'd-n',
            deltaker: {
                id: 'd-n',
                deltakerIdent,
            },
            oppgaver: [],
            harSøkt: false,
            fraOgMed: startdato,
        };
        await delay(250);
        return HttpResponse.json(response);
    }),
];
