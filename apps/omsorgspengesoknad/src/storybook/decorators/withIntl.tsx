import { IntlProvider } from 'react-intl';
import { applicationIntlMessages } from '../../app/i18n';
import { uiMessages } from '@navikt/sif-common-ui';
import './print.css';

export const withIntl = (Story, context) => {
    const locale = context?.parameters?.locale || context?.globals.locale || 'nb';
    const messages =
        locale === 'nb'
            ? { ...applicationIntlMessages.nb, ...uiMessages.nb }
            : { ...applicationIntlMessages.nn, ...uiMessages.nn };
    console.log(messages);

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Story />
        </IntlProvider>
    );
};
