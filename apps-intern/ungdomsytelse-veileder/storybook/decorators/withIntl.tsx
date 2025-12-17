import { IntlProvider } from 'react-intl';
import { uiMessages } from '@navikt/sif-common-ui';
import { appMessages } from '../../src/i18n';
import './print.css';

export const withIntl = (Story, context) => {
    const locale = context?.parameters?.locale || context?.globals.locale || 'nb';
    const messages =
        locale === 'nb' ? { ...appMessages.nb, ...uiMessages.nb } : { ...appMessages.nn, ...uiMessages.nn };

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Story />
        </IntlProvider>
    );
};
