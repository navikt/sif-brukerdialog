import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { IntlShape } from 'react-intl';
import { includeDeltBostedStep } from '../../søknad/søknadStepConfig';
import { StepId } from '../../types/StepId';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';

export enum API_DATA_VALIDATION_ERROR {
    'undefined' = 'undefined',
    'omsorgsavtaleMangler' = 'omsorgsavtaleMangler',
}

export const validateApiDataMessages: MessageFileFormat = {
    nb: {
        'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
        'apiDataValidation.omsorgsavtaleMangler': 'Det mangler avtale om delt fast bosted. ',
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
    søknadsdata: Søknadsdata,
    intl: IntlShape,
): undefined | ApiDataValidationError => {
    if (!apiData) {
        return {
            error: API_DATA_VALIDATION_ERROR.undefined,
            message: intlHelper(intl, 'apiDataValidation.undefined'),
        };
    }
    if (includeDeltBostedStep(søknadsdata.omBarnet) && (apiData.samværsavtale || []).length === 0) {
        return {
            error: API_DATA_VALIDATION_ERROR.omsorgsavtaleMangler,
            message: intlHelper(intl, 'apiDataValidation.omsorgsavtaleMangler'),
            step: StepId.DELT_BOSTED,
        };
    }
    return undefined;
};
