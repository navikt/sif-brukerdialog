import { Theme } from '@navikt/ds-react';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useDeltakerContext } from '../../hooks/useDeltakerContext';
import { applicationIntlMessages } from '../../i18n';
import { AppRoutes } from '../../utils/AppRoutes';
import InnsynRouter from './InnsynRouter';

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
                    <InnsynRouter />
                </IntlProvider>
            </div>
        </Theme>
    );
};

export default InnsynApp;
