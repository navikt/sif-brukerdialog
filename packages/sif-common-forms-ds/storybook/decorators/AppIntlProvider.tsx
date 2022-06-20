import * as React from 'react';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-pluralrules//locale-data/en';
import '@formatjs/intl-pluralrules//locale-data/nb';
import '@formatjs/intl-pluralrules//locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { appMessages } from './messages';
import { BodyLong } from '@navikt/ds-react';
import dayjs from 'dayjs';
require('dayjs/locale/nb');
require('dayjs/locale/nn');
import '@navikt/ds-css';

export interface IntlProviderProps {
    locale: Locale;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const AppIntlProvider = ({ locale, onError, children }: IntlProviderProps) => {
    const messages = locale === 'nb' ? appMessages.nb : appMessages.nn;
    dayjs.locale(locale === 'nb' ? 'nb' : 'nn');
    return (
        <IntlProvider locale={locale} messages={messages} onError={onError}>
            <div style={{ fontSize: '1rem' }}>{children}</div>
        </IntlProvider>
    );
};

export default AppIntlProvider;
