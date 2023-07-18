import { AxiosResponse } from 'axios';
import { ArbeidsgiverResponse } from '../../types/Arbeidsgiver';
import api, { ApiEndpoint } from '../api';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import appSentryLogger from '../../utils/appSentryLogger';
import { relocateToLoginPage } from '../../utils/navigationUtils';

export const getArbeidsgiver = (fom: string, tom: string): Promise<AxiosResponse<ArbeidsgiverResponse>> => {
    try {
        return api.get<ArbeidsgiverResponse>(ApiEndpoint.arbeidsgiver, `fra_og_med=${fom}&til_og_med=${tom}`);
    } catch (error) {
        return Promise.reject(`Invalid arbeidsgiver data`);
    }
};

export const getArbeidsgivere = async (
    fromDate: Date,
    toDate: Date,
): Promise<AxiosResponse<ArbeidsgiverResponse> | null> => {
    try {
        const response: AxiosResponse<ArbeidsgiverResponse> = await getArbeidsgiver(
            dateToISODate(fromDate),
            dateToISODate(toDate),
        );
        return response;
    } catch (error) {
        if (isForbidden(error) || isUnauthorized(error)) {
            relocateToLoginPage();
        } else {
            appSentryLogger.logApiError(error);
        }
        return null;
    }
};
