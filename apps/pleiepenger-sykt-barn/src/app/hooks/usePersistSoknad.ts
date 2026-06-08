import { ApiError, useAnalyticsInstance } from '@navikt/sif-common-analytics';
import apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { AxiosError } from 'axios';
import { useFormikContext } from 'formik';

import { persist } from '../api/api';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { StepID } from '../types/StepID';
import { relocateToLoginPage } from '../utils/navigationUtils';

interface PersistSoknadProps {
    stepID?: StepID;
    formValues?: SøknadFormValues;
}

/**
 * Oppdaterer mellomlagring med innsendte verdier eller verdier som hentes ut fra context
 */

function usePersistSoknad() {
    const { logUserLoggedOut, logApiError } = useAnalyticsInstance();
    const { values: stateFormValues } = useFormikContext<SøknadFormValues>();

    async function doPersist({ stepID, formValues }: PersistSoknadProps) {
        return persist({
            formValues: formValues || stateFormValues,
            lastStepID: stepID,
        }).catch((error: AxiosError) => {
            /** Logge for å se om vi kan redirecte til logg-inn i dette tilfellet
             * ref: https://stackoverflow.com/questions/52341222/detect-xhr-status-0-in-axios
             */
            if (typeof error.response === 'undefined') {
                logApiError(ApiError.mellomlagring, { stepID, txt: 'typeof error.response is undefined' });
            }
            if (apiUtils.isUnauthorized(error)) {
                logUserLoggedOut('Lagre mellomlagring');
                relocateToLoginPage();
            } else {
                logApiError(ApiError.mellomlagring, { stepID });
            }
        });
    }

    const persistSoknad = async ({ stepID, formValues }: PersistSoknadProps) => {
        return doPersist({ stepID, formValues });
    };

    return { persistSoknad };
}

export default usePersistSoknad;
