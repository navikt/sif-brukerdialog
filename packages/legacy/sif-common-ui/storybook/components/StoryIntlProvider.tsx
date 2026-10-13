import { IntlProvider } from 'react-intl';

export interface IntlProviderProps {
    locale: string;
    children: React.ReactNode;
    messages: any;
    onError?: (error: any) => void;
}

const StoryIntlProvider = ({ locale, messages = {}, onError, children }: IntlProviderProps) => {
    return (
        <IntlProvider locale={locale} messages={messages} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default StoryIntlProvider;
