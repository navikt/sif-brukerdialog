import React from 'react';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/components/loading-spinner/LoadingSpinner';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import useSøknadInitialData from '../api/useSøknadInitialData';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';
import { Alert, BodyShort } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';

const Søknad = () => {
    const initialData = useSøknadInitialData();
    const { status } = initialData;

    /** Loading */
    if (status === 'loading') {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }
    /** Error */
    if (status === 'error') {
        return (
            <ErrorPage
                pageTitle="Det oppstod en feil"
                contentRenderer={() => (
                    <>
                        <Alert variant="error">
                            Det oppstod en feil da vi hentet nødvendig informasjon. Vennligst prøv å laste siden på
                            nytt.
                        </Alert>
                        <Block margin="l">
                            <BodyShort size="small">ErrorCode: ApiError</BodyShort>
                        </Block>
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
