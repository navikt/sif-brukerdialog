import { sifSoknadUiMessages } from '@sif/soknad-ui/i18n';
import { IntlProvider } from 'react-intl';

import { sifSoknadFormsMessages } from '../src/i18n';

export const withIntl = (Story, context) => {
    const locale = context.globals.locale || 'nb';

    return (
        <IntlProvider locale={locale} messages={{ ...sifSoknadUiMessages[locale], ...sifSoknadFormsMessages[locale] }}>
            <Story />
        </IntlProvider>
    );
};