import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { applicationIntlMessages } from '../../app/i18n';

export interface IntlProviderProps {
    locale: string;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const allMessages = {
    nb: {
        ...applicationIntlMessages.nb,
    },
    nn: {
        ...applicationIntlMessages.nn,
    },
};

const StoryIntlProvider: React.FunctionComponent<IntlProviderProps> = ({ locale, onError, children }) => {
    const messages = locale === 'nb' ? allMessages.nb : allMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default StoryIntlProvider;
