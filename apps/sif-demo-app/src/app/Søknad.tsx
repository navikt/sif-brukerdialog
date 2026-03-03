import { Navigate, Route, Routes } from 'react-router-dom';

import { useEffectOnce } from '@navikt/sif-common-hooks';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { skalStegVises, StegId, stegConfig, stegRekkefølge } from './config/stegConfig';
import { useAppStore, useMellomlagring } from './hooks';
import { KvitteringPage } from './pages/KvitteringPage';
import { VelkommenPage } from './pages/VelkommenPage';
import { Oppsummering } from './steg/Oppsummering';
import { PersonaliaSteg } from './steg/PersonaliaSteg';
import { KontaktinfoSteg } from './steg/KontaktinfoSteg';
import { Mellomlagring } from './types/Mellomlagring';
import { MellomlagringObserver, StegRouteGuard, SøknadIndexRedirect } from '../rammeverk';
import { StepFormValuesProvider } from '../rammeverk/state/StepFormValuesContext';
import { KjæledyrSteg } from './steg/KjæledyrSteg';

const getStegIdFraPath = (path: string): string | undefined => {
    return stegRekkefølge.find((id) => path.includes(stegConfig[id].route));
};

const getPathForSteg = (stegId: string): string => {
    return `/soknad/${stegConfig[stegId as StegId]?.route}`;
};

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    mellomlagring?: Mellomlagring;
}

const AppMellomlagringObserver = () => {
    const børMellomlagres = useAppStore((s) => s.børMellomlagres);
    const setBørMellomlagres = useAppStore((s) => s.setBørMellomlagres);
    const { lagreMellomlagring } = useMellomlagring();
    return (
        <MellomlagringObserver
            børMellomlagres={børMellomlagres}
            setBørMellomlagres={setBørMellomlagres}
            lagreMellomlagring={lagreMellomlagring}
        />
    );
};

export const Søknad = ({ søker, barn, mellomlagring }: Props) => {
    const init = useAppStore((s) => s.init);
    const søknadState = useAppStore((s) => s.søknadState);
    const currentStegId = useAppStore((s) => s.currentStegId);
    const setCurrentSteg = useAppStore((s) => s.setCurrentSteg);

    useEffectOnce(() => {
        init({ søker, barn }, mellomlagring?.søknadsdata);
        if (mellomlagring?.currentStegId) {
            setCurrentSteg(mellomlagring.currentStegId);
        }
    });

    return (
        <StepFormValuesProvider>
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                {søknadState ? <AppMellomlagringObserver /> : <>Ingen søknadstate</>}
                <Routes>
                    <Route path="/" element={<VelkommenPage />} />
                    <Route path="/kvittering" element={<KvitteringPage />} />
                    <Route path="/soknad">
                        <Route
                            index
                            element={<SøknadIndexRedirect stegConfig={stegConfig} mellomlagretStegId={currentStegId} />}
                        />
                        <Route
                            element={
                                <StegRouteGuard
                                    currentStegId={currentStegId}
                                    erInitialisert={!!søknadState}
                                    skalStegVises={(stegId) => skalStegVises(stegId, søknadState?.søknadsdata ?? {})}
                                    getStegIdFraPath={getStegIdFraPath}
                                    getPathForSteg={getPathForSteg}
                                />
                            }>
                            <Route path={stegConfig[StegId.PERSONALIA].route} element={<PersonaliaSteg />} />
                            <Route path={stegConfig[StegId.KJÆLEDYR].route} element={<KjæledyrSteg />} />
                            <Route path={stegConfig[StegId.KONTAKT].route} element={<KontaktinfoSteg />} />
                            <Route path={stegConfig[StegId.OPPSUMMERING].route} element={<Oppsummering />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </StepFormValuesProvider>
    );
};
