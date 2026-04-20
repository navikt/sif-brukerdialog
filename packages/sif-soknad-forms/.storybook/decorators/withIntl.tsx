import type { Decorator } from '@storybook/react-vite';
import { IntlProvider } from 'react-intl';

import { sifSoknadFormsMessages } from '../../src/i18n';

export const withIntl: Decorator = (Story, context) => {
    const locale = context.globals.locale === 'nn' ? 'nn' : 'nb';

    return (
        <IntlProvider locale={locale} messages={sifSoknadFormsMessages[locale]}>
            <Story />
        </IntlProvider>
    );
};
