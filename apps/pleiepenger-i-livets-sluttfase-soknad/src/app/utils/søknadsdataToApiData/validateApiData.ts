import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { StepId } from '../../types/StepId';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';

export enum API_DATA_VALIDATION_ERROR {
    'undefined' = 'undefined',
    'omsorgsavtaleMangler' = 'omsorgsavtaleMangler',
}

export const validateApiDataMessages = {
    nb: {
        'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
        'apiDataValidation.omsorgsavtaleMangler': 'Det mangler avtale om delt bosted. ',
    },
};

interface ApiDataValidationError {
    error: API_DATA_VALIDATION_ERROR;
    step?: StepId;
    message: React.ReactNode;
}

/** Ikke tatt i bruk enda */
export const validateApiData = (
    apiData: SøknadApiData | undefined,
    intl: IntlShape,
): undefined | ApiDataValidationError => {
    if (!apiData) {
        return {
            error: API_DATA_VALIDATION_ERROR.undefined,
            message: intlHelper(intl, 'apiDataValidation.undefined'),
        };
    }
    // TODO
    return undefined;
};
