import { AppIntlShape } from '../../i18n';
import { StepId } from '../../types/StepId';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';

export enum API_DATA_VALIDATION_ERROR {
    'undefined' = 'undefined',
    'omsorgsavtaleMangler' = 'omsorgsavtaleMangler',
}

const nb = {
    'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det mangler avtale om delt bosted. ',
};

const nn: Record<keyof typeof nb, string> = {
    'apiDataValidation.undefined': 'Det oppstod ein feil ved visninga av sida.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det manglar avtale om delt bustad.',
};
export const validateApiDataMessages = { nb, nn };

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
    return undefined;
};
