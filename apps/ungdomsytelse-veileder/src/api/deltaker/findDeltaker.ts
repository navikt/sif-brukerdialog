import { OppslagService } from '@navikt/ung-deltakelse-opplyser-api';
import axios from 'axios';
import {
    Deltaker,
    registrertDeltakerSchema,
    UregistrertDeltaker,
    uregistrertDeltakerSchema,
} from '@navikt/ung-common/src/types';
import { ApiError, ApiErrorType, createApiError, handleApiError } from '@navikt/ung-common';

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

const interpretFindDeltakerError = (error: unknown): ApiError | undefined => {
    const context = 'findDeltakerByIdent';
    return handleApiError(error, context, () => {
        if (!axios.isAxiosError(error)) {
            return;
        }
        if (error.response?.status === 403) {
            return createApiError(
                ApiErrorType.NetworkError,
                context,
                'Person kan ikke meldes inn i programmet på grunn av skjermingsregler.',
                error,
            );
        }
        if (error.response?.status === 404) {
            return createApiError(ApiErrorType.NetworkError, context, 'Person ikke funnet med oppgitt ident.', error);
        }
    });
};
