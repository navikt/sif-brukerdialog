/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mockDataDir = join(__dirname, 'mock/data');
const dokumenterDir = join(__dirname, 'mock/dokumenter');

const readJson = (path) => JSON.parse(readFileSync(path, 'utf-8'));

const scenario = process.env.MOCK_SCENARIO || 'to-saker';

const getMockData = (scenario) => {
    switch (scenario) {
        case 'ingen-sak':
            return {
                søker: readJson(join(mockDataDir, 'ingen-sak/soker.json')),
                soknader: readJson(join(mockDataDir, 'ingen-sak/soknader.json')),
                sakerMetadata: readJson(join(mockDataDir, 'ingen-sak/saker-metadata.json')),
                saker: [],
            };
        case 'sak-error':
            return {
                søker: readJson(join(mockDataDir, 'ingen-sak/soker.json')),
                soknader: [],
                sakerMetadata: readJson(join(mockDataDir, 'to-saker/saker-metadata.json')),
                saker: [],
            };
        case 'debug':
            return {
                søker: readJson(join(mockDataDir, 'debug/soker.json')),
                soknader: readJson(join(mockDataDir, 'debug/soknader.json')),
                sakerMetadata: readJson(join(mockDataDir, 'debug/saker-metadata.json')),
                saker: [
                    {
                        sak: readJson(join(mockDataDir, 'debug/sak.json')),
                        inntektsmeldinger: readJson(join(mockDataDir, 'debug/inntektsmeldinger.json')),
                    },
                ],
            };
        case 'en-sak':
            return {
                søker: readJson(join(mockDataDir, 'en-sak/soker.json')),
                soknader: readJson(join(mockDataDir, 'en-sak/soknader.json')),
                sakerMetadata: readJson(join(mockDataDir, 'en-sak/saker-metadata.json')),
                saker: [
                    {
                        sak: readJson(join(mockDataDir, 'en-sak/sak.json')),
                        inntektsmeldinger: readJson(join(mockDataDir, 'en-sak/inntektsmeldinger.json')),
                    },
                ],
            };
        case 'sak-uten-behandling':
            return {
                søker: readJson(join(mockDataDir, 'sak-uten-behandling/soker.json')),
                soknader: readJson(join(mockDataDir, 'sak-uten-behandling/soknader.json')),
                sakerMetadata: readJson(join(mockDataDir, 'sak-uten-behandling/saker-metadata.json')),
                saker: [
                    {
                        sak: readJson(join(mockDataDir, 'sak-uten-behandling/sak.json')),
                        inntektsmeldinger: readJson(join(mockDataDir, 'sak-uten-behandling/inntektsmeldinger.json')),
                    },
                ],
            };
        case 'to-saker':
            return {
                søker: readJson(join(mockDataDir, 'to-saker/soker.json')),
                soknader: readJson(join(mockDataDir, 'to-saker/soknader.json')),
                sakerMetadata: readJson(join(mockDataDir, 'to-saker/saker-metadata.json')),
                saker: [
                    {
                        sak: readJson(join(mockDataDir, 'to-saker/1001F8G/sak.json')),
                        inntektsmeldinger: readJson(join(mockDataDir, 'to-saker/1001F8G/inntektsmeldinger.json')),
                    },
                    {
                        sak: readJson(join(mockDataDir, 'to-saker/100097Y/sak.json')),
                        inntektsmeldinger: readJson(join(mockDataDir, 'to-saker/100097Y/inntektsmeldinger.json')),
                    },
                ],
            };
        case 'ingen-sak-eller-soknad':
        default:
            return {
                søker: readJson(join(mockDataDir, 'soker.json')),
                soknader: [],
                sakerMetadata: [],
                saker: [],
            };
    }
};

const mockData = getMockData(scenario);
const saksbehandlingstid = readJson(join(mockDataDir, 'saksbehandlingstid.json'));

const handlers = [
    // Søker
    http.get('*/oppslag/soker', () => HttpResponse.json(mockData.søker)),
    http.get('*/oppslag/soker-ikke-tilgang', () => new HttpResponse(null, { status: 451 })),

    // Søknader
    http.get('*/soknad', () => HttpResponse.json(mockData.soknader)),
    http.get('*/soknad/:soknadId/dokument', () => {
        const pdfBuffer = readFileSync(join(dokumenterDir, 'søknad.pdf'));
        return new HttpResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="søknad.pdf"',
            },
        });
    }),
    http.get('*/soknad/:soknadId/arbeidsgivermelding', () => {
        const pdfBuffer = readFileSync(join(dokumenterDir, 'arbeidsgivermelding.pdf'));
        return new HttpResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="arbeidsgivermelding.pdf"',
            },
        });
    }),

    // Saker
    http.get('*/saker/metadata', () => HttpResponse.json(mockData.sakerMetadata)),
    http.get('*/saker/saksbehandlingstid', () => HttpResponse.json(saksbehandlingstid)),
    http.get('*/sak/:saksnr', ({ params }) => {
        const sakData = mockData.saker.find((s) => s.sak.saksnummer === params.saksnr);
        return sakData ? HttpResponse.json(sakData.sak) : new HttpResponse(null, { status: 404 });
    }),
    http.get('*/sak/:saksnr/inntektsmeldinger', ({ params }) => {
        const sakData = mockData.saker.find((s) => s.sak.saksnummer === params.saksnr);
        return sakData ? HttpResponse.json(sakData.inntektsmeldinger) : new HttpResponse(null, { status: 404 });
    }),

    // Dokumenter
    http.get('*/dokument/:journalpostId/:dokumentInfoId/:variantFormat', ({ params }) => {
        let filename = 'søknad.pdf';
        switch (params.dokumentInfoId) {
            case '454412718':
                filename = 'ettersendelse.pdf';
                break;
            case '454412719':
                filename = 'vedlegg.pdf';
                break;
            case '454427849':
                filename = 'arbeidsgivermelding.pdf';
                break;
        }
        const pdfBuffer = readFileSync(join(dokumenterDir, filename));
        return new HttpResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    }),
];

const server = setupServer(...handlers);
server.listen({ onUnhandledRequest: 'bypass' });

// eslint-disable-next-line no-console
console.log(`[MSW] Mock server started with scenario: ${scenario}`);
