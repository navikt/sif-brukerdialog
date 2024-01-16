import * as React from 'react';
import { IntlProvider } from 'react-intl';
import soknadIntlMessages from '../../../../src/i18n/soknadIntlMessages';

export interface IntlProviderProps {
    locale: string;
    children?: React.ReactNode;
    onError?: (error: any) => void;
}

const AppIntlProvider: React.FunctionComponent<IntlProviderProps> = ({ locale, onError, children }) => {
    const messages = locale === 'nb' ? soknadIntlMessages.nb : soknadIntlMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default AppIntlProvider;
