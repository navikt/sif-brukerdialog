import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import useSøknadInitialData from '../api/useSøknadInitialData';
import ResetMellomagringButton from '../components/reset-mellomlagring-button/ResetMellomlagringButton';
import { RequestStatus } from '../types/RequestStatus';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';
import { AppText, useAppIntl } from '../i18n';

const Søknad = () => {
    const initialData = useSøknadInitialData();
    const { text } = useAppIntl();
    const { status } = initialData;

    /** Loading */
    if (status === RequestStatus.loading || status === RequestStatus.redirectingToLogin) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }
    /** Error */
    if (status === 'error') {
        return (
            <ErrorPage
                pageTitle={text('initialLoadError.pageTitle')}
                contentRenderer={() => (
                    <>
                        <p>
                            <AppText id="initialLoadError.text.1" />
                        </p>
                        <p>
                            <AppText id="resetMellomlagring.text.1" />
                        </p>
                        <ResetMellomagringButton label={text('resetMellomlagring.startPåNytt')} />
                    </>
                )}
            />
        );
    }

    /** Success */
    const { data } = initialData;

    console.log(data);

    return (
        <SøknadContextProvider initialData={data}>
            <StepFormValuesContextProvider>
                <SøknadRouter />
            </StepFormValuesContextProvider>
        </SøknadContextProvider>
    );
};

export default Søknad;
