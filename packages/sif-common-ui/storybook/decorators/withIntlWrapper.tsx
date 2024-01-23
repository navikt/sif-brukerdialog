import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { uiMessages } from '../../src/i18n/ui.messages';

export const withIntlWrapper = (Story, context) => {
    const locale = context?.parameters?.locale || context?.globals.locale || 'nb';
    const messages = locale === 'nb' ? uiMessages.nb : uiMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages}>
            <Story />
        </IntlProvider>
    );
};
