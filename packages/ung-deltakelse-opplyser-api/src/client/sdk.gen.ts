// This file is auto-generated by @hey-api/openapi-ts

import type { Options as ClientOptions, TDataShape, Client } from '@hey-api/client-axios';
import type {
    OppdaterFraProgramData,
    OppdaterFraProgramResponse,
    OppdaterFraProgramError,
    EndreStartdatoData,
    EndreStartdatoResponse,
    EndreStartdatoError,
    EndreSluttdatoData,
    EndreSluttdatoResponse,
    EndreSluttdatoError,
    MeldUtDeltakerData,
    MeldUtDeltakerResponse,
    MeldUtDeltakerError,
    MarkerDeltakelseSomSøktData,
    MarkerDeltakelseSomSøktResponse,
    MarkerDeltakelseSomSøktError,
    LeggTilIProgramData,
    LeggTilIProgramResponse,
    LeggTilIProgramError,
    MeldInnDeltakerData,
    MeldInnDeltakerResponse,
    MeldInnDeltakerError,
    HentAlleDeltakelserGittDeltakerAktørData,
    HentAlleDeltakelserGittDeltakerAktørResponse,
    HentAlleDeltakelserGittDeltakerAktørError,
    HentDeltakerInfoGittDeltakerData,
    HentDeltakerInfoGittDeltakerResponse,
    HentDeltakerInfoGittDeltakerError,
    HentAlleDeltakelserGittDeltakerIdData,
    HentAlleDeltakelserGittDeltakerIdResponse,
    HentAlleDeltakelserGittDeltakerIdError,
    HentDeltakerInfoGittDeltakerIdData,
    HentDeltakerInfoGittDeltakerIdResponse,
    HentDeltakerInfoGittDeltakerIdError,
    HentAlleMineDeltakelserData,
    HentAlleMineDeltakelserResponse,
    HentAlleMineDeltakelserError,
    FjernFraProgramData,
    FjernFraProgramResponse,
    FjernFraProgramError,
} from './types.gen';
import {
    zOppdaterFraProgramResponse,
    zEndreStartdatoResponse,
    zEndreSluttdatoResponse,
    zMeldUtDeltakerResponse,
    zMarkerDeltakelseSomSøktResponse,
    zLeggTilIProgramResponse,
    zMeldInnDeltakerResponse,
    zHentAlleDeltakelserGittDeltakerAktørResponse,
    zHentDeltakerInfoGittDeltakerResponse,
    zHentAlleDeltakelserGittDeltakerIdResponse,
    zHentDeltakerInfoGittDeltakerIdResponse,
    zHentAlleMineDeltakelserResponse,
    zFjernFraProgramResponse,
} from './zod.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<
    TData,
    ThrowOnError
> & {
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

export class VeilederService {
    /**
     * @deprecated
     * Oppdater opplysninger for en eksisterende deltakelse i ungdomsprogrammet
     */
    public static oppdaterFraProgram<ThrowOnError extends boolean = false>(
        options: Options<OppdaterFraProgramData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).put<OppdaterFraProgramResponse, OppdaterFraProgramError, ThrowOnError>(
            {
                security: [
                    {
                        scheme: 'bearer',
                        type: 'http',
                    },
                ],
                responseValidator: async (data) => {
                    return await zOppdaterFraProgramResponse.parseAsync(data);
                },
                url: '/veileder/register/deltakelse/{deltakelseId}/oppdater',
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
            },
        );
    }

    /**
     * Endrer startdato på en deltakelse i ungdomsprogrammet
     */
    public static endreStartdato<ThrowOnError extends boolean = false>(
        options: Options<EndreStartdatoData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).put<EndreStartdatoResponse, EndreStartdatoError, ThrowOnError>({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zEndreStartdatoResponse.parseAsync(data);
            },
            url: '/veileder/register/deltakelse/{deltakelseId}/endre/startdato',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
    }

    /**
     * Endrer startdato på en deltakelse i ungdomsprogrammet
     */
    public static endreSluttdato<ThrowOnError extends boolean = false>(
        options: Options<EndreSluttdatoData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).put<EndreSluttdatoResponse, EndreSluttdatoError, ThrowOnError>({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zEndreSluttdatoResponse.parseAsync(data);
            },
            url: '/veileder/register/deltakelse/{deltakelseId}/endre/sluttdato',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
    }

    /**
     * Avslutter en deltakelse i ungdomsprogrammet
     */
    public static meldUtDeltaker<ThrowOnError extends boolean = false>(
        options: Options<MeldUtDeltakerData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).put<MeldUtDeltakerResponse, MeldUtDeltakerError, ThrowOnError>({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zMeldUtDeltakerResponse.parseAsync(data);
            },
            url: '/veileder/register/deltakelse/{deltakelseId}/avslutt',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
    }

    /**
     * @deprecated
     * Legg til en ny deltakelse i ungdomsprogrammet
     */
    public static leggTilIProgram<ThrowOnError extends boolean = false>(
        options: Options<LeggTilIProgramData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).post<LeggTilIProgramResponse, LeggTilIProgramError, ThrowOnError>({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zLeggTilIProgramResponse.parseAsync(data);
            },
            url: '/veileder/register/legg-til',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
    }

    /**
     * Meld inn en deltaker i ungdomsprogrammet.
     */
    public static meldInnDeltaker<ThrowOnError extends boolean = false>(
        options: Options<MeldInnDeltakerData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).post<MeldInnDeltakerResponse, MeldInnDeltakerError, ThrowOnError>({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zMeldInnDeltakerResponse.parseAsync(data);
            },
            url: '/veileder/register/deltaker/innmelding',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
    }

    /**
     * Hent alle deltakelser for en deltaker i ungdomsprogrammet
     */
    public static hentAlleDeltakelserGittDeltakerId<ThrowOnError extends boolean = false>(
        options: Options<HentAlleDeltakelserGittDeltakerIdData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).get<
            HentAlleDeltakelserGittDeltakerIdResponse,
            HentAlleDeltakelserGittDeltakerIdError,
            ThrowOnError
        >({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zHentAlleDeltakelserGittDeltakerIdResponse.parseAsync(data);
            },
            url: '/veileder/register/deltaker/{deltakerId}/deltakelser',
            ...options,
        });
    }

    /**
     * Fjern en deltakelse fra ungdomsprogrammet
     */
    public static fjernFraProgram<ThrowOnError extends boolean = false>(
        options: Options<FjernFraProgramData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).delete<FjernFraProgramResponse, FjernFraProgramError, ThrowOnError>({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zFjernFraProgramResponse.parseAsync(data);
            },
            url: '/veileder/register/deltakelse/{deltakelseId}/fjern',
            ...options,
        });
    }
}

export class DeltakelseService {
    /**
     * Markerer at deltakelsen er søkt om
     */
    public static markerDeltakelseSomSøkt<ThrowOnError extends boolean = false>(
        options: Options<MarkerDeltakelseSomSøktData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).put<
            MarkerDeltakelseSomSøktResponse,
            MarkerDeltakelseSomSøktError,
            ThrowOnError
        >({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zMarkerDeltakelseSomSøktResponse.parseAsync(data);
            },
            url: '/deltakelse/register/{id}/marker-har-sokt',
            ...options,
        });
    }

    /**
     * Henter alle deltakelser for en deltaker i ungdomsprogrammet
     */
    public static hentAlleMineDeltakelser<ThrowOnError extends boolean = false>(
        options?: Options<HentAlleMineDeltakelserData, ThrowOnError>,
    ) {
        return (options?.client ?? _heyApiClient).get<
            HentAlleMineDeltakelserResponse,
            HentAlleMineDeltakelserError,
            ThrowOnError
        >({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zHentAlleMineDeltakelserResponse.parseAsync(data);
            },
            url: '/deltakelse/register/hent/alle',
            ...options,
        });
    }
}

export class LesRegisterDataService {
    /**
     * Hent alle deltakelser for en deltaker i ungdomsprogrammet
     */
    public static hentAlleDeltakelserGittDeltakerAktør<ThrowOnError extends boolean = false>(
        options: Options<HentAlleDeltakelserGittDeltakerAktørData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).post<
            HentAlleDeltakelserGittDeltakerAktørResponse,
            HentAlleDeltakelserGittDeltakerAktørError,
            ThrowOnError
        >({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zHentAlleDeltakelserGittDeltakerAktørResponse.parseAsync(data);
            },
            url: '/register/hent/alle',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
    }
}

export class OppslagService {
    /**
     * Hent personlia for en deltaker
     */
    public static hentDeltakerInfoGittDeltaker<ThrowOnError extends boolean = false>(
        options: Options<HentDeltakerInfoGittDeltakerData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).post<
            HentDeltakerInfoGittDeltakerResponse,
            HentDeltakerInfoGittDeltakerError,
            ThrowOnError
        >({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zHentDeltakerInfoGittDeltakerResponse.parseAsync(data);
            },
            url: '/oppslag/deltaker',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
    }

    /**
     * Hent personlia for en deltaker gitt en UUID
     */
    public static hentDeltakerInfoGittDeltakerId<ThrowOnError extends boolean = false>(
        options: Options<HentDeltakerInfoGittDeltakerIdData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).get<
            HentDeltakerInfoGittDeltakerIdResponse,
            HentDeltakerInfoGittDeltakerIdError,
            ThrowOnError
        >({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http',
                },
            ],
            responseValidator: async (data) => {
                return await zHentDeltakerInfoGittDeltakerIdResponse.parseAsync(data);
            },
            url: '/oppslag/deltaker/{id}',
            ...options,
        });
    }
}
