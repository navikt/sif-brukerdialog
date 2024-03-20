import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { RequestStatus } from '../../types';
import sakerEndpoint from './sakerEndpoint';
import søkerEndpoint from './søkerEndpoint';

export const fetchSøkerOgSaker = async () => {
    try {
        const [søker, k9sakerResult] = await Promise.all([søkerEndpoint.fetch(), sakerEndpoint.fetch()]);
        return { søker, k9sakerResult };
    } catch (error) {
        if (isUnauthorized(error)) {
            return Promise.reject({
                status: RequestStatus.redirectingToLogin,
            });
        } else if (isForbidden(error)) {
            return Promise.reject({
                status: RequestStatus.forbidden,
            });
        } else {
            return Promise.reject({
                status: RequestStatus.error,
                error,
            });
        }
    }
};
