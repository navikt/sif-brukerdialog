import * as React from 'react';
import { IntlProvider } from 'react-intl';
import soknadIntlMessages from '../../src/i18n/soknadIntlMessages';

export const withIntl = (Story, context) => {
    const locale = context?.parameters?.locale || context?.globals.locale || 'nb';
    const messages = locale === 'nb' ? soknadIntlMessages.nb : soknadIntlMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages}>
            <Story />
        </IntlProvider>
    );
};
