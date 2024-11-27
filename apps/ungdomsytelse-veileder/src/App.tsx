import { Tabs } from '@navikt/ds-react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Versjon0 from './versjoner/versjon-0/Versjon0';
import DeltakerPage from './versjoner/versjon-1/pages/deltaker-page/DeltakerPage';
import StartPage from './versjoner/versjon-1/pages/start-page/StartPage';
import Versjon1 from './versjoner/versjon-1/Versjon1';
import './app.css';

const App = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const value = pathname.includes('v1') ? 'v1' : 'v0';
    return (
        <>
            <Tabs defaultValue={value} onChange={(value) => navigate(`/${value}`)}>
                <Tabs.List>
                    <Tabs.Tab value="v0" label="V0" />
                    <Tabs.Tab value="v1" label="V1" />
                </Tabs.List>
            </Tabs>
            <Routes>
                <Route index element={<Versjon0 />} />
                <Route path="v0" element={<Versjon0 />} />
                <Route path="v1" element={<Versjon1 />}>
                    <Route path="" element={<StartPage />}></Route>
                    <Route path="deltaker/:deltakerId" element={<DeltakerPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
