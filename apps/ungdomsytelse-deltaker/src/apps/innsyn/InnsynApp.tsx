import { Theme } from '@navikt/ds-react';
import { UngdomsytelseDeltakerApp } from '@navikt/sif-app-register';
import { EnvKey } from '@navikt/sif-common-env';
import { useDeltakerContext } from '@shared/hooks/useDeltakerContext';
import { applicationIntlMessages } from '@shared/i18n';
import { getAppEnv } from '@shared/utils/appEnv';
import { AppRoutes } from '@shared/utils/AppRoutes';
import { AnalyticsProvider } from '@sif/analytics';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useNavigate } from 'react-router-dom';

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
                    {/* v2-analytics for @sif/ung-innsyn (oppgavelogging) */}
                    <AnalyticsProvider
                        applicationKey={UngdomsytelseDeltakerApp.key}
                        isActive={getAppEnv()[EnvKey.SIF_PUBLIC_USE_ANALYTICS] === 'true'}>
                        <InnsynRouter />
                    </AnalyticsProvider>
                </IntlProvider>
            </div>
        </Theme>
    );
};

export default InnsynApp;
