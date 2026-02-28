import { Route, Routes } from 'react-router-dom';

import { getStegRoute, SøknadIndexRedirect } from '@rammeverk/routing';

import { StegId, stegConfig, stegRekkefølge } from './config/stegConfig';
import { useSøknadsdata } from './hooks';
import { Oppsummering } from './steg/Oppsummering';
import { Steg1 } from './steg/Steg1';
import { Steg2 } from './steg/Steg2';

export const SøknadRouter = () => {
    const { currentStegId } = useSøknadsdata();

    return (
        <Routes>
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
            <Route path={getStegRoute(stegConfig, StegId.PERSONALIA)} element={<Steg1 />} />
            <Route path={getStegRoute(stegConfig, StegId.KONTAKT)} element={<Steg2 />} />
            <Route path={getStegRoute(stegConfig, StegId.OPPSUMMERING)} element={<Oppsummering />} />
        </Routes>
    );
};
