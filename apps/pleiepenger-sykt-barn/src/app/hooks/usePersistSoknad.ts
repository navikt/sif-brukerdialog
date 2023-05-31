import { ApiError, useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import apiUtils from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { AxiosError } from 'axios';
import { useFormikContext } from 'formik';
import { persist } from '../api/api';
import { useSøknadsdataContext } from '../søknad/SøknadsdataContext';
import { ImportertSøknadMetadata } from '../types/ImportertSøknad';
import { SøknadFormValues } from '../types/SøknadFormValues';
import { navigateToErrorPage, relocateToLoginPage } from '../utils/navigationUtils';
import { useNavigate } from 'react-router-dom';
import { StepID } from '../types/StepID';

interface PersistSoknadProps {
    stepID?: StepID;
    formValues?: SøknadFormValues;
    importertSøknadMetadata?: ImportertSøknadMetadata;
}

/**
 * Oppdaterer mellomlagring med innsendte verdier eller verdier som hentes ut fra context
 */

function usePersistSoknad() {
    const { logUserLoggedOut, logApiError } = useAmplitudeInstance();
    const { values: stateFormValues } = useFormikContext<SøknadFormValues>();
    const { importertSøknadMetadata: stateImportertSøknadMetadata } = useSøknadsdataContext();
    const navigate = useNavigate();

    async function doPersist({ stepID, formValues, importertSøknadMetadata }: PersistSoknadProps) {
        return persist({
            formValues: formValues || stateFormValues,
            lastStepID: stepID,
            importertSøknadMetadata: importertSøknadMetadata || stateImportertSøknadMetadata,
        }).catch((error: AxiosError) => {
            if (apiUtils.isUnauthorized(error)) {
                logUserLoggedOut('Lagre mellomlagring');
                relocateToLoginPage();
            } else {
                logApiError(ApiError.mellomlagring, { stepID });
                return navigateToErrorPage(navigate);
            }
        });
    }

    const persistSoknad = async ({ stepID, formValues, importertSøknadMetadata }: PersistSoknadProps) => {
        return doPersist({ stepID, formValues, importertSøknadMetadata });
    };

    return { persistSoknad };
}

export default usePersistSoknad;
