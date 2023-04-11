import { Button } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import StartPåNyttDialog from '../components/start-på-nytt-dialog/StartPåNyttDialog';
import { useEnsureCorrectSøknadRoute } from '../hooks/useEnsureCorrectSøknadRoute';
import { useMellomlagring } from '../hooks/useMellomlagring';
import { usePersistSøknadState } from '../hooks/usePersistSøknadState';
import KvitteringPage from '../pages/kvittering/KvitteringPage';
import VelgSakPage from '../pages/velg-sak/VelgSakPage';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import appSentryLogger from '../utils/appSentryLogger';
import { StepId } from './config/StepId';
import { SøknadRoutes, SøknadStepRoute } from './config/SøknadRoutes';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import ArbeidstidStep from './steps/arbeidstid/ArbeidstidStep';
import LovbestemtFerieStep from './steps/lovbestemt-ferie/LovbestemtFerieStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';
import { relocateToWelcomePage } from '../utils/navigationUtils';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        dispatch,
        state: { endringsmeldingSendt, søknadsdata, søknadRoute, k9saker, sak },
    } = useSøknadContext();
    const navigateTo = useNavigate();
    const [shouldResetSøknad, setShouldResetSøknad] = useState(false);
    const { slettMellomlagring } = useMellomlagring();

    usePersistSøknadState();
    const { showWarning, redirectToSøknadRoute } = useEnsureCorrectSøknadRoute(søknadRoute);

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            setShouldResetSøknad(false);
            navigateTo(SøknadRoutes.VELKOMMEN);
        }
    }, [shouldResetSøknad, navigateTo, dispatch]);

    const onRestart = async () => {
        dispatch(actionsCreator.resetSøknad());
        await slettMellomlagring();
        relocateToWelcomePage();
    };

    if (endringsmeldingSendt && pathname !== SøknadRoutes.SØKNAD_SENDT && !shouldResetSøknad) {
        setShouldResetSøknad(true);
    }

    if (!sak && k9saker.length > 1) {
        return <VelgSakPage />;
    }

    if (søknadsdata.velkommen?.harForståttRettigheterOgPlikter === false) {
        return (
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path="*" element={<Navigate to={StepId.VELKOMMEN} replace={true} />} />
            </Routes>
        );
    }

    return (
        <>
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path={SøknadStepRoute[StepId.VELKOMMEN]} element={<VelkommenPage />} />
                <Route path={SøknadStepRoute[StepId.ARBEIDSTID]} element={<ArbeidstidStep />} />
                <Route path={SøknadStepRoute[StepId.LOVBESTEMT_FERIE]} element={<LovbestemtFerieStep />} />
                <Route path={SøknadStepRoute[StepId.OPPSUMMERING]} element={<OppsummeringStep />} />
                <Route path={SøknadStepRoute[StepId.MELDING_SENDT]} element={<KvitteringPage />} />
                <Route
                    path="*"
                    element={
                        <UkjentPathMelding
                            pathname={pathname}
                            onReset={() => {
                                slettMellomlagring().then(() => {
                                    dispatch(actionsCreator.resetSøknad());
                                    navigateTo(SøknadRoutes.VELKOMMEN);
                                });
                            }}
                        />
                    }
                />
            </Routes>
            <StartPåNyttDialog open={showWarning} onCancel={redirectToSøknadRoute} onConfirm={onRestart} />
        </>
    );
};

const UkjentPathMelding = ({ pathname, onReset }: { pathname: string; onReset: () => void }) => {
    appSentryLogger.logError('ukjentPath', pathname);
    return (
        <SifGuidePanel mood="uncertain">
            Oops, det oppstod en feil.
            <FormBlock>
                <Button type="button" onClick={onReset}>
                    Start på nytt
                </Button>
            </FormBlock>
        </SifGuidePanel>
    );
};

export default SøknadRouter;
