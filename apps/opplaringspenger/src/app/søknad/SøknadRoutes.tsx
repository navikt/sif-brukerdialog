import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import ArbeidStep from './steps/arbeid/ArbeidStep';
import BarnStep from './steps/barn/BarnStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import { StepID } from './søknadStepsConfig';

const getSøknadStepRoute = (stepID?: StepID) => {
    return `/soknad${stepID ? `/${stepID}` : ''}`;
};

export const SOKNAD_SENDT_ROUTE = 'soknad/soknad_sendt';

const SøknadRoutes = () => {
    const { pathname } = useLocation();
    const { state } = useSøknadContext();
    const { søknadSendt, søknadID } = state;

    if (søknadSendt && pathname !== SOKNAD_SENDT_ROUTE) {
        return (
            <Routes>
                <Route path="*" element={<Navigate to={SOKNAD_SENDT_ROUTE} replace={true} />} />
            </Routes>
        );
    }
    if (!søknadID) {
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
            <Route path={StepID.BARN} element={<BarnStep />} />
            <Route path={StepID.ARBEID} element={<ArbeidStep />} />
            <Route path={StepID.OPPSUMMERING} element={<OppsummeringStep />} />
            <Route path="*" element={<Navigate to={getSøknadStepRoute()} />} />
        </Routes>
    );
};

export default SøknadRoutes;
