import { Navigate, Route, Routes } from 'react-router-dom';

import { useEffectOnce } from '@navikt/sif-common-hooks';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { isSøknadStepIncluded, SøknadStepId, søknadStepConfig, søknadStepOrder } from './config/søknadStepConfig';
import { useAppStore } from './hooks';
import { KvitteringPage } from './pages/KvitteringPage';
import { VelkommenPage } from './pages/VelkommenPage';
import { Oppsummering } from './steg/Oppsummering';
import { PersonaliaSteg } from './steg/PersonaliaSteg';
import { KontaktinfoSteg } from './steg/KontaktinfoSteg';
import { AppMellomlagring } from './types/Mellomlagring';
import { StegRouteGuard, SøknadIndexRedirect } from '../rammeverk';
import { StepFormValuesProvider } from '../rammeverk/state/StepFormValuesContext';
import { KjæledyrSteg } from './steg/KjæledyrSteg';

const getStepIdFraPath = (path: string): string | undefined => {
    return søknadStepOrder.find((id) => path.includes(søknadStepConfig[id].route));
};

const getPathForStep = (stepId: string): string => {
    return `/soknad/${søknadStepConfig[stepId as SøknadStepId]?.route}`;
};

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    mellomlagring?: AppMellomlagring;
}

export const Søknad = ({ søker, barn, mellomlagring }: Props) => {
    const init = useAppStore((s) => s.init);
    const søknadState = useAppStore((s) => s.søknadState);
    const currentStepId = useAppStore((s) => s.currentStepId);

    useEffectOnce(() => {
        init({ søker, barn }, mellomlagring?.søknadsdata, mellomlagring?.currentStepId);
    });

    return (
        <StepFormValuesProvider initialValues={mellomlagring?.skjemadata}>
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <Routes>
                    <Route path="/" element={<VelkommenPage />} />
                    <Route path="/kvittering" element={<KvitteringPage />} />
                    <Route path="/soknad">
                        <Route
                            index
                            element={
                                <SøknadIndexRedirect stepConfig={søknadStepConfig} mellomlagretStepId={currentStepId} />
                            }
                        />
                        <Route
                            element={
                                <StegRouteGuard
                                    currentStepId={currentStepId}
                                    isInitialized={!!søknadState}
                                    isStepIncluded={(stepId) =>
                                        isSøknadStepIncluded(stepId, søknadState?.søknadsdata ?? {})
                                    }
                                    getStepIdFromPath={getStepIdFraPath}
                                    getPathForStep={getPathForStep}
                                />
                            }>
                            <Route
                                path={søknadStepConfig[SøknadStepId.PERSONALIA].route}
                                element={<PersonaliaSteg />}
                            />
                            <Route path={søknadStepConfig[SøknadStepId.KJÆLEDYR].route} element={<KjæledyrSteg />} />
                            <Route path={søknadStepConfig[SøknadStepId.KONTAKT].route} element={<KontaktinfoSteg />} />
                            <Route
                                path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route}
                                element={<Oppsummering />}
                            />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </StepFormValuesProvider>
    );
};
