import './print.css';

import { uiMessages } from '@navikt/sif-common-ui';
import { IntlProvider } from 'react-intl';

import { applicationIntlMessages } from '../../app/i18n';

export const withIntl = (Story, context) => {
    const locale = context?.parameters?.locale || context?.globals.locale || 'nb';
    const messages =
        locale === 'nb'
            ? { ...applicationIntlMessages.nb, ...uiMessages.nb }
            : { ...applicationIntlMessages.nn, ...uiMessages.nn };

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Story />
        </IntlProvider>
    );
};
