import { ApiError, ApiErrorType, createApiError, handleApiError } from '@navikt/ung-common';
import { OppslagService } from '@navikt/ung-deltakelse-opplyser-api';
import { registrertDeltakerSchema } from '@navikt/ung-common/src/types';
import axios from 'axios';

export const getDeltakerById = async (deltakerId: string) => {
    try {
        const { data } = await OppslagService.hentDeltakerInfoGittDeltakerId({
            path: { id: deltakerId },
        });
        return registrertDeltakerSchema.parse(data);
    } catch (e) {
        throw interpretGetDeltakerError(e);
    }
};

const interpretGetDeltakerError = (error: unknown): ApiError | undefined => {
    const context = 'getDeltakerById';
    return handleApiError(error, context, () => {
        if (!axios.isAxiosError(error)) {
            return;
        }
        if (error.response?.status === 404) {
            return createApiError(ApiErrorType.NetworkError, context, 'Deltaker ikke funnet', error);
        }
    });
};
