import { getInvalidParametersFromAxiosError } from '@navikt/sif-common-soknad-ds';
import { appLogger } from '@sif/apm';
import { AxiosError } from 'axios';

export const logDebugInnsendingParameterViolations = (error: AxiosError) => {
    const violations = getInvalidParametersFromAxiosError(error);
    if (violations.length === 0) {
        return;
    }

    appLogger.logHandledException('Innsending feilet - parameterfeil', {
        violations: violations.map(({ parameterName, reason }) => ({ parameterName, reason })),
    });
};
