import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import useSøknadInitialDataQuery from '../api/useSøknadInitialData';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';
import InitialDataErrorPage from '../pages/initial-data-error-page/InitialDataErrorPage';

const Søknad = () => {
    const initialDataQuery = useSøknadInitialDataQuery();

    /** Error */
    if (initialDataQuery.isError) {
        return <InitialDataErrorPage />;
    }

    /** Success */
    if (initialDataQuery.data) {
        return (
            <SøknadContextProvider initialData={initialDataQuery.data}>
                <StepFormValuesContextProvider>
                    <SøknadRouter />
                </StepFormValuesContextProvider>
            </SøknadContextProvider>
        );
    }

    // Fallback loading state
    return <LoadingSpinner size="3xlarge" style="block" />;
};

export default Søknad;
