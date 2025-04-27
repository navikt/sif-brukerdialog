/* eslint-disable no-constant-condition */
import { DeltakelseOpplysningDto } from '@navikt/ung-deltakelse-opplyser-api';
import { delay, http, HttpResponse } from 'msw';
import {
    deltakelseDNMock,
    findDeltaker,
    getDeltakelser,
    getDeltakerByDeltakerId,
    registrertDeltakerId,
} from '../mocks/mockUtils';

export const handlers = [
    http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
    http.get('*login*', () => new HttpResponse(null, { status: 200 })),

    http.post<any, any>('**/oppslag/deltaker', async ({ request }) => {
        const formData = await request.json();
        const deltakerIdent = formData.deltakerIdent;

        /** Kode 6/7 */
        if (deltakerIdent === '09847696068') {
            return new HttpResponse(null, { status: 403 });
        }
        const data = findDeltaker(deltakerIdent);
        return data ? HttpResponse.json(data) : new HttpResponse(null, { status: 404 });
    }),

    http.get('**/oppslag/deltaker/:id', async ({ params }) => {
        const { id } = params;
        const data = getDeltakerByDeltakerId(id as string);
        await delay(250);
        return data ? HttpResponse.json(data) : HttpResponse.error();
    }),

    http.delete('**/veileder/register/deltakelse/:deltakelseId/fjern', async () => {
        return new HttpResponse(null, { status: 403 });
    }),

    http.get('**/veileder/register/deltaker/:deltakerId/deltakelser', async ({ params }) => {
        const data = getDeltakelser(params.deltakerId as string);
        await delay(1500);
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
        const response: DeltakelseOpplysningDto = {
            ...deltakelseDNMock,
            deltaker: {
                ...deltakelseDNMock.deltaker,
                deltakerIdent,
            },
            fraOgMed: startdato,
        };
        await delay(250);
        return HttpResponse.json(response);
    }),

    http.put<any, any>('**/veileder/register/deltakelse/:deltakelseId/endre/startdato', async ({ request }) => {
        const { dato } = await request.json();
        await delay(250);
        const data = getDeltakelser(registrertDeltakerId)[0];
        if (1 + 1 === 3) {
            return new HttpResponse(null, { status: 500 });
        }
        return HttpResponse.json({ ...data, fraOgMed: dato });
    }),

    http.put<any, any>('**/veileder/register/deltakelse/:deltakelseId/endre/sluttdato', async ({ request }) => {
        const { dato } = await request.json();
        await delay(250);
        const data = getDeltakelser(registrertDeltakerId)[0];
        return HttpResponse.json({ ...data, fraOgMed: dato });
    }),
];
