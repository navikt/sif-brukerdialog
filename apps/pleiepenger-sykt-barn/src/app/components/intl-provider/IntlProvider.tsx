import React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import {
    bostedUtlandMessages,
    ferieuttakMessages,
    opptjeningUtlandMessages,
    tidsperiodeMessages,
} from '@navikt/sif-common-forms-ds';
import utenlandskNæringMessages from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/utenlandskNæringMessages';
import utenlandsoppholdMessages from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/utenlandsoppholdMessages';
import virksomhetMessages from '@navikt/sif-common-forms-ds/src/forms/virksomhet/virksomhetMessages';
import { uiMessages } from '@navikt/sif-common-ui';
import omsorgstilbudMessages from '../../i18n/omsorgstilbudMessages';
import { sifCommonPleiepengerMessages } from '../../local-sif-common-pleiepenger/i18n';
import { velkommenPageMessages } from '../../pages/welcoming-page/velkommenPageMessages';

export const appBokmålstekster = require('../../i18n/nb.json');

const bokmålstekster = {
    ...commonMessages.nb,
    ...uiMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...bostedUtlandMessages.nb,
    ...virksomhetMessages.nb,
    ...tidsperiodeMessages.nb,
    ...ferieuttakMessages.nb,
    ...omsorgstilbudMessages.nb,
    ...sifCommonPleiepengerMessages.nb,
    ...opptjeningUtlandMessages.nb,
    ...utenlandskNæringMessages.nb,
    ...appBokmålstekster,
    ...velkommenPageMessages.nb,
};

export interface IntlProviderProps {
    locale: Locale;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const IntlProvider = ({ locale, onError, children }: IntlProviderProps) => {
    return (
        <Provider locale={locale} messages={bokmålstekster} onError={onError}>
            {children}
        </Provider>
    );
};

export default IntlProvider;
