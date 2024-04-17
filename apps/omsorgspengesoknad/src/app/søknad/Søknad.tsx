import { FormattedMessage, useIntl } from 'react-intl';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import useSøknadInitialData from '../api/useSøknadInitialData';
import ResetMellomagringButton from '../components/reset-mellomlagring-button/ResetMellomlagringButton';
import { RequestStatus } from '../types/RequestStatus';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';

const Søknad = () => {
    const initialData = useSøknadInitialData();
    const intl = useIntl();
    const { status } = initialData;

    /** Loading */
    if (status === RequestStatus.loading || status === RequestStatus.redirectingToLogin) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }
    /** Error */
    if (status === 'error') {
        return (
            <ErrorPage
                pageTitle={intlHelper(intl, 'initialLoadError.pageTitle')}
                contentRenderer={() => (
                    <>
                        <p>
                            <FormattedMessage id="initialLoadError.text.1" />
                        </p>
                        <p>
                            <FormattedMessage id="resetMellomlagring.text.1" />
                        </p>
                        <ResetMellomagringButton label={intlHelper(intl, 'resetMellomlagring.startPåNytt')} />
                    </>
                )}
            />
        );
    }

    /** Success */
    const { data } = initialData;

    return (
        <SøknadContextProvider initialData={data}>
            <StepFormValuesContextProvider>
                <SøknadRouter />
            </StepFormValuesContextProvider>
        </SøknadContextProvider>
    );
};

export default Søknad;
