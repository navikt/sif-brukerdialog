import { Route, Routes } from 'react-router-dom';
import Forside from './form/Forside';

const SøknadRouter = () => {
    return (
        <Routes>
            <Route index element={<Forside />} />
        </Routes>
    );
};

export default SøknadRouter;
