import * as React from 'react';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-pluralrules//locale-data/en';
import '@formatjs/intl-pluralrules//locale-data/nb';
import '@formatjs/intl-pluralrules//locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import dayjs from 'dayjs';
import { appMessages } from './messages';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';

import 'dayjs/locale/nb';
import 'dayjs/locale/nn';
export interface IntlProviderProps {
    locale: Locale;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const AppIntlProvider = ({ locale, onError, children }: IntlProviderProps) => {
    const messages = locale === 'nb' ? appMessages.nb : appMessages.nn;
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
