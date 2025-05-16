import { StepId } from '../../types/StepId';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { AppIntlShape } from '../../i18n';

export enum API_DATA_VALIDATION_ERROR {
    'undefined' = 'undefined',
}

interface ApiDataValidationError {
    error: API_DATA_VALIDATION_ERROR;
    step?: StepId;
    message: React.ReactNode;
}

/** Ikke tatt i bruk enda */
export const validateApiData = (
    apiData: SøknadApiData | undefined,
    _søknadsdata: Søknadsdata,
    { text }: AppIntlShape,
): undefined | ApiDataValidationError => {
    if (!apiData) {
        return {
            error: API_DATA_VALIDATION_ERROR.undefined,
            message: text('apiDataValidation.undefined'),
        };
    }

    return undefined;
};
