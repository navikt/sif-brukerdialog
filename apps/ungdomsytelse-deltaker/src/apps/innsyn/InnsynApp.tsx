import { Navigate, Route, Routes } from 'react-router-dom';
import ForsidePage from './pages/ForsidePage';
import OppgavePage from './pages/OppgavePage';
import { IntlProvider } from 'react-intl';
import { useEffect } from 'react';
import { applicationIntlMessages } from '../../i18n';
import { getRequiredEnv } from '@navikt/sif-common-env';

const InnsynApp = () => {
    /** Setter bakgrunnsfarge på body */
    useEffect(() => {
        document.body.classList.add('innsynAppBody');
        return () => {
            document.body.classList.remove('innsynAppBody');
        };
    }, [location.pathname]);

    return (
        <div className="innsynApp">
            <IntlProvider messages={applicationIntlMessages.nb} locale="nb">
                <Routes>
                    <Route index path="" element={<ForsidePage />} />
                    <Route path="oppgave" element={<Navigate to="/" replace={true} />} />
                    <Route path="oppgave/:oppgaveReferanse/:kvittering?" element={<OppgavePage />} />
                    <Route path="*" element={<Navigate to={getRequiredEnv('PUBLIC_PATH')} replace={true} />} />
                </Routes>
            </IntlProvider>
        </div>
    );
};

export default InnsynApp;
