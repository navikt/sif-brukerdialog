import { Navigate, Route, Routes } from 'react-router-dom';

import { useEffectOnce } from '@navikt/sif-common-hooks';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { StegId, stegConfig } from './config/stegConfig';
import { useAppStore, useMellomlagring } from './hooks';
import { KvitteringPage } from './pages/KvitteringPage';
import { VelkommenPage } from './pages/VelkommenPage';
import { Oppsummering } from './steg/Oppsummering';
import { PersonaliaSteg } from './steg/PersonaliaSteg';
import { KontaktinfoSteg } from './steg/KontaktinfoSteg';
import { Mellomlagring } from './types/Mellomlagring';
import { MellomlagringObserver, StegRoute, SøknadIndexRedirect, useSøknadFlyt } from '../rammeverk';
import { KjæledyrSteg } from './steg/KjæledyrSteg';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    mellomlagring?: Mellomlagring;
}

const AppMellomlagringObserver = () => {
    const { hentMellomlagring, lagreMellomlagring } = useMellomlagring();
    return <MellomlagringObserver callbacks={{ hentMellomlagring, lagreMellomlagring }} />;
};

export const Søknad = ({ søker, barn, mellomlagring }: Props) => {
    const init = useAppStore((s) => s.init);
    const søknadState = useAppStore((s) => s.søknadState);
    const currentStegId = useSøknadFlyt((s) => s.currentStegId);
    const setCurrentSteg = useSøknadFlyt((s) => s.setCurrentSteg);

    useEffectOnce(() => {
        init(søker, barn, mellomlagring?.søknadsdata);
        if (mellomlagring?.currentStegId) {
            setCurrentSteg(mellomlagring.currentStegId);
        }
    });

    return (
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
                    <Route element={<StegRoute erInitialisert={!!søknadState} />}>
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
    );
};
