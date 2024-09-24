import { Route, Routes } from 'react-router-dom';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import { useSøknadContext } from './hooks/useSøknadContext';

const SøknadRouter = () => {
    const { søker } = useSøknadContext();
    const startSøknadHandler = () => {
        console.log('Start søknad');
    };
    return (
        <Routes>
            <Route index element={<VelkommenPage søker={søker} startSøknad={startSøknadHandler} />} />
            <Route path="/velkommen" element={<VelkommenPage søker={søker} startSøknad={startSøknadHandler} />} />
            <Route path="*" element={<>Wha</>} />
        </Routes>
    );
};

export default SøknadRouter;
