import { Button } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import {
    EnsureCorrectSøknadRouteErrorType,
    useEnsureCorrectSøknadRoute,
} from '@navikt/sif-common-soknad-ds/lib/hooks/useEnsureCorrectSøknadRoute';
import StartPåNyttDialog from '@navikt/sif-common-soknad-ds/lib/start-på-nytt-dialog/StartPåNyttDialog';
import { useMellomlagring } from '../hooks/useMellomlagring';
import { usePersistSøknadState } from '../hooks/usePersistSøknadState';
import KvitteringPage from '../pages/kvittering/KvitteringPage';
import VelgSakPage from '../pages/velg-sak/VelgSakPage';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import appSentryLogger from '../utils/appSentryLogger';
import { harFjernetLovbestemtFerie } from '../utils/lovbestemtFerieUtils';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import { StepId } from './config/StepId';
import { getSøknadStepRoute, SøknadRoutes, SøknadStepRoute } from './config/SøknadRoutes';
import { getSøknadSteps } from './config/søknadStepConfig';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import ArbeidstidStep from './steps/arbeidstid/ArbeidstidStep';
import LovbestemtFerieStep from './steps/lovbestemt-ferie/LovbestemtFerieStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/atoms/loading-spinner/LoadingSpinner';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        dispatch,
        state: { endringsmeldingSendt, søknadsdata, hvaSkalEndres, søknadRoute, k9saker, sak },
    } = useSøknadContext();

    const [shouldResetSøknad, setShouldResetSøknad] = useState(false);
    const { slettMellomlagring } = useMellomlagring();
    const { logInfo } = useAmplitudeInstance();

    const availableSteps = getSøknadSteps(hvaSkalEndres, harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie));

    const { routeError, redirectToSøknadRoute } = useEnsureCorrectSøknadRoute(
        søknadRoute,
        SøknadRoutes.VELKOMMEN,
        availableSteps.map((step) => getSøknadStepRoute(step))
    );

    usePersistSøknadState();

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            setTimeout(() => {
                relocateToWelcomePage();
            });
        }
    }, [shouldResetSøknad, dispatch]);

    const startPåNytt = async () => {
        await logInfo({ kilde: 'StartPåNyttDialog', starterPåNytt: true });
        restartSøknad();
    };

    const restartSøknad = async () => {
        await slettMellomlagring();
        relocateToWelcomePage();
    };

    const resumeSøknad = async () => {
        await logInfo({ kilde: 'StartPåNyttDialog', starterPåNytt: false });
        redirectToSøknadRoute();
    };

    if (endringsmeldingSendt && pathname !== SøknadRoutes.SØKNAD_SENDT && !shouldResetSøknad) {
        setShouldResetSøknad(true);
    }

    if (shouldResetSøknad) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    if (!sak && k9saker.length > 1) {
        return <VelgSakPage />;
    }

    const isStepAvailable = (stepId?: StepId): boolean => {
        return availableSteps.some((id) => id === stepId);
    };

    if (søknadsdata.velkommen?.harForståttRettigheterOgPlikter === false) {
        return (
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path="*" element={<Navigate to={SøknadRoutes.VELKOMMEN} replace={true} />} />
            </Routes>
        );
    }

    return (
        <>
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path={SøknadStepRoute[StepId.VELKOMMEN]} element={<VelkommenPage />} />

                {isStepAvailable(StepId.LOVBESTEMT_FERIE) && (
                    <Route path={SøknadStepRoute[StepId.LOVBESTEMT_FERIE]} element={<LovbestemtFerieStep />} />
                )}
                {isStepAvailable(StepId.ARBEIDSTID) && (
                    <Route path={SøknadStepRoute[StepId.ARBEIDSTID]} element={<ArbeidstidStep />} />
                )}
                {isStepAvailable(StepId.OPPSUMMERING) && (
                    <Route path={SøknadStepRoute[StepId.OPPSUMMERING]} element={<OppsummeringStep />} />
                )}

                <Route path={SøknadStepRoute[StepId.MELDING_SENDT]} element={<KvitteringPage />} />

                {/* Dersom bruker har fjernet ferie, vært innom arbeidstid, angret fjernet ferie og brukt nettleser-back */}
                {isStepAvailable(StepId.ARBEIDSTID) === false && isStepAvailable(StepId.LOVBESTEMT_FERIE) && (
                    <Route
                        path={SøknadStepRoute[StepId.ARBEIDSTID]}
                        element={<Navigate to={SøknadRoutes.LOVBESTEMT_FERIE} replace={true} />}
                    />
                )}

                <Route
                    path="*"
                    element={
                        <UkjentPathMelding
                            pathname={pathname}
                            onReset={() => {
                                slettMellomlagring().then(() => {
                                    relocateToWelcomePage();
                                });
                            }}
                        />
                    }
                />
            </Routes>
            <StartPåNyttDialog
                open={routeError === EnsureCorrectSøknadRouteErrorType.welcomePage}
                onCancel={resumeSøknad}
                onConfirm={startPåNytt}
            />
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
