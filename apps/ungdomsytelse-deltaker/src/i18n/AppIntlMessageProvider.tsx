import { decoratorLocaleUtils } from '@sif/soknad-ui';
import useDecoratorLanguageSelector from '@navikt/sif-common-soknad-ds/src/hooks/useDecoratorLanguageSelector';
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
