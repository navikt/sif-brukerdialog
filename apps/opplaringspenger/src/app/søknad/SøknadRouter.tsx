import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { useSøknadStatePersistence } from '../hooks/useSøknadStatePersistence';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import ArbeidStep from './steg/arbeid/ArbeidSteg';
import BarnSteg from './steg/barn/BarnSteg';
import OpplæringSteg from './steg/opplæring/OpplæringSteg';
import OppsummeringSteg from './steg/oppsummering/OppsummeringSteg';
import { StegID } from './søknadStegConfig';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        state: { søknadSendt, søknadsdata, søknadRoute },
    } = useSøknadContext();
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);
    useSøknadStatePersistence();

    useEffect(() => {
        if (søknadRoute && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(søknadRoute);
        }
    }, [navigateTo, søknadRoute, isFirstTimeLoadingApp]);

    if (søknadSendt && pathname !== SøknadRoutes.SØKNAD_SENDT) {
        return (
            <Routes>
                <Route path="*" element={<Navigate to={SøknadRoutes.SØKNAD_SENDT} replace={true} />} />
            </Routes>
        );
    }

    if (!søknadsdata) {
        return (
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path="*" element={<Navigate to={StegID.VELKOMMEN} />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route index element={<VelkommenPage />} />
            <Route path={StegID.VELKOMMEN} element={<VelkommenPage />} />
            <Route path={StegID.BARN} element={<BarnSteg />} />
            <Route path={StegID.ARBEID} element={<ArbeidStep />} />
            <Route path={StegID.OPPLÆRING} element={<OpplæringSteg />} />
            <Route path={StegID.OPPSUMMERING} element={<OppsummeringSteg />} />
            <Route path="*" element={<Navigate to={StegID.VELKOMMEN} />} />
        </Routes>
    );
};

export default SøknadRouter;
