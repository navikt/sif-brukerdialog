import { IntlProvider } from 'react-intl';

export interface IntlProviderProps {
    locale: string;
    children: React.ReactNode;
    messages: any;
    onError?: (error: any) => void;
}

const StoryIntlProvider: React.FunctionComponent<IntlProviderProps> = ({
    locale,
    messages = {},
    onError,
    children,
}) => {
    return (
        <IntlProvider locale={locale} messages={messages} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default StoryIntlProvider;
