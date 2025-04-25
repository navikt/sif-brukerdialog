import { ApiError, ApiErrorType, createApiError, handleApiError } from '@navikt/ung-common';
import { VeilederService } from '@navikt/ung-deltakelse-opplyser-api';
import axios from 'axios';

/**
 * Sletter en deltakelse
 *
 * @param deltakelseId
 */

export const slettDeltakelse = async (deltakelseId: string) => {
    try {
        await VeilederService.fjernFraProgram({ path: { deltakelseId } });
    } catch (e) {
        throw interpretSlettDeltakelseError(e);
    }
};

const interpretSlettDeltakelseError = (error: unknown): ApiError | undefined => {
    const context = 'slettDeltakelse';
    return handleApiError(error, context, () => {
        if (!axios.isAxiosError(error)) {
            return;
        }
        if (error.response?.status === 403) {
            return createApiError(ApiErrorType.NetworkError, context, 'Deltakelse kan ikke slettes', error);
        }
        if (error.response?.status === 404) {
            return createApiError(ApiErrorType.NetworkError, context, 'Deltakelse ikke funnet', error);
        }
    });
};
