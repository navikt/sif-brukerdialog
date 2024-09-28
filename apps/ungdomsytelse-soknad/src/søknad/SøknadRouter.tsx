import { Route, Routes } from 'react-router-dom';
import MVPFormPage from './form/MVPFormPage';

const SøknadRouter = () => {
    // const { søker } = useSøknadContext();

    // const startSøknadHandler = () => {
    //     console.log('Start søknad');
    // };

    return (
        <Routes>
            <Route index element={<MVPFormPage />} />
            {/* <Route index element={<VelkommenPage søker={søker} startSøknad={startSøknadHandler} />} />
            <Route path="/velkommen" element={<VelkommenPage søker={søker} startSøknad={startSøknadHandler} />} />
            <Route path="/info" element={<InfoStep />} />
            <Route path="/oppsummering" element={<OppsummeringStep />} />
            <Route path="*" element={<>Wha</>} /> */}
        </Routes>
    );
};

export default SøknadRouter;
