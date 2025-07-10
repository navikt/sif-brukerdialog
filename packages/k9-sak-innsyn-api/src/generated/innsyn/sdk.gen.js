import { zHentSøknaderData, zHentSøknaderResponse, zLastNedArbeidsgivermeldingData, zLastNedArbeidsgivermeldingResponse, zHentMineSakerData, zHentMineSakerResponse, zHentSaksbehandlingstidData, zHentSaksbehandlingstidResponse, zHentDokumentData, zHentDokumentResponse } from './zod.gen';
import { client as _heyApiClient } from './client.gen';
export class SØknadController {
    static hentSøknader(options) {
        return (options?.client ?? _heyApiClient).get({
            requestValidator: async (data) => {
                return await zHentSøknaderData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zHentSøknaderResponse.parseAsync(data);
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                },
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/soknad',
            ...options
        });
    }
    static lastNedArbeidsgivermelding(options) {
        return (options.client ?? _heyApiClient).get({
            requestValidator: async (data) => {
                return await zLastNedArbeidsgivermeldingData.parseAsync(data);
            },
            responseType: 'blob',
            responseValidator: async (data) => {
                return await zLastNedArbeidsgivermeldingResponse.parseAsync(data);
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                },
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/soknad/{søknadId}/arbeidsgivermelding',
            ...options
        });
    }
}
export class SakController {
    static hentMineSaker(options) {
        return (options?.client ?? _heyApiClient).get({
            requestValidator: async (data) => {
                return await zHentMineSakerData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zHentMineSakerResponse.parseAsync(data);
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                },
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/saker',
            ...options
        });
    }
    static hentSaksbehandlingstid(options) {
        return (options?.client ?? _heyApiClient).get({
            requestValidator: async (data) => {
                return await zHentSaksbehandlingstidData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zHentSaksbehandlingstidResponse.parseAsync(data);
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                },
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/saker/saksbehandlingstid',
            ...options
        });
    }
}
export class DokumentController {
    static hentDokument(options) {
        return (options.client ?? _heyApiClient).get({
            requestValidator: async (data) => {
                return await zHentDokumentData.parseAsync(data);
            },
            responseType: 'blob',
            responseValidator: async (data) => {
                return await zHentDokumentResponse.parseAsync(data);
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                },
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/dokument/{journalpostId}/{dokumentInfoId}/{variantFormat}',
            ...options
        });
    }
}
//# sourceMappingURL=sdk.gen.js.map