import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ForsidePage from './pages/ForsidePage';
import OppgavePage from './pages/OppgavePage';
import { IntlProvider } from 'react-intl';
import { useEffect } from 'react';
import { applicationIntlMessages } from '../../i18n';
import { useDeltakerContext } from '../../hooks/useDeltakerContext';
import { Theme } from '@navikt/ds-react';
import { AppRoutes } from '../../utils/AppRoutes';

const InnsynApp = () => {
    const navigate = useNavigate();
    const { deltakelsePeriode } = useDeltakerContext();

    /** Setter bakgrunnsfarge på body */
    useEffect(() => {
        document.body.classList.add('innsynAppBody');
        return () => {
            document.body.classList.remove('innsynAppBody');
        };
    }, [location.pathname]);

    useEffect(() => {
        if (deltakelsePeriode.søktTidspunkt === undefined) {
            navigate(AppRoutes.soknad);
        }
    }, []);

    return (
        <Theme hasBackground={false}>
            <div className="innsynApp">
                <IntlProvider messages={applicationIntlMessages.nb} locale="nb">
                    <Routes>
                        <Route index path="" element={<ForsidePage />} />
                        <Route path="oppgave" element={<Navigate to="/" replace={true} />} />
                        <Route path="oppgave/:oppgaveReferanse/:kvittering?" element={<OppgavePage />} />
                        {/* <Route path="*" element={<Navigate to="/" replace={true} />} /> */}
                    </Routes>
                </IntlProvider>
            </div>
        </Theme>
    );
};

export default InnsynApp;
