import { decoratorLocaleUtils, useDecoratorLanguageSelector } from '@sif/soknad-ui';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { applicationIntlMessages } from '.';
import { Locale } from '@navikt/sif-common-utils';

const { getLocaleFromSessionStorage, setLocaleInSessionStorage, getBokmålLocale, getNynorskLocale } =
    decoratorLocaleUtils;

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
