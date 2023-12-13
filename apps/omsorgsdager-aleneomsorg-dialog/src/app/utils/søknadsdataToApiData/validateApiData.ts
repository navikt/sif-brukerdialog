import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { IntlShape } from 'react-intl';
import { StepId } from '../../types/StepId';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';

export enum API_DATA_VALIDATION_ERROR {
    'undefined' = 'undefined',
}

export const validateApiDataMessages: MessageFileFormat = {
    nb: {
        'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
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
    _søknadsdata: Søknadsdata,
    intl: IntlShape,
): undefined | ApiDataValidationError => {
    if (!apiData) {
        return {
            error: API_DATA_VALIDATION_ERROR.undefined,
            message: intlHelper(intl, 'apiDataValidation.undefined'),
        };
    }

    return undefined;
};
