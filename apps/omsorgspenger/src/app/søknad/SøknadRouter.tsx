import { Button } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { useMellomlagring } from '../hooks/useMellomlagring';
import { usePersistSøknadState } from '../hooks/usePersistSøknadState';
import SøknadSendtPage from '../pages/søknad-sendt/SøknadSendtPage';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';
import OmBarnetStep from './steps/om-barnet/OmBarnetStep';
import DeltBostedStep from './steps/delt-bosted/DeltBostedStep';
import LegeerklæringStep from './steps/legeerklæring/LegeerklæringStep';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        dispatch,
        state: { søknadSendt, søknadsdata, søknadRoute },
    } = useSøknadContext();
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);
    const [shouldResetSøknad, setShouldResetSøknad] = useState(false);
    const { slettMellomlagring } = useMellomlagring();

    usePersistSøknadState();

    useEffect(() => {
        if (søknadRoute && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(søknadRoute);
        }
        if (pathname === SøknadRoutes.VELKOMMEN && søknadRoute) {
            navigateTo(søknadRoute); // Send til sider dersom bruker kommer til velkommen via annen navigasjon
        }
    }, [navigateTo, pathname, søknadRoute, isFirstTimeLoadingApp]);

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            setShouldResetSøknad(false);
            navigateTo(SøknadRoutes.VELKOMMEN);
        }
    }, [shouldResetSøknad, navigateTo, dispatch]);

    if (søknadSendt && pathname !== SøknadRoutes.SØKNAD_SENDT && !shouldResetSøknad) {
        setShouldResetSøknad(true);
    }

    if (søknadsdata.harForståttRettigheterOgPlikter === false) {
        return (
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path="*" element={<Navigate to={StepId.VELKOMMEN} />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route index element={<VelkommenPage />} />
            <Route path={StepId.VELKOMMEN} element={<VelkommenPage />} />
            <Route path={StepId.OM_BARNET} element={<OmBarnetStep />} />
            <Route path={StepId.DELT_BOSTED} element={<DeltBostedStep />} />
            <Route path={StepId.LEGEERKLÆRING} element={<LegeerklæringStep />} />
            <Route path={StepId.OPPSUMMERING} element={<OppsummeringStep />} />
            <Route path={StepId.SØKNAD_SENDT} element={<SøknadSendtPage />} />
            <Route
                path="*"
                element={
                    <>
                        Ukjent steg: {pathname}.
                        <FormBlock>
                            <Button
                                type="button"
                                onClick={() => {
                                    slettMellomlagring().then(() => {
                                        dispatch(actionsCreator.resetSøknad());
                                        navigateTo(SøknadRoutes.VELKOMMEN);
                                    });
                                }}>
                                Reset søknad
                            </Button>
                        </FormBlock>
                    </>
                }
            />
        </Routes>
    );
};

export default SøknadRouter;
