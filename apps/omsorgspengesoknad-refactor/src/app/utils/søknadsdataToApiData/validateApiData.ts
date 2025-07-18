import { includeDeltBostedStep } from '../../søknad/søknadStepConfig';
import { StepId } from '../../types/StepId';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { AppIntlShape } from '../../i18n';

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
    søknadsdata: Søknadsdata,
    { text }: AppIntlShape,
): undefined | ApiDataValidationError => {
    if (!apiData) {
        return {
            error: API_DATA_VALIDATION_ERROR.undefined,
            message: text('apiDataValidation.undefined'),
        };
    }
    if (includeDeltBostedStep(søknadsdata.omBarnet) && (apiData.samværsavtale || []).length === 0) {
        return {
            error: API_DATA_VALIDATION_ERROR.omsorgsavtaleMangler,
            message: text('apiDataValidation.omsorgsavtaleMangler'),
            step: StepId.DELT_BOSTED,
        };
    }
    return undefined;
};
