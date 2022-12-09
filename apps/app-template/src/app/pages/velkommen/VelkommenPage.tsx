import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SamtykkeForm from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import VelkommenGuide from './VelkommenGuide';
import OmSøknaden from './OmSøknaden';

const VelkommenPage = () => {
    const {
        state: { søker },
        dispatch,
    } = useSøknadContext();

    const navigateTo = useNavigate();

    const startSøknad = () => {
        dispatch(actionsCreator.startSøknad());
        navigateTo(SøknadRoutes.PLEIETRENGENDE);
    };
    return (
        <Page title="Velkommen">
            <Heading level="1" size="large">
                <VelkommenGuide søker={søker} />
                <OmSøknaden />
                <SamtykkeForm onValidSubmit={startSøknad} />
            </Heading>
        </Page>
    );
};

export default VelkommenPage;
