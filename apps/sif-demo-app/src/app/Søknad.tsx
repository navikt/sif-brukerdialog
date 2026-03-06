import { useEffectOnce } from '@navikt/sif-common-hooks';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { StepRouteGuard } from '@rammeverk';
import { StepsFormValuesProvider } from '@rammeverk/state/StepFormValuesContext';
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

    return (
        <StepsFormValuesProvider initialValues={mellomlagring?.skjemadata}>
            <Routes>
                <Route path="/" element={currentStepId ? <Navigate to="/soknad" replace /> : <VelkommenPage />} />
                <Route path="/kvittering" element={<KvitteringPage />} />
                <Route path="/soknad">
                    <Route
                        index
                        element={
                            currentStepId && søknadStepConfig[currentStepId]?.route ? (
                                <Navigate to={`/soknad/${søknadStepConfig[currentStepId].route}`} replace />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        element={
                            <StepRouteGuard
                                steps={includedSteps}
                                currentStepId={currentStepId}
                                isInitialized={!!søknadState}
                            />
                        }>
                        <Route path={søknadStepConfig[SøknadStepId.BARN].route} element={<BarnSteg />} />
                        <Route path={søknadStepConfig[SøknadStepId.BOSTED].route} element={<BostedSteg />} />
                        <Route
                            path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route}
                            element={<OppsummeringSteg />}
                        />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </StepsFormValuesProvider>
    );
};
