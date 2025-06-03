import { IntlProvider } from 'react-intl';
import { uiMessages } from '@navikt/sif-common-ui';
import { applicationIntlMessages } from '../../src/i18n';
import './print.css';

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
