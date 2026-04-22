import { IntlProvider } from 'react-intl';

import { sifSoknadFormsMessages } from '../src/i18n';

export const withIntl = (Story, context) => {
    const locale = context.globals.locale || 'nb';

    return (
        <IntlProvider locale={locale} messages={sifSoknadFormsMessages[locale]}>
            <Story />
        </IntlProvider>
    );
};