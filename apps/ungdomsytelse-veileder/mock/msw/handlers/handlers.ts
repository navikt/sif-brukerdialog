import { delay, http, HttpResponse } from 'msw';
import {
    getDeltakelser,
    getDeltakerByDeltakerId,
    findDeltaker,
    deltakelseDNMock,
    veilederMock,
} from '../mocks/mockUtils';
import { DeltakelseOpplysningDto } from '@navikt/ung-deltakelse-opplyser-api';

export const handlers = [
    http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
    http.get('*login*', () => new HttpResponse(null, { status: 200 })),

    /** TODO - Bruker søker endepunkt enn så lenge for å hente mock veileder */
    http.get<any, any>('**/oppslag/soker', async () => {
        return HttpResponse.json(veilederMock);
    }),

    http.post<any, any>('**/oppslag/deltaker', async ({ request }) => {
        const formData = await request.json();
        const deltakerIdent = formData.deltakerIdent;
        const data = findDeltaker(deltakerIdent);
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
        const { dato, meldingFraVeileder, veilederRef } = await request.json();
        console.log({ dato, meldingFraVeileder, veilederRef });
        await delay(250);
        // const errors_409 = {
        //     type: '/problem-details/duplikat-uløst-oppgavetype',
        //     title: 'Det finnes allerede en oppgave av samme type som er uløst',
        //     status: 409,
        //     detail: 'Key (deltakelse_id, oppgavetype)=(a3bed73f-d5d7-4aac-9c3b-3134c8394dac, BEKREFT_ENDRET_STARTDATO) already exists.',
        //     instance:
        //         'https://ungdomsytelse-veileder.intern.dev.nav.no/veileder/register/deltakelse/a3bed73f-d5d7-4aac-9c3b-3134c8394dac/endre/startdato',
        // };
        return new HttpResponse(null, { status: 409 });
        // return HttpResponse.json({ status: 409, errors_409 });
    }),

    http.put<any, any>('**/veileder/register/deltakelse/:deltakelseId/endre/sluttdato', async ({ request }) => {
        const { dato, meldingFraVeileder, veilederRef } = await request.json();
        console.log({ dato, meldingFraVeileder, veilederRef });
        await delay(250);
        return HttpResponse.json({});
    }),
];
