import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import GeneralErrorPage from './components/pages/general-error-page/GeneralErrorPage';
import IntroPage from './components/pages/intro-page/IntroPage';
import Application from './application/Application';

const RootRoutes = () => (
    <Routes>
        <Route path={'/:ytelse/melding/*'} element={<Application />} />
        <Route path={'/:ytelse/'} element={<Navigate to={'melding'} />} />
        <Route path={'/:ytelse/feil'} element={<GeneralErrorPage />} />
        <Route path={'/feil'} element={<GeneralErrorPage />} />
        <Route path={'/'} element={<IntroPage />} />
    </Routes>
);

export default RootRoutes;
