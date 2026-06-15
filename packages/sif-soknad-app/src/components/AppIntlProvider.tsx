import { Locale } from '@navikt/sif-common-utils';
import { ReactNode, useState } from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';

import useDecoratorLanguageSelector from '../hooks/useDecoratorLanguageSelector';
import { decoratorLocaleUtils } from '../utils/decoratorLocaleUtils';

interface Props {
    config?: AppIntlConfig;
    children: ReactNode;
}

export interface IntlMessageObjectFormat {
    [locale: string]: Record<string, string> | Record<string, MessageFormatElement[]>;
}

export type AppIntlConfig = {
    intlMessages: IntlMessageObjectFormat;
    useLanguageSelector?: boolean;
};

const Renderer = (props: Omit<Props, 'config'> & { config: AppIntlConfig }) => {
    const { config, children } = props;
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

export const AppIntlProvider = (props: Props) => {
    if (!props.config) {
        return <>{props.children}</>;
    }
    return <Renderer config={props.config} children={props.children} />;
};
