import { applicationIntlMessages } from '@app/i18n';
import { IntlProvider } from 'react-intl';

export interface IntlProviderProps {
    locale: string;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const StoryIntlProvider = ({ onError, children }: IntlProviderProps) => {
    return (
        <IntlProvider locale="no-NB" messages={applicationIntlMessages.nb} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default StoryIntlProvider;
