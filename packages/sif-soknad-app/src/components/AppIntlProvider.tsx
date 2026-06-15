import { Locale } from '@navikt/sif-common-utils';
import { useState } from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';

import useDecoratorLanguageSelector from '../hooks/useDecoratorLanguageSelector';
import { decoratorLocaleUtils } from '../utils/decoratorLocaleUtils';

interface Props {
    config?: AppIntlConfig;
    children: React.ReactNode;
}

export interface IntlMessageObjectFormat {
    [locale: string]: Record<string, string> | Record<string, MessageFormatElement[]>;
}

export type AppIntlConfig = {
    intlMessages: IntlMessageObjectFormat;
    useLanguageSelector?: boolean;
};

export const AppIntlProvider = ({ config, children }: Props) => {
    if (!config) {
        return <>{children}</>;
    }

    const { intlMessages, useLanguageSelector = true } = config;
    const [locale, setLocale] = useState<Locale>(() => decoratorLocaleUtils.getLocaleFromSessionStorage());
    const localeMessages = intlMessages[locale] || intlMessages['nb'];
    const locales = useLanguageSelector ? (Object.keys(intlMessages) as Locale[]) : [];

    useDecoratorLanguageSelector(locales, (decoratorLocale: Locale) => {
        decoratorLocaleUtils.setLocaleInSessionStorage(decoratorLocale);
        setLocale(decoratorLocale);
    });

    return (
        <IntlProvider locale={locale} messages={localeMessages}>
            {children}
        </IntlProvider>
    );
};
