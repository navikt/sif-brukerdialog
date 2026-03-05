import { useEffectOnce } from '@navikt/sif-common-hooks';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { Navigate, Route, Routes } from 'react-router-dom';

import { SøknadIndexRedirect, StegRouteGuard } from '../rammeverk';
import { StepFormValuesProvider } from '../rammeverk/state/StepFormValuesContext';
import { isSøknadStepIncluded, søknadStepConfig, SøknadStepId, søknadStepOrder } from './config/søknadStepConfig';
import { useSøknadStore } from './hooks';
import { KvitteringPage, VelkommenPage } from './pages';
import { HobbySteg, KontaktinfoSteg, Oppsummering, PersonaliaSteg } from './steg';
import { SøknadMellomlagring } from './types/Mellomlagring';

const getStepIdFraPath = (path: string): string | undefined => {
    return søknadStepOrder.find((id) => path.includes(søknadStepConfig[id].route));
};

const getPathForStep = (stepId: string): string => {
    return `/soknad/${søknadStepConfig[stepId as SøknadStepId]?.route}`;
};

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    mellomlagring?: SøknadMellomlagring;
}

export const Søknad = ({ søker, barn, mellomlagring }: Props) => {
    const init = useSøknadStore((s) => s.init);
    const søknadState = useSøknadStore((s) => s.søknadState);
    const currentStepId = useSøknadStore((s) => s.currentStepId);

    useEffectOnce(() => {
        init({ søker, barn }, mellomlagring?.søknadsdata, mellomlagring?.currentStepId);
    });

    return (
        <StepFormValuesProvider initialValues={mellomlagring?.skjemadata}>
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
                        <Route path={søknadStepConfig[SøknadStepId.PERSONALIA].route} element={<PersonaliaSteg />} />
                        <Route path={søknadStepConfig[SøknadStepId.HOBBY].route} element={<HobbySteg />} />
                        <Route path={søknadStepConfig[SøknadStepId.KONTAKT].route} element={<KontaktinfoSteg />} />
                        <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<Oppsummering />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </StepFormValuesProvider>
    );
};
