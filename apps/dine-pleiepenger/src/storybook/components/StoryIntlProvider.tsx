import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from '../../utils/message';

export interface IntlProviderProps {
    locale: string;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const StoryIntlProvider: React.FunctionComponent<IntlProviderProps> = ({ children }) => {
    return (
        <IntlProvider locale="nb" messages={messages.nb}>
            {children}
        </IntlProvider>
    );
};

export default StoryIntlProvider;
