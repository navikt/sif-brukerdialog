import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GeneralErrorPage from './components/pages/general-error-page/GeneralErrorPage';
import IntroPage from './components/pages/intro-page/IntroPage';
import Application from './application/Application';
import { ApplicationType } from './types/ApplicationType';

const YtelseSwitch = () => (
    <Switch>
        <Route path={'/omsorgspenger'} render={() => <Application søknadstype={ApplicationType.omsorgspenger} />} />
        <Route
            path={'/ekstraomsorgsdager'}
            render={() => <Application søknadstype={ApplicationType.ekstraomsorgsdager} />}
        />
        <Route path={'/utbetaling'} render={() => <Application søknadstype={ApplicationType.utbetaling} />} />
        <Route
            path={'/utbetalingarbeidstaker'}
            render={() => <Application søknadstype={ApplicationType.utbetalingarbeidstaker} />}
        />
        <Route path={'/regnetsomalene'} render={() => <Application søknadstype={ApplicationType.regnetsomalene} />} />
        <Route path={'/deling'} render={() => <Application søknadstype={ApplicationType.deling} />} />
        <Route path={'/pleiepenger'} render={() => <Application søknadstype={ApplicationType.pleiepengerBarn} />} />
        <Route
            path={'/pleiepenger-livets-sluttfase'}
            render={() => <Application søknadstype={ApplicationType.pleiepengerLivetsSluttfase} />}
        />
        <Route path={'/feil'} component={GeneralErrorPage} />
        <Route component={IntroPage} />
    </Switch>
);

export default YtelseSwitch;
