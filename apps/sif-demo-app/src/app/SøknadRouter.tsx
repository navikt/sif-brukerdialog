import { Route, Routes } from 'react-router-dom';

import { StegId, stegConfig } from './config/stegConfig';
import { Oppsummering } from './steg/Oppsummering';
import { Steg1 } from './steg/Steg1';
import { Steg2 } from './steg/Steg2';

export const SøknadRouter = () => {
    // const currentStegId = useSøknadFlyt((s) => s.currentStegId);

    return (
        <Routes>
            {/* <Route
                index
                element={
                    <SøknadIndexRedirect
                        stegConfig={stegConfig}
                        stegRekkefølge={stegRekkefølge}
                        mellomlagretStegId={currentStegId}
                    />
                }
            /> */}
            <Route path={stegConfig[StegId.KONTAKT].route} element={<Steg2 />} />
            <Route path={stegConfig[StegId.PERSONALIA].route} element={<Steg1 />} />
            <Route path={stegConfig[StegId.OPPSUMMERING].route} element={<Oppsummering />} />
        </Routes>
    );
};
