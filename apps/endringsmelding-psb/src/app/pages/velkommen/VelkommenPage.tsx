import { Heading } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import SamtykkeForm from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { Sak } from '../../types/Sak';
import SakInfo from './SakInfo';

const VelkommenPage = () => {
    const {
        state: { søker, sak },
        dispatch,
    } = useSøknadContext();

    const startSøknad = (sak: Sak) => {
        dispatch(actionsCreator.startSøknad(sak));
        dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.AKTIVITET));
    };

    if (!sak) {
        return (
            <Page title="Velkommen">
                <SifGuidePanel>
                    <Heading level="1" size="large">
                        Velkommen {søker.fornavn}
                    </Heading>
                    <p>Vi kan ikke finne en aktiv sak på deg</p>
                </SifGuidePanel>
            </Page>
        );
    }

    return (
        <Page title="Velkommen">
            <SifGuidePanel>
                <Heading level="1" size="large">
                    Velkommen {søker.fornavn}
                </Heading>
                <p>
                    Du kan melde om endringer i arbeid opptil 3 måneder tilbake i tid, og ett år frem i tid. Vil du
                    melde fra om endringer utenfor denne tidsrammen, eller du har behov for å melde fra om andre
                    endringer, send inn en melding via Skriv til oss.
                </p>
                <FormBlock>
                    <SakInfo sak={sak} />
                </FormBlock>
            </SifGuidePanel>
            <SamtykkeForm onValidSubmit={() => startSøknad(sak)} />
        </Page>
    );
};

export default VelkommenPage;
