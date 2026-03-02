import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { StegId, stegConfig, stegRekkefølge } from './config/stegConfig';
import { useAppStore } from './hooks';
import { KvitteringPage } from './pages/KvitteringPage';
import { VelkommenPage } from './pages/VelkommenPage';
import { Oppsummering } from './steg/Oppsummering';
import { Steg1 } from './steg/Steg1';
import { Steg2 } from './steg/Steg2';
import { Søknadsdata } from './types/Søknadsdata';
import { SøknadIndexRedirect, useSøknadFlyt } from '../rammeverk';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[];
    mellomlagretSøknadsdata?: Søknadsdata;
}

export const Søknad = ({ søker, barn, mellomlagretSøknadsdata }: Props) => {
    const init = useAppStore((s) => s.init);
    const currentStegId = useSøknadFlyt((s) => s.currentStegId);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!hasInitialized.current) {
            init(søker, barn, mellomlagretSøknadsdata);
            hasInitialized.current = true;
        }
    }, [søker, barn, mellomlagretSøknadsdata, init]);

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
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
