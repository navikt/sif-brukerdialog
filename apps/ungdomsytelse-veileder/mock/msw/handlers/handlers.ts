import { delay, http, HttpResponse } from 'msw';
import { getDeltakelser, getDeltakerByDeltakerId, getDeltakerByDeltakerIdent } from '../mocks/mockUtils';

export const handlers = [
    http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
    http.get('*login*', () => new HttpResponse(null, { status: 200 })),

    http.post<any, any>('**/oppslag/deltaker', async ({ request }) => {
        const formData = await request.json();
        const deltakerIdent = formData!.deltakerIdent;
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
        console.log(data);
        await delay(250);
        return HttpResponse.json(data);
    }),

    // http.post('**/veileder/register/deltaker/innmelding', async ({ request }) => {
    //     const info = await request.formData();
    //     const deltakerIdent = info.get('deltakerIdent');
    //     const fraOgMed = info.get('startdato');

    //     const response = {
    //         id: 'd-n',
    //         deltakerIdent,
    //         deltaker: {
    //             id: 'd-n',
    //             deltakerIdent,
    //         },
    //         harSøkt: false,
    //         fraOgMed,
    //     };
    //     setTimeout(() => {
    //         return HttpResponse.json(response);
    //     }, 1500);
    // }),

    // http.put('**/veileder/register/deltakelse/:id/avslutt', (req, res) => {
    //     const response = {
    //         // ...deltakelse1,
    //         tilOgMed: req.body.utmeldingsdato,
    //     };
    //     setTimeout(() => {
    //         res.status(200).send(response);
    //     }, 1500);
    // }),

    // http.put('**/veileder/register/deltakelse/:id/oppdater', (req, res) => {
    //     const body = req.body;
    //     const response = {
    //         // ...deltakelse1,
    //         ...body,
    //     };
    //     setTimeout(() => {
    //         res.status(200).send(response);
    //     }, 50);
    // }),

    // http.delete('**/veileder/register/deltakelse/:id/fjern', (_, res) => {
    //     res.sendStatus(200);
    // }),
];
