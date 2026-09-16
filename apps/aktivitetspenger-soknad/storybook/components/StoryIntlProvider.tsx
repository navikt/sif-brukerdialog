import { IntlProvider } from 'react-intl';

import { applicationIntlMessages } from '../../src/app/i18n';
import { ReactNode } from 'react';

const StoryIntlProvider = ({ children }: { children: ReactNode }) => {
    const messages = { ...applicationIntlMessages.nb };

    return (
        <IntlProvider locale="nb" messages={messages}>
            {children}
        </IntlProvider>
    );
};

export default StoryIntlProvider;
