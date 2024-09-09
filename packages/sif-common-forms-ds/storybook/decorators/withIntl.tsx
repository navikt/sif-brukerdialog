import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { formsMessages } from '../../src/i18n/forms.messages';
import { uiMessages } from '@navikt/sif-common-ui';

export const withIntl = (Story, context) => {
    const locale = context?.parameters?.locale || context?.globals.locale || 'nb';
    const messages = locale === 'nb' ? { ...formsMessages.nb, ...uiMessages.nb } : formsMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages}>
            <Story />
        </IntlProvider>
    );
};
