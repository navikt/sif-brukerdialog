// This file is auto-generated by @hey-api/openapi-ts

import type { Options as ClientOptions, TDataShape, Client } from './client';
import type { MarkerDeltakelseSomSøktData, MarkerDeltakelseSomSøktResponses, MarkerDeltakelseSomSøktErrors, HentKontonummerData, HentKontonummerResponses, HentKontonummerErrors, HentDeltakersOppgaveData, HentDeltakersOppgaveResponses, HentDeltakersOppgaveErrors, MarkerOppgaveSomLøstData, MarkerOppgaveSomLøstResponses, MarkerOppgaveSomLøstErrors, MarkerOppgaveSomLukketData, MarkerOppgaveSomLukketResponses, MarkerOppgaveSomLukketErrors, MarkerOppgaveSomÅpnetData, MarkerOppgaveSomÅpnetResponses, MarkerOppgaveSomÅpnetErrors, HentAlleMineDeltakelserData, HentAlleMineDeltakelserResponses, HentAlleMineDeltakelserErrors } from './types.gen';
import { zMarkerDeltakelseSomSøktData, zMarkerDeltakelseSomSøktResponse, zHentKontonummerData, zHentKontonummerResponse, zHentDeltakersOppgaveData, zHentDeltakersOppgaveResponse, zMarkerOppgaveSomLøstData, zMarkerOppgaveSomLøstResponse, zMarkerOppgaveSomLukketData, zMarkerOppgaveSomLukketResponse, zMarkerOppgaveSomÅpnetData, zMarkerOppgaveSomÅpnetResponse, zHentAlleMineDeltakelserData, zHentAlleMineDeltakelserResponse } from './zod.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

export class Deltakelse {
    /**
     * Markerer at deltakelsen er søkt om
     */
    public static markerDeltakelseSomSøkt<ThrowOnError extends boolean = true>(options: Options<MarkerDeltakelseSomSøktData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).put<MarkerDeltakelseSomSøktResponses, MarkerDeltakelseSomSøktErrors, ThrowOnError>({
            requestValidator: async (data) => {
                return await zMarkerDeltakelseSomSøktData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zMarkerDeltakelseSomSøktResponse.parseAsync(data);
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
            url: '/deltakelse/register/{id}/marker-har-sokt',
            ...options
        });
    }
    
    /**
     * Henter en oppgave for en gitt deltakelse
     */
    public static hentDeltakersOppgave<ThrowOnError extends boolean = true>(options: Options<HentDeltakersOppgaveData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).get<HentDeltakersOppgaveResponses, HentDeltakersOppgaveErrors, ThrowOnError>({
            requestValidator: async (data) => {
                return await zHentDeltakersOppgaveData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zHentDeltakersOppgaveResponse.parseAsync(data);
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
            url: '/deltakelse/register/oppgave/{oppgaveReferanse}',
            ...options
        });
    }
    
    /**
     * Markerer en oppgave som åpnet
     */
    public static markerOppgaveSomLøst<ThrowOnError extends boolean = true>(options: Options<MarkerOppgaveSomLøstData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).get<MarkerOppgaveSomLøstResponses, MarkerOppgaveSomLøstErrors, ThrowOnError>({
            requestValidator: async (data) => {
                return await zMarkerOppgaveSomLøstData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zMarkerOppgaveSomLøstResponse.parseAsync(data);
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
            url: '/deltakelse/register/oppgave/{oppgaveReferanse}/løst',
            ...options
        });
    }
    
    /**
     * Markerer en oppgave som lukket
     */
    public static markerOppgaveSomLukket<ThrowOnError extends boolean = true>(options: Options<MarkerOppgaveSomLukketData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).get<MarkerOppgaveSomLukketResponses, MarkerOppgaveSomLukketErrors, ThrowOnError>({
            requestValidator: async (data) => {
                return await zMarkerOppgaveSomLukketData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zMarkerOppgaveSomLukketResponse.parseAsync(data);
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
            url: '/deltakelse/register/oppgave/{oppgaveReferanse}/lukk',
            ...options
        });
    }
    
    /**
     * Markerer en oppgave som åpnet
     */
    public static markerOppgaveSomÅpnet<ThrowOnError extends boolean = true>(options: Options<MarkerOppgaveSomÅpnetData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).get<MarkerOppgaveSomÅpnetResponses, MarkerOppgaveSomÅpnetErrors, ThrowOnError>({
            requestValidator: async (data) => {
                return await zMarkerOppgaveSomÅpnetData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zMarkerOppgaveSomÅpnetResponse.parseAsync(data);
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
            url: '/deltakelse/register/oppgave/{oppgaveReferanse}/apnet',
            ...options
        });
    }
    
    /**
     * Henter alle deltakelser for en deltaker i ungdomsprogrammet
     */
    public static hentAlleMineDeltakelser<ThrowOnError extends boolean = true>(options?: Options<HentAlleMineDeltakelserData, ThrowOnError>) {
        return (options?.client ?? _heyApiClient).get<HentAlleMineDeltakelserResponses, HentAlleMineDeltakelserErrors, ThrowOnError>({
            requestValidator: async (data) => {
                return await zHentAlleMineDeltakelserData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zHentAlleMineDeltakelserResponse.parseAsync(data);
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
            url: '/deltakelse/register/hent/alle',
            ...options
        });
    }
}

export class Deltaker {
    /**
     * Henter kontonummer for en deltaker i ungdomsprogrammet
     */
    public static hentKontonummer<ThrowOnError extends boolean = true>(options?: Options<HentKontonummerData, ThrowOnError>) {
        return (options?.client ?? _heyApiClient).get<HentKontonummerResponses, HentKontonummerErrors, ThrowOnError>({
            requestValidator: async (data) => {
                return await zHentKontonummerData.parseAsync(data);
            },
            responseType: 'json',
            responseValidator: async (data) => {
                return await zHentKontonummerResponse.parseAsync(data);
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
            url: '/deltaker/hent-kontonummer',
            ...options
        });
    }
}