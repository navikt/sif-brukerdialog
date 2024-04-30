import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { applicationIntlMessages } from '../../app/i18n';

export interface IntlProviderProps {
    locale: string;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const StoryIntlProvider: React.FunctionComponent<IntlProviderProps> = ({ onError, children }) => {
    return (
        <IntlProvider locale={'no-NB'} messages={applicationIntlMessages.nb} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default StoryIntlProvider;
