import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { usePersistSøknadState } from '../hooks/usePersistSøknadState';
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

    usePersistSøknadState();

    useEffect(() => {
        if (søknadRoute && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(søknadRoute);
        }
        if (pathname === SøknadRoutes.VELKOMMEN && søknadRoute) {
            navigateTo(søknadRoute); // Send til steg dersom bruker kommer til velkommen via annen navigasjon
        }
    }, [navigateTo, pathname, søknadRoute, isFirstTimeLoadingApp]);

    if (søknadSendt && pathname !== SøknadRoutes.SØKNAD_SENDT) {
        return (
            <Routes>
                <Route path="*" element={<Navigate to={SøknadRoutes.SØKNAD_SENDT} replace={true} />} />
            </Routes>
        );
    }

    if (søknadsdata.harForståttRettigheterOgPlikter === false) {
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
