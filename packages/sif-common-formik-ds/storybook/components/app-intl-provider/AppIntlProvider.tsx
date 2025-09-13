import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { appMessages } from './messages';

export interface IntlProviderProps {
    locale: string;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const allMessages = {
    nb: {
        ...appMessages.nb,
    },
    nn: {
        ...appMessages.nn,
    },
};

const AppIntlProvider = ({ locale, onError, children }: IntlProviderProps) => {
    const messages = locale === 'nb' ? allMessages.nb : allMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default AppIntlProvider;
