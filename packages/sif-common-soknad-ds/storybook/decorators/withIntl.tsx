import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { soknadMessages } from '../../src/i18n/soknad.messages';

export const withIntl = (Story, context) => {
    const locale = context?.parameters?.locale || context?.globals.locale || 'nb';
    const messages = locale === 'nb' ? soknadMessages.nb : soknadMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages}>
            <Story />
        </IntlProvider>
    );
};
