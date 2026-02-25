import { IntlProvider } from 'react-intl';

import { applicationIntlMessages } from '../../src/i18n';

const StoryIntlProvider = ({ children }: { children: React.ReactNode }) => {
    const locale = 'nb'; //context?.parameters?.locale || context?.globals.locale || 'nb';
    const messages = locale === 'nb' ? { ...applicationIntlMessages.nb } : { ...applicationIntlMessages.nn };

    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
};

export default StoryIntlProvider;
