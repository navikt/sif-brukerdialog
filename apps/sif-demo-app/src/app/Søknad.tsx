import { useEffectOnce } from '@navikt/sif-common-hooks';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { SøknadFormValuesProvider } from '@rammeverk/consistency';
import { StepRouteGuard } from '@rammeverk/navigation';
import { Navigate, Route, Routes } from 'react-router-dom';

import { søknadStepConfig, SøknadStepId } from './config/søknadStepConfig';
import { useSøknadStore } from './hooks';
import { KvitteringPage, VelkommenPage } from './pages';
import { BarnSteg, BostedSteg, OppsummeringSteg } from './steps';
import { SøknadMellomlagring } from './types/Mellomlagring';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    mellomlagring?: SøknadMellomlagring;
}

export const Søknad = ({ søker, barn, mellomlagring }: Props) => {
    const init = useSøknadStore((s) => s.init);
    const søknadState = useSøknadStore((s) => s.søknadState);
    const currentStepId = useSøknadStore((s) => s.currentStepId);
    const includedSteps = useSøknadStore((s) => s.includedSteps);

    useEffectOnce(() => {
        init({ søker, barn }, mellomlagring?.søknadsdata, mellomlagring?.currentStepId);
    });

    const currentStepRoute = currentStepId ? søknadStepConfig[currentStepId]?.route : undefined;

    return (
        <SøknadFormValuesProvider initialValues={mellomlagring?.skjemadata}>
            <Routes>
                <Route
                    path="/"
                    element={
                        currentStepRoute ? <Navigate to={`/soknad/${currentStepRoute}`} replace /> : <VelkommenPage />
                    }
                />
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
                    <Route path={søknadStepConfig[SøknadStepId.BARN].route} element={<BarnSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.BOSTED].route} element={<BostedSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<OppsummeringSteg />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadFormValuesProvider>
    );
};
