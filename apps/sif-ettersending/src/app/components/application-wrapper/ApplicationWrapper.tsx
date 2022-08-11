import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useDecoratorLanguageSelector from '@navikt/sif-common-core-ds/lib/hooks/useDecoratorLanguageSelector';
import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { ApplicantData } from '../../types/ApplicantData';
import { Feature, isFeatureEnabled } from '../../utils/featureToggleUtils';
import IntlProvider from '../intl-provider/IntlProvider';

interface ApplicationWrapperProps {
    søkerdata?: ApplicantData;
    children: React.ReactNode;
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const ApplicationWrapper = ({ locale, children, onChangeLocale }: ApplicationWrapperProps) => {
    useDecoratorLanguageSelector(
        ['nb', ...(isFeatureEnabled(Feature.NYNORSK) ? ['nn' as Locale] : [])],
        onChangeLocale
    );

    return (
        <IntlProvider locale={locale}>
            <Router basename={getEnvironmentVariable('PUBLIC_PATH')}>{children}</Router>
        </IntlProvider>
    );
};

export default ApplicationWrapper;
