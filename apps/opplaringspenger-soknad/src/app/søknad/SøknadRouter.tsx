import { fetchSøkerId } from '@navikt/sif-common-api';
import { useVerifyUserOnWindowFocus } from '@navikt/sif-common-soknad-ds/src';
import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { mellomlagringService } from '../api/mellomlagringService';
import { usePersistSøknadState } from '../hooks/usePersistSøknadState';
import { useResetSøknad } from '../hooks/useResetSøknad';
import useResetSøknadAfterDokumenterSendt from '../hooks/useResetSøknadAfterDokumenterSendt';
import KvitteringPage from '../pages/kvittering/KvitteringPage';
import UnknownRoutePage from '../pages/unknown-route/UnknownRoutePage';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import { SøknadRoutes, SøknadStepRoutePath } from '../types/SøknadRoutes';
import { StepId } from '../types/StepId';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import ArbeidssituasjonStep from './steps/arbeidssituasjon/ArbeidssituasjonStep';
import ArbeidstidStep from './steps/arbeidstid/ArbeidstidStep';
import KursStep from './steps/kurs/KursStep';
import LegeerklæringStep from './steps/legeerklæring/LegeerklæringStep';
import MedlemskapStep from './steps/medlemskap/MedlemskapStep';
import OmBarnetStep from './steps/om-barnet/OmBarnetStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        dispatch,
        state: { søknadsdata, søker, søknadRoute: stateSøknadRoute },
    } = useSøknadContext();
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    const { setShouldResetSøknad, shouldResetSøknad } = useResetSøknad();

    usePersistSøknadState();
    useVerifyUserOnWindowFocus(søker.fødselsnummer, fetchSøkerId);
    useResetSøknadAfterDokumenterSendt(() => restartSøknad());

    useEffect(() => {
        if (stateSøknadRoute && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(stateSøknadRoute);
        }
        if (pathname === SøknadRoutes.VELKOMMEN && stateSøknadRoute) {
            navigateTo(stateSøknadRoute); // Send til sider hvis bruker kommer til velkommen via annen navigasjon
        }
    }, [navigateTo, pathname, stateSøknadRoute, isFirstTimeLoadingApp]);

    const restartSøknad = useCallback(async () => {
        await mellomlagringService.purge();
        relocateToWelcomePage();
    }, []);

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            setTimeout(restartSøknad);
        }
    }, [shouldResetSøknad, dispatch, restartSøknad]);

    if (søknadsdata.velkommen !== undefined && søknadsdata.velkommen.harForståttRettigheterOgPlikter !== true) {
        setShouldResetSøknad(true);
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
            <Route path={SøknadStepRoutePath[StepId.VELKOMMEN]} element={<VelkommenPage />} />
            <Route path={SøknadStepRoutePath[StepId.OM_BARNET]} element={<OmBarnetStep />} />
            <Route path={SøknadStepRoutePath[StepId.LEGEERKLÆRING]} element={<LegeerklæringStep />} />
            <Route path={SøknadStepRoutePath[StepId.KURS]} element={<KursStep />} />
            <Route path={SøknadStepRoutePath[StepId.ARBEIDSSITUASJON]} element={<ArbeidssituasjonStep />} />
            <Route path={SøknadStepRoutePath[StepId.ARBEIDSTID]} element={<ArbeidstidStep />} />
            <Route path={SøknadStepRoutePath[StepId.MEDLEMSKAP]} element={<MedlemskapStep />} />
            <Route path={SøknadStepRoutePath[StepId.OPPSUMMERING]} element={<OppsummeringStep />} />
            <Route path={SøknadStepRoutePath[StepId.KVITTERING]} element={<KvitteringPage />} />
            <Route
                path="*"
                element={
                    <UnknownRoutePage
                        pathName={pathname}
                        onReset={() => {
                            mellomlagringService.purge().then(() => {
                                dispatch(actionsCreator.resetSøknad());
                                navigateTo(SøknadRoutes.VELKOMMEN);
                            });
                        }}
                    />
                }
            />
        </Routes>
    );
};

export default SøknadRouter;
