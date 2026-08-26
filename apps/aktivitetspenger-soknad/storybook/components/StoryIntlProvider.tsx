import { IntlProvider } from 'react-intl';

import { applicationIntlMessages } from '../../src/app/i18n';

const StoryIntlProvider = ({ children }: { children: React.ReactNode }) => {
    const messages = { ...applicationIntlMessages.nb };

    return (
        <IntlProvider locale="nb" messages={messages}>
            {children}
        </IntlProvider>
    );
};

export default StoryIntlProvider;
