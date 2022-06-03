import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LanguageToggle from '@navikt/sif-common-core/lib/components/language-toggle/LanguageToggle';
import ApplicationMessages from '@navikt/sif-common-core/lib/dev-utils/intl/application-messages/ApplicationMessages';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { ApplicantData } from '../../types/ApplicantData';
import { getEnvironmentVariable } from '../../utils/envUtils';
import { Feature, isFeatureEnabled } from '../../utils/featureToggleUtils';
import IntlProvider, { appMessages } from '../intl-provider/IntlProvider';

interface ApplicationWrapperProps {
    søkerdata?: ApplicantData;
    children: React.ReactNode;
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const ApplicationWrapper = ({ locale, children, onChangeLocale }: ApplicationWrapperProps) => {
    return (
        <IntlProvider locale={locale}>
            {isFeatureEnabled(Feature.NYNORSK) && <LanguageToggle locale={locale} toggle={onChangeLocale} />}
            <Router basename={getEnvironmentVariable('PUBLIC_PATH')}>
                {children}
                <ApplicationMessages messages={appMessages} title="Ettersending av dokumenter" />
            </Router>
        </IntlProvider>
    );
};

export default ApplicationWrapper;
