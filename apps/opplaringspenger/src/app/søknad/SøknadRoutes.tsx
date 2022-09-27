import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import ArbeidStep from './steps/arbeid/ArbeidStep';
import BarnStep from './steps/barn/BarnStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';
import { useSøknadContext } from './SøknadContext';
import { SøknadStepRoutes } from './SøknadStepRoutes';

const getSøknadStepRoute = (route?: SøknadStepRoutes) => {
    return `/soknad${route ? `/${route}` : ''}`;
};

const SøknadRoutes = () => {
    const { søknadId } = useSøknadContext();
    if (!søknadId) {
        return (
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path="*" element={<Navigate to={getSøknadStepRoute()} />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route index element={<VelkommenPage />} />
            <Route path={SøknadStepRoutes.BARN} element={<BarnStep />} />
            <Route path={SøknadStepRoutes.ARBEID} element={<ArbeidStep />} />
            <Route path={SøknadStepRoutes.OPPSUMMERING} element={<OppsummeringStep />} />
            <Route path="*" element={<Navigate to={getSøknadStepRoute()} />} />
        </Routes>
    );
};

export default SøknadRoutes;
