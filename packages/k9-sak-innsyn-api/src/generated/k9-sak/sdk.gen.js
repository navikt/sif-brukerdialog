import { zHentSisteGyldigeVedtakForAktorIdData, zHentSisteGyldigeVedtakForAktorIdResponse2, zHentOpplæringsinstitusjonerData, zHentOpplæringsinstitusjonerResponse, } from './zod.gen';
import { client as _heyApiClient } from './client.gen';
export class K9SakController {
    static hentSisteGyldigeVedtakForAktorId(options) {
        return (options.client ?? _heyApiClient).post({
            requestValidator: async (data) => {
                return await zHentSisteGyldigeVedtakForAktorIdData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zHentSisteGyldigeVedtakForAktorIdResponse2.parseAsync(data);
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            url: '/k9sak/omsorgsdager-kronisk-sykt-barn/har-gyldig-vedtak',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
    }
    static hentOpplæringsinstitusjoner(options) {
        return (options?.client ?? _heyApiClient).get({
            requestValidator: async (data) => {
                return await zHentOpplæringsinstitusjonerData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zHentOpplæringsinstitusjonerResponse.parseAsync(data);
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            url: '/k9sak/opplaringsinstitusjoner',
            ...options,
        });
    }
}
//# sourceMappingURL=sdk.gen.js.map