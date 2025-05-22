import { IntlProvider } from 'react-intl';
import { uiMessages } from '@navikt/sif-common-ui';
import { applicationIntlMessages } from '../../src/i18n';
import './print.css';
import { innsynAppMessages } from '../../src/apps/innsyn/i18n';

export const withIntl = (Story, context) => {
    const locale = context?.parameters?.locale || context?.globals.locale || 'nb';
    const messages =
        locale === 'nb'
            ? { ...applicationIntlMessages.nb, ...innsynAppMessages.nb, ...uiMessages.nb }
            : { ...applicationIntlMessages.nn, ...innsynAppMessages.nb, ...uiMessages.nn };

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Story />
        </IntlProvider>
    );
};
