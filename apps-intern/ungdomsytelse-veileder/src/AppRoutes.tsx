import { Navigate, Route, Routes } from 'react-router-dom';
import DeltakerPage from './pages/deltaker-page/DeltakerPage';
import InfoPage from './pages/info-page/InfoPage';
import NotFoundPage from './pages/page-not-found/PageNotFound';
import StartPage from './pages/start-page/StartPage';

const AppRoutes = () => (
    <Routes>
        <Route path="" element={<StartPage />} />
        <Route path="deltaker/" element={<Navigate to="/" />} />
        <Route path="deltaker/:deltakerId" element={<DeltakerPage />} />
        <Route path="informasjon/*" element={<InfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
);

export default AppRoutes;
