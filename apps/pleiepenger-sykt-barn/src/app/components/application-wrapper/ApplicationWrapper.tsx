import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import IntlProvider from '../intl-provider/IntlProvider';

interface ApplicationWrapperProps {
    locale: Locale;
    children: React.ReactNode;
    publicPath: any;
    onChangeLocale: (locale: Locale) => void;
}

const ApplicationWrapper = ({ locale, publicPath, children }: ApplicationWrapperProps) => {
    return (
        <IntlProvider locale={locale}>
            <BrowserRouter basename={publicPath}>{children}</BrowserRouter>
        </IntlProvider>
    );
};

export default ApplicationWrapper;
