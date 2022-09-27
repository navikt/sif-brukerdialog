import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GeneralErrorPage from './components/pages/general-error-page/GeneralErrorPage';
import IntroPage from './components/pages/intro-page/IntroPage';
import Application from './application/Application';
import { ApplicationType } from './types/ApplicationType';

const YtelseSwitch = () => (
    <Routes>
        <Route path={'/omsorgspenger'} element={<Application søknadstype={ApplicationType.omsorgspenger} />} />
        <Route
            path={'/ekstraomsorgsdager'}
            element={<Application søknadstype={ApplicationType.ekstraomsorgsdager} />}
        />
        <Route path={'/utbetaling'} element={<Application søknadstype={ApplicationType.utbetaling} />} />
        <Route
            path={'/utbetalingarbeidstaker'}
            element={<Application søknadstype={ApplicationType.utbetalingarbeidstaker} />}
        />
        <Route path={'/regnetsomalene'} element={<Application søknadstype={ApplicationType.regnetsomalene} />} />
        <Route path={'/deling'} element={<Application søknadstype={ApplicationType.deling} />} />
        <Route path={'/pleiepenger'} element={<Application søknadstype={ApplicationType.pleiepengerBarn} />} />
        <Route
            path={'/pleiepenger-livets-sluttfase'}
            element={<Application søknadstype={ApplicationType.pleiepengerLivetsSluttfase} />}
        />
        <Route path={'/feil'} element={<GeneralErrorPage />} />
        <Route element={<IntroPage />} />
    </Routes>
);

export default YtelseSwitch;
