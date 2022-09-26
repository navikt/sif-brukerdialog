import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import { useSøknadContext } from './SøknadContext';
import { SøknadStepRoutes } from './SøknadStepRoutes';

const SøknadRoutes = () => {
    const { step, søker } = useSøknadContext();
    if (step) {
        // eslint-disable-next-line no-console
        console.log({ step });
    }
    return (
        <Switch>
            <Route path={SøknadStepRoutes.VELKOMMEN}>
                <Page title="velkommen">Hei {søker.etternavn} </Page>
            </Route>
        </Switch>
    );
};

export default SøknadRoutes;
