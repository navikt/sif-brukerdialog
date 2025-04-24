import { ApiError, ErrorObject, handleApiError } from '@navikt/ung-common';
import { VeilederService } from '@navikt/ung-deltakelse-opplyser-api';
import axios from 'axios';

enum SlettDeltakerErrorCode {
    DELTAKER_IKKE_FUNNET = 'DELTAKER_IKKE_FUNNET',
    DELTAKER_FORBIDDEN = 'DELTAKER_FORBIDDEN',
}

export type SlettDeltakerError = ErrorObject<'slettDeltakerError', SlettDeltakerErrorCode>;

export const isSlettDeltakerError = (error: unknown): error is SlettDeltakerError => {
    return typeof error === 'object' && error !== null && (error as SlettDeltakerError).type === 'slettDeltakerError';
};

/**
 * Sletter en deltakelse
 *
 * @param deltakelseId
 */

export const slettDeltakelse = async (deltakelseId: string) => {
    try {
        await VeilederService.fjernFraProgram({ path: { deltakelseId } });
    } catch (e) {
        throw interpretSlettDeltakerError(e);
    }
};

const interpretSlettDeltakerError = (error: unknown): SlettDeltakerError | ApiError => {
    return handleApiError<SlettDeltakerError>(error, 'slettDeltaker', () => {
        if (!axios.isAxiosError(error)) {
            return;
        }
        if (error.response?.status === 403) {
            return {
                type: 'slettDeltakerError',
                code: SlettDeltakerErrorCode.DELTAKER_FORBIDDEN,
                message: 'Deltakelse kan ikke slettes',
            };
        }
        if (error.response?.status === 404) {
            return {
                type: 'slettDeltakerError',
                code: SlettDeltakerErrorCode.DELTAKER_IKKE_FUNNET,
                message: 'Deltakelse ikke funnet',
            };
        }
    });
};
