import {
    getBokmålLocale,
    getLocaleFromSessionStorage,
    getNynorskLocale,
    setLocaleInSessionStorage,
} from '@navikt/sif-common-core-ds/src/utils/localeUtils';
import { useState } from 'react';
import { applicationIntlMessages } from '.';
import useDecoratorLanguageSelector from '@navikt/sif-common-soknad-ds/src/hooks/useDecoratorLanguageSelector';
import { Locale } from '@navikt/sif-common-core-ds/src/types';
import { IntlProvider } from 'react-intl';

export const AppIntlMessageProvider = ({ children }) => {
    const [locale, setLocale] = useState<Locale>(getLocaleFromSessionStorage());
    const localeMessages = applicationIntlMessages[locale] || applicationIntlMessages['nb'];
    const locales = []; //Object.keys(applicationIntlMessages) as any;

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
