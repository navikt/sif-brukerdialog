import { Locale } from '@navikt/sif-common-core-ds/src/types';
import {
    getBokmålLocale,
    getLocaleFromSessionStorage,
    getNynorskLocale,
    setLocaleInSessionStorage,
} from '@navikt/sif-common-core-ds/src/utils/localeUtils';
import useDecoratorLanguageSelector from '@navikt/sif-common-soknad-ds/src/hooks/useDecoratorLanguageSelector';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { applicationIntlMessages } from './';

export const AppIntlMessageProvider = ({ children }) => {
    const [locale, setLocale] = useState<Locale>(getLocaleFromSessionStorage());
    const localeMessages = applicationIntlMessages[locale] || applicationIntlMessages['nb'];
    const locales = [];

    useDecoratorLanguageSelector(locales, (decoratorLocale: any) => {
        setLocaleInSessionStorage(decoratorLocale);
        setLocale(decoratorLocale);
    });

    return (
        <IntlProvider locale={locale === 'nb' ? getBokmålLocale() : getNynorskLocale()} messages={localeMessages}>
            {children}
        </IntlProvider>
    );
};
