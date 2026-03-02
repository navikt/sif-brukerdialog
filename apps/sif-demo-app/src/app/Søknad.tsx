import { Route, Routes } from 'react-router-dom';

import { useEffectOnce } from '@navikt/sif-common-hooks';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { StegId, stegConfig, stegRekkefølge } from './config/stegConfig';
import { useAppStore, useMellomlagring } from './hooks';
import { KvitteringPage } from './pages/KvitteringPage';
import { VelkommenPage } from './pages/VelkommenPage';
import { Oppsummering } from './steg/Oppsummering';
import { Steg1 } from './steg/Steg1';
import { Steg2 } from './steg/Steg2';
import { Mellomlagring } from './types/Mellomlagring';
import { MellomlagringObserver, SøknadIndexRedirect, useSøknadFlyt } from '../rammeverk';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    mellomlagring?: Mellomlagring;
}

const AppMellomlagringObserver = () => {
    const { getData, lagre } = useMellomlagring();
    return <MellomlagringObserver callbacks={{ getData, lagre }} />;
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
                        element={
                            <SøknadIndexRedirect
                                stegConfig={stegConfig}
                                stegRekkefølge={stegRekkefølge}
                                mellomlagretStegId={currentStegId}
                            />
                        }
                    />
                    <Route path={stegConfig[StegId.KONTAKT].route} element={<Steg2 />} />
                    <Route path={stegConfig[StegId.PERSONALIA].route} element={<Steg1 />} />
                    <Route path={stegConfig[StegId.OPPSUMMERING].route} element={<Oppsummering />} />
                </Route>
            </Routes>
        </div>
    );
};
