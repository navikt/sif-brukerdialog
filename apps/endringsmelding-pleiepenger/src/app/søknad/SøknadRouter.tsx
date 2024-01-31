import { Button } from '@navikt/ds-react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { EnsureCorrectSøknadRouteErrorType, useEnsureCorrectSøknadRoute } from '@navikt/sif-common-soknad-ds';
import { appSentryLogger } from '@utils';
import StartPåNyttDialog from '../components/start-på-nytt-dialog/StartPåNyttDialog';
import { useMellomlagring } from '../hooks/useMellomlagring';
import { usePersistSøknadState } from '../hooks/usePersistSøknadState';
import { useResetSøknad } from '../hooks/useResetSøknad';
import { useSøknadContext } from '../hooks/useSøknadContext';
import KvitteringPage from '../pages/kvittering/KvitteringPage';
import VelgSakPage from '../pages/velg-sak/VelgSakPage';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import { StepId } from './config/StepId';
import { getSøknadStepRoute, SøknadRoutes, SøknadStepRoute } from './config/SøknadRoutes';
import ArbeidstidStep from './steps/arbeidstid/ArbeidstidStep';
import LovbestemtFerieStep from './steps/lovbestemt-ferie/LovbestemtFerieStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';
import UkjentArbeidsforholdStep from './steps/ukjent-arbeidsforhold/UkjentArbeidsforholdStep';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        state: { søknadsdata, søknadSteps = [], søknadRoute, k9saker, sak },
    } = useSøknadContext();

    const { slettMellomlagring } = useMellomlagring();
    const { logInfo } = useAmplitudeInstance();

    const { setShouldResetSøknad, shouldResetSøknad } = useResetSøknad();

    const { routeError, redirectToSøknadRoute } = useEnsureCorrectSøknadRoute(
        søknadRoute,
        SøknadRoutes.VELKOMMEN,
        søknadSteps.map((step) => getSøknadStepRoute(step)),
    );

    usePersistSøknadState();

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

    if (shouldResetSøknad) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    if (!sak && k9saker.length > 1) {
        return <VelgSakPage />;
    }

    const isStepAvailable = (stepId?: StepId): boolean => {
        return søknadSteps.some((id) => id === stepId);
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

                {isStepAvailable(StepId.UKJENT_ARBEIDSFOHOLD) && (
                    <Route path={SøknadStepRoute[StepId.UKJENT_ARBEIDSFOHOLD]} element={<UkjentArbeidsforholdStep />} />
                )}
                {isStepAvailable(StepId.LOVBESTEMT_FERIE) && (
                    <Route path={SøknadStepRoute[StepId.LOVBESTEMT_FERIE]} element={<LovbestemtFerieStep />} />
                )}
                {isStepAvailable(StepId.ARBEIDSTID) && (
                    <Route path={SøknadStepRoute[StepId.ARBEIDSTID]} element={<ArbeidstidStep />} />
                )}
                {isStepAvailable(StepId.OPPSUMMERING) && (
                    <Route path={SøknadStepRoute[StepId.OPPSUMMERING]} element={<OppsummeringStep />} />
                )}

                <Route
                    path={SøknadStepRoute[StepId.MELDING_SENDT]}
                    element={<KvitteringPage onUnmount={() => setShouldResetSøknad(true)} />}
                />

                {/* Hvis bruker har fjernet ferie, vært innom arbeidstid, angret fjernet ferie og brukt nettleser-back */}
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
