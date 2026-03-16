import { SøknadContextProvider } from '@app/setup/context/søknadContext';
import { useSøknadStore } from '@app/setup/hooks';
import { søknadStepConfig, SøknadStepId } from '@app/setup/søknad/søknadStepConfig';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { StepRouteGuard } from '@sif/soknad/navigation';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { KvitteringPage, VelkommenPage } from './pages';
import { RhfEksempelForm } from './pages/rhf-eksempel/RhfEksempelForm';
import { BarnSteg, BostedSteg, OppsummeringSteg } from './steps';
import { SøknadMellomlagring } from './types/Mellomlagring';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    mellomlagring?: SøknadMellomlagring;
}

export const Søknad = ({ søker, barn, mellomlagring }: Props) => {
    const init = useSøknadStore((s) => s.init);
    const søknadSendt = useSøknadStore((s) => s.søknadSendt);
    const søknadState = useSøknadStore((s) => s.søknadState);
    const currentStepId = useSøknadStore((s) => s.currentStepId);
    const includedSteps = useSøknadStore((s) => s.includedSteps);

    const location = useLocation();
    const navigate = useNavigate();

    useEffectOnce(() => {
        init({ søker, barn }, mellomlagring?.søknadsdata, mellomlagring?.currentStepId);
    });

    useEffect(() => {
        if (søknadSendt && location.pathname !== '/kvittering') {
            navigate('/kvittering', { replace: true });
        } else if (!søknadSendt && location.pathname === '/kvittering') {
            navigate('/', { replace: true });
        }
    }, [søknadSendt, location.pathname, navigate]);

    const currentStepRoute = currentStepId ? søknadStepConfig[currentStepId]?.route : undefined;

    useEffect(() => {
        if (currentStepRoute && location.pathname === '/') {
            navigate(`/soknad/${currentStepRoute}`, { replace: true });
        }
    }, [currentStepRoute, location.pathname, navigate]);

    if (søknadSendt && location.pathname !== '/kvittering') {
        return <KvitteringPage />;
    }
    if (!søknadSendt && location.pathname === '/kvittering') {
        return <VelkommenPage />;
    }

    return (
        <SøknadContextProvider initialFormValues={mellomlagring?.skjemadata}>
            <Routes>
                <Route path="/" element={<VelkommenPage />} />
                <Route path="/kvittering" element={<KvitteringPage />} />
                <Route path="/rhf-eksempel" element={<RhfEksempelForm />} />
                <Route
                    path="/soknad"
                    element={
                        <StepRouteGuard
                            steps={includedSteps}
                            currentStepId={currentStepId}
                            isInitialized={!!søknadState}
                        />
                    }>
                    <Route path={søknadStepConfig[SøknadStepId.BARN].route} element={<BarnSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.BOSTED].route} element={<BostedSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<OppsummeringSteg />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadContextProvider>
    );
};
