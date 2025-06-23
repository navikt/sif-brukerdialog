import * as React from 'react';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-pluralrules//locale-data/en';
import '@formatjs/intl-pluralrules//locale-data/nb';
import '@formatjs/intl-pluralrules//locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/nn';
import { formsMessages } from '../../src/i18n/forms.messages';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';

export interface IntlProviderProps {
    locale: Locale;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const AppIntlProvider = ({ locale, onError, children }: IntlProviderProps) => {
    const messages = locale === 'nb' ? formsMessages.nb : formsMessages.nn;
    dayjs.locale(locale === 'nb' ? 'nb' : 'nn');
    React.useEffect(() => {
        window.document.body.className = window.document.body.className + ' sif-ds-theme';
    });

    return (
        <div id="dialog-wrapper" className="sif-ds-theme">
            <IntlProvider locale={locale} messages={messages} onError={onError}>
                <div style={{ fontSize: '1rem' }}>{children}</div>
            </IntlProvider>
        </div>
    );
};

export default AppIntlProvider;
