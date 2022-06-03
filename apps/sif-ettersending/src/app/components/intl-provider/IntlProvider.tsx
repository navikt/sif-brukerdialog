import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { allCommonMessages } from '@navikt/sif-common-core/lib/i18n/allCommonMessages';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { getBokmålLocale, getNynorskLocale } from '@navikt/sif-common-core/lib/utils/localeUtils';

const appBokmålstekster = require('../../i18n/nb.json');
const appNynorsktekster = require('../../i18n/nn.json');

export const appMessages = {
    nb: appBokmålstekster,
    nn: appNynorsktekster,
};

const bokmålstekster = { ...appBokmålstekster, ...allCommonMessages.nb };
const nynorsktekster = { ...appNynorsktekster, ...allCommonMessages.nn };

export interface IntlProviderProps {
    locale: Locale;
    onError?: (err: any) => void;
    children?: React.ReactNode;
}

const IntlProvider = ({ locale, children, onError }: IntlProviderProps) => {
    const messages = locale === 'nb' ? bokmålstekster : nynorsktekster;
    const localeToUse = locale === 'nb' ? getBokmålLocale() : getNynorskLocale();
    return (
        <Provider locale={localeToUse} messages={messages} onError={onError}>
            {children}
        </Provider>
    );
};

export default IntlProvider;
