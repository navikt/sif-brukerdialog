import { useNavigate } from 'react-router-dom';
import { ApiError, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { AxiosError } from 'axios';
import { useFormikContext } from 'formik';
import { persist } from '../api/api';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { navigateToErrorPage, relocateToLoginPage } from '../utils/navigationUtils';

interface PersistSoknadProps {
    stepID?: StepID;
    formValues?: SøknadFormValues;
}

/**
 * Oppdaterer mellomlagring med innsendte verdier eller verdier som hentes ut fra context
 */

function usePersistSoknad() {
    const { logUserLoggedOut, logApiError } = useAmplitudeInstance();
    const { values: stateFormValues } = useFormikContext<SøknadFormValues>();

    const navigate = useNavigate();

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
                return navigateToErrorPage(navigate);
            }
        });
    }

    const persistSoknad = async ({ stepID, formValues }: PersistSoknadProps) => {
        return doPersist({ stepID, formValues });
    };

    return { persistSoknad };
}

export default usePersistSoknad;
