import { Navigate, Route, Routes } from 'react-router-dom';
import ForsidePage from './pages/ForsidePage';
import OppgavePage from './pages/OppgavePage';
import { IntlProvider } from 'react-intl';
import { innsynAppMessages } from './i18n';

const InnsynApp = () => {
    return (
        <div className="innsynApp">
            <IntlProvider messages={innsynAppMessages.nb} locale="nb">
                <Routes>
                    <Route index path="" element={<ForsidePage />} />
                    <Route path="oppgave" element={<Navigate to="/" replace={true} />} />
                    <Route path="oppgave/:oppgaveReferanse/:kvittering?" element={<OppgavePage />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            </IntlProvider>
        </div>
    );
};

export default InnsynApp;
