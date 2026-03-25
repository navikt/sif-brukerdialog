import { søknadStepConfig } from '@app/setup/config/soknadStepConfig';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadContextProvider } from '@app/setup/context/soknadContext';
import { useSøknadStore, useStepTitles } from '@app/setup/hooks';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';
import { StepRouteGuard } from '@sif/soknad/navigation';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { KvitteringPage, VelkommenPage } from './pages';
import { AndreYtelserSteg, BarnSteg, BostedSteg, BostedUtlandSteg, KontonummerSteg, OppsummeringSteg } from './steps';
import { SøknadMellomlagring } from './types/Mellomlagring';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    kontonummer: UtvidetKontonummerInfo;
    mellomlagring?: SøknadMellomlagring;
}

export const Søknad = ({ søker, barn, kontonummer, mellomlagring }: Props) => {
    const stepTitles = useStepTitles();
    const init = useSøknadStore((s) => s.init);
    const søknadSendt = useSøknadStore((s) => s.søknadSendt);
    const søknadState = useSøknadStore((s) => s.søknadState);
    const currentStepId = useSøknadStore((s) => s.currentStepId);
    const includedSteps = useSøknadStore((s) => s.includedSteps);

    const location = useLocation();
    const navigate = useNavigate();

    useEffectOnce(() => {
        init({ søker, barn, kontoInfo: kontonummer }, mellomlagring?.søknadsdata, mellomlagring?.currentStepId);
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
        return (
            <SøknadContextProvider stepTitles={stepTitles}>
                <VelkommenPage />
            </SøknadContextProvider>
        );
    }

    return (
        <SøknadContextProvider initialFormValues={mellomlagring?.skjemadata} stepTitles={stepTitles}>
            <Routes>
                <Route path="/" element={<VelkommenPage />} />
                <Route path="/kvittering" element={<KvitteringPage />} />
                <Route
                    path="/soknad"
                    element={
                        <StepRouteGuard
                            steps={includedSteps}
                            currentStepId={currentStepId}
                            isInitialized={!!søknadState}
                        />
                    }>
                    <Route path={søknadStepConfig[SøknadStepId.ANDRE_YTELSER].route} element={<AndreYtelserSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.KONTONUMMER].route} element={<KontonummerSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.BOSTED].route} element={<BostedSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.BOSTED_UTLAND].route} element={<BostedUtlandSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.BARN].route} element={<BarnSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<OppsummeringSteg />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadContextProvider>
    );
};
