import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { lagreSøknadState } from '../api/endpoints/mellomlagringEndpoint';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import ArbeidStep from './steg/arbeid/ArbeidSteg';
import BarnSteg from './steg/barn/BarnSteg';
import OpplæringSteg from './steg/opplæring/OpplæringSteg';
import OppsummeringSteg from './steg/oppsummering/OppsummeringSteg';
import { SøknadRoutes } from './SøknadRoutes';
import { StegID } from './søknadStegConfig';

const getSøknadStegRoute = (stegID?: StegID) => {
    return `/soknad${stegID ? `/${stegID}` : ''}`;
};

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const { state, dispatch } = useSøknadContext();
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    const { søknadSendt, søknadsdata, søknadRoute } = state;

    useEffect(() => {
        if (søknadRoute && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(søknadRoute);
        }
    }, [navigateTo, søknadRoute, isFirstTimeLoadingApp]);

    useEffect(() => {
        if (state.børMellomlagres) {
            lagreSøknadState(state).then(() => {
                dispatch(actionsCreator.setSøknadLagret());
            });
        }
    }, [state, dispatch]);

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
                <Route path="*" element={<Navigate to={getSøknadStegRoute()} />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route index element={<VelkommenPage />} />
            <Route path={StegID.BARN} element={<BarnSteg />} />
            <Route path={StegID.ARBEID} element={<ArbeidStep />} />
            <Route path={StegID.OPPLÆRING} element={<OpplæringSteg />} />
            <Route path={StegID.OPPSUMMERING} element={<OppsummeringSteg />} />
            <Route path="*" element={<Navigate to={getSøknadStegRoute()} />} />
        </Routes>
    );
};

export default SøknadRouter;
