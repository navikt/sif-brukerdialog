import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import ArbeidStep from './steg/arbeid/ArbeidSteg';
import BarnSteg from './steg/barn/BarnSteg';
import OppsummeringSteg from './steg/oppsummering/OppsummeringSteg';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import { SøknadStegID } from './søknadStepsConfig';

const getSøknadStegRoute = (stegID?: SøknadStegID) => {
    return `/soknad${stegID ? `/${stegID}` : ''}`;
};

export const SOKNAD_SENDT_ROUTE = 'soknad/soknad_sendt';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const { state } = useSøknadContext();
    const { søknadSendt, søknad, steg } = state;
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    useEffect(() => {
        if (steg && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(steg);
        }
    }, [navigateTo, steg, isFirstTimeLoadingApp]);

    if (steg && søknad && getSøknadStegRoute(steg) !== pathname) {
        return <Navigate to={steg} />;
    }

    if (søknadSendt && pathname !== SOKNAD_SENDT_ROUTE) {
        return (
            <Routes>
                <Route path="*" element={<Navigate to={SOKNAD_SENDT_ROUTE} replace={true} />} />
            </Routes>
        );
    }
    if (!søknad) {
        return (
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path="*" element={<Navigate to={getSøknadStegRoute()} />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route index element={<VelkommenPage />} />
            <Route path={SøknadStegID.BARN} element={<BarnSteg />} />
            <Route path={SøknadStegID.ARBEID} element={<ArbeidStep />} />
            <Route path={SøknadStegID.OPPSUMMERING} element={<OppsummeringSteg />} />
            <Route path="*" element={<Navigate to={getSøknadStegRoute()} />} />
        </Routes>
    );
};

export default SøknadRouter;
