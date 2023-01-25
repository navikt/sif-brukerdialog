import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/components/loading-spinner/LoadingSpinner';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import useSøknadInitialData from '../api/useSøknadInitialData';
import ResetMellomagringButton from '../components/reset-mellomlagring-button/ResetMellomlagringButton';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';

const Søknad = () => {
    const initialData = useSøknadInitialData();
    const intl = useIntl();
    const { status } = initialData;

    /** Loading */
    if (status === 'loading') {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }
    /** Error */
    if (status === 'error' || 1 + 1 === 2) {
        return (
            <ErrorPage
                pageTitle={intlHelper(intl, 'initialLoadError.pageTitle')}
                contentRenderer={() => (
                    <>
                        <p>
                            <FormattedMessage id="initialLoadError.text.1" />
                        </p>
                        <p>
                            <FormattedMessage id="initialLoadError.text.2" />
                        </p>
                        <ResetMellomagringButton label={intlHelper(intl, 'initialLoadError.startPåNytt')} />
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
