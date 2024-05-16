import React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { applicationIntlMessages } from '../../i18n';

export interface IntlProviderProps {
    locale: Locale;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const IntlProvider = ({ locale, onError, children }: IntlProviderProps) => {
    return (
        <Provider locale={locale} messages={applicationIntlMessages.nb} onError={onError}>
            {children}
        </Provider>
    );
};

export default IntlProvider;
