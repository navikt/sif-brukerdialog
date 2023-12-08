import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from '../../utils/message';

export interface IntlProviderProps {
    locale: string;
    children: any;
    onError?: (error: any) => void;
}

const StoryIntlProvider: React.FC<IntlProviderProps> = ({ children }: IntlProviderProps) => {
    return (
        <IntlProvider locale="nb" messages={messages.nb}>
            {children}
        </IntlProvider>
    );
};

export default StoryIntlProvider;
