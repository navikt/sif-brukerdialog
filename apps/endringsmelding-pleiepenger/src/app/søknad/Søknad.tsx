import { Alert } from '@navikt/ds-react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import { RequestStatus } from '@types';
import { appSentryLogger } from '@utils';
import { isAxiosError } from 'axios';
import DevFooter from '../dev/DevFooter';
import useSøknadInitialData from '../hooks/useSøknadInitialData';
import IngenTilgangPage from '../pages/ingen-tilgang/IngenTilgangPage';
import { SøknadRoutes } from './config/SøknadRoutes';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';
import { FormLayout } from '@navikt/sif-common-ui';

const Søknad = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const initialData = useSøknadInitialData();
    const { status } = initialData;

    if (status === RequestStatus.loading || status === RequestStatus.redirectingToLogin) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    if (status === RequestStatus.forbidden) {
        appSentryLogger.logError('Søknad.requestStatus', RequestStatus.forbidden);
        return (
            <ErrorPage
                pageTitle="Ingen tilgang"
                contentRenderer={() => <Alert variant="error">Du har ikke tilgang til denne siden.</Alert>}
            />
        );
    }

    if (status === RequestStatus.error) {
        if (isAxiosError(initialData.error)) {
            appSentryLogger.logApiError(initialData.error);
        } else {
            appSentryLogger.logError('Søknad.requestStatus', initialData.error);
        }
        return (
            <ErrorPage
                pageTitle="Det oppstod en feil"
                contentRenderer={() => (
                    <FormLayout.Guide mood="uncertain">
                        Det oppstod en feil under henting av informasjon. Vennligst prøv igjen litt senere.
                    </FormLayout.Guide>
                )}
            />
        );
    }

    const { kanBrukeSøknad } = initialData;

    if (kanBrukeSøknad === false) {
        if (location.pathname === SøknadRoutes.IKKE_TILGANG) {
            return (
                <IngenTilgangPage
                    årsak={initialData.årsak}
                    søker={initialData.søker}
                    ingenTilgangMeta={initialData.ingenTilgangMeta}
                />
            );
        }
        setTimeout(() => {
            navigate(SøknadRoutes.IKKE_TILGANG);
        });
        return null;
    }
    return (
        <SøknadContextProvider initialData={initialData.data}>
            <StepFormValuesContextProvider>
                <SøknadRouter />
                {getMaybeEnv('VELG_SCENARIO') === 'on' && <DevFooter />}
            </StepFormValuesContextProvider>
        </SøknadContextProvider>
    );
};
export default Søknad;
