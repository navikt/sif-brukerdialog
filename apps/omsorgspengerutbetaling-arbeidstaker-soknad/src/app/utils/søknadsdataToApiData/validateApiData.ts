import { AppIntlShape } from '../../i18n';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { StepId } from '../../types/StepId';

export enum API_DATA_VALIDATION_ERROR {
    'undefined' = 'undefined',
    'omsorgsavtaleMangler' = 'omsorgsavtaleMangler',
}

interface ApiDataValidationError {
    error: API_DATA_VALIDATION_ERROR;
    step?: StepId;
    message: React.ReactNode;
}

/** Ikke tatt i bruk enda */
export const validateApiData = (
    apiData: SøknadApiData | undefined,
    { text }: AppIntlShape,
): undefined | ApiDataValidationError => {
    if (!apiData) {
        return {
            error: API_DATA_VALIDATION_ERROR.undefined,
            message: text('apiDataValidation.undefined'),
        };
    }
    // TODO
    return undefined;
};
