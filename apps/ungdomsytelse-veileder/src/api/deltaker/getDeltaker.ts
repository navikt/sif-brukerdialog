import { ApiError, ErrorObject, handleApiError } from '@navikt/ung-common';
import { OppslagService } from '@navikt/ung-deltakelse-opplyser-api';
import { registrertDeltakerSchema } from '@navikt/ung-common/src/types';
import axios from 'axios';

const getDeltakerErrorType = 'getDeltakerError';

export enum GetDeltakerErrorCode {
    DELTAKER_IKKE_FUNNET = 'deltaker-ikke-funnet',
}

export type GetDeltakerError = ErrorObject<'getDeltakerError', GetDeltakerErrorCode>;

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

const interpretGetDeltakerError = (error: unknown): GetDeltakerError | ApiError => {
    return handleApiError<GetDeltakerError>(error, 'getDeltakerById', () => {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return {
                type: getDeltakerErrorType,
                code: GetDeltakerErrorCode.DELTAKER_IKKE_FUNNET,
                message: 'Deltaker ikke funnet',
            };
        }
    });
};
