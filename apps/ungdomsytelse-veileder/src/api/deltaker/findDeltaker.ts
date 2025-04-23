import { OppslagService } from '@navikt/ung-deltakelse-opplyser-api';
import axios from 'axios';
import {
    Deltaker,
    registrertDeltakerSchema,
    UregistrertDeltaker,
    uregistrertDeltakerSchema,
} from '@navikt/ung-common/src/types';
import { ApiError, ErrorObject, handleApiError } from '@navikt/ung-common';

const FinnDeltakerErrorType = 'finnDeltakerError';

export enum FinnDeltakerErrorCode {
    'DELTAKER_IKKE_FUNNET' = 'DELTAKER_IKKE_FUNNET',
    'DELTAKER_FORBIDDEN' = 'DELTAKER_FORBIDDEN',
}

export type FinnDeltakerError = ErrorObject<'finnDeltakerError', FinnDeltakerErrorCode>;

/**
 * Sjekker om en feil er av typen FinnDeltakerError.
 * @param error Feilen som skal sjekkes.
 * @returns True hvis feilen er en FinnDeltakerError, ellers false.
 */
export const isFinnDeltakerError = (error: unknown): error is FinnDeltakerError => {
    return typeof error === 'object' && error !== null && (error as FinnDeltakerError).type === FinnDeltakerErrorType;
};

/**
 * Henter informasjon om en deltaker basert på ident (fnr/dnr).
 *
 * @param ident Identifikatoren til deltakeren som skal hentes - f-nr eller d-nr
 * @returns Et validert deltakerobjekt (registrert eller uregistrert).
 * @throws Kaster en FinnDeltakerError eller ApiError hvis noe går galt.
 */
export const findDeltakerByIdent = async (ident: string): Promise<Deltaker | UregistrertDeltaker> => {
    try {
        const { data } = await OppslagService.hentDeltakerInfoGittDeltaker({ body: { deltakerIdent: ident } });
        return data?.id ? registrertDeltakerSchema.parse(data) : uregistrertDeltakerSchema.parse(data);
    } catch (e) {
        throw interpretFindDeltakerError(e);
    }
};

/**
 * Tolker og håndterer feil som oppstår under henting av deltakerinformasjon.
 *
 * @param error Feilen som skal tolkes.
 * @returns En spesifikk FinnDeltakerError hvis den er mappet opp
 */
const interpretFindDeltakerError = (error: unknown): FinnDeltakerError | ApiError => {
    return handleApiError<FinnDeltakerError>(error, 'findDeltakerByIdent', () => {
        if (!axios.isAxiosError(error)) {
            return;
        }
        if (error.response?.status === 403) {
            return {
                type: FinnDeltakerErrorType,
                code: FinnDeltakerErrorCode.DELTAKER_FORBIDDEN,
                message: 'Person kan ikke meldes inn i programmet på grunn av skjermingsregler.',
            };
        }
        if (error.response?.status === 404) {
            return {
                type: FinnDeltakerErrorType,
                code: FinnDeltakerErrorCode.DELTAKER_IKKE_FUNNET,
                message: 'Person ikke funnet med oppgitt ident.',
            };
        }
    });
};
