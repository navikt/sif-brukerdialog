import { http, HttpResponse } from 'msw';
import { søker1Mock } from '../mocks/soker1';

let mellomlagring: any = {};

export const handlers = [
    http.get('**/oppslag/soker', () => {
        return HttpResponse.json(søker1Mock.søker);
    }),
    http.get('**/oppslag/barn', () => {
        return HttpResponse.json(søker1Mock.barn);
    }),
    http.get('**/oppslag/arbeidsgiver', () => {
        return HttpResponse.json(søker1Mock.arbeidsgiver);
    }),
    http.post('**/opplaringspenger/innsending', () => {
        return HttpResponse.json({});
    }),
    http.post('**/vedlegg', () => {
        return HttpResponse.json({}).headers.set('location', 'abc');
    }),
    http.delete('**/vedlegg/*', () => {
        return HttpResponse.json({});
    }),
    http.get('**/mellomlagring/OPPLARINGSPENGER', () => {
        return HttpResponse.json(mellomlagring);
    }),
    http.post('**/mellomlagring/OPPLARINGSPENGER', ({ request }) => {
        console.log('Mellomlagring', request.body);
        mellomlagring = request.body;
        return HttpResponse.json();
    }),
    http.put('**/mellomlagring/OPPLARINGSPENGER', ({ request }) => {
        console.log('Mellomlagring', request.body);
        mellomlagring = request.body;
        return HttpResponse.json();
    }),
    http.delete('**/mellomlagring/OPPLARINGSPENGER', () => {
        mellomlagring = {};
        return HttpResponse.json();
    }),
];
