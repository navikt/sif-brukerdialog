import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { SøkYtelseOppgave } from '@sif/api/ung-brukerdialog';
import { UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { StepRouteGuard } from '@sif/soknad/navigation';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppRoutes } from '../../utils/AppRoutes';
import KvitteringPage from './pages/KvitteringPage';
import VelkommenPage from './pages/VelkommenPage';
import { SøknadContextProvider } from './setup/context/søknadContext';
import { useSøknadStore } from './setup/hooks/useSøknadStore';
import { useStepTitles } from './setup/hooks/useStepTitles';
import { søknadStepConfig } from './setup/config/søknadStepConfig';
import { SøknadStepId } from './setup/config/SøknadStepId';
import KontonummerSteg from './steg/kontonummer/KontonummerSteg';
import BarnSteg from './steg/barn/BarnSteg';
import OppsummeringSteg from './steg/oppsummering/OppsummeringSteg';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    kontonummerInfo: UtvidetKontonummerInfo;
    søknadOppgave: SøkYtelseOppgave;
}

const SøknadInner = ({ søker, barn, kontonummerInfo, søknadOppgave }: Props) => {
    const init = useSøknadStore((s) => s.init);
    const søknadSendt = useSøknadStore((s) => s.søknadSendt);
    const currentStepId = useSøknadStore((s) => s.currentStepId);
    const includedSteps = useSøknadStore((s) => s.includedSteps);
    const søknadState = useSøknadStore((s) => s.søknadState);
    const stepTitles = useStepTitles();

    const location = useLocation();
    const navigate = useNavigate();

    useEffectOnce(() => {
        init({ søker, barn, kontoInfo: kontonummerInfo, søknadOppgave }, undefined, undefined);
    });

    const kvitteringPath = `${AppRoutes.soknad}/kvittering`;

    useEffect(() => {
        if (søknadSendt && location.pathname !== kvitteringPath) {
            navigate(kvitteringPath, { replace: true });
        } else if (!søknadSendt && location.pathname === kvitteringPath) {
            navigate(AppRoutes.soknad, { replace: true });
        }
    }, [søknadSendt, location.pathname, navigate, kvitteringPath]);

    const currentStepRoute = currentStepId ? søknadStepConfig[currentStepId]?.route : undefined;
    useEffect(() => {
        if (currentStepRoute && location.pathname === AppRoutes.soknad) {
            navigate(`${AppRoutes.soknad}/${currentStepRoute}`, { replace: true });
        }
    }, [currentStepRoute, location.pathname, navigate]);

    if (søknadSendt && location.pathname !== kvitteringPath) {
        return <KvitteringPage />;
    }

    if (!søknadSendt && location.pathname === kvitteringPath) {
        return (
            <SøknadContextProvider stepTitles={stepTitles}>
                <VelkommenPage />
            </SøknadContextProvider>
        );
    }

    return (
        <SøknadContextProvider stepTitles={stepTitles}>
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path="kvittering" element={<KvitteringPage />} />
                <Route
                    path="steg"
                    element={
                        <StepRouteGuard
                            steps={includedSteps}
                            currentStepId={currentStepId}
                            isInitialized={!!søknadState}
                        />
                    }>
                    <Route
                        path={søknadStepConfig[SøknadStepId.KONTONUMMER].route.replace('steg/', '')}
                        element={<KontonummerSteg />}
                    />
                    <Route
                        path={søknadStepConfig[SøknadStepId.BARN].route.replace('steg/', '')}
                        element={<BarnSteg />}
                    />
                    <Route
                        path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route.replace('steg/', '')}
                        element={<OppsummeringSteg />}
                    />
                    <Route path="*" element={<Navigate to={AppRoutes.soknad} replace />} />
                </Route>
                <Route path="*" element={<Navigate to={AppRoutes.soknad} replace />} />
            </Routes>
        </SøknadContextProvider>
    );
};

const Søknad = (props: Props) => {
    return <SøknadInner {...props} />;
};

export default Søknad;
