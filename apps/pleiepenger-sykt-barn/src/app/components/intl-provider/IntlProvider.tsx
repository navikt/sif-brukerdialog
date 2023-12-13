import React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import { allCommonMessages } from '@navikt/sif-common-core-ds/src/i18n/allCommonMessages';
import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import bostedMessages from '@navikt/sif-common-forms-ds/lib/forms/bosted-utland/bostedUtlandMessages';
import ferieuttakMessages from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/ferieuttakMessages';
import opptjeningUtlandMessages from '@navikt/sif-common-forms-ds/lib/forms/opptjening-utland/opptjeningUtlandMessages';
import tidsperiodeMessages from '@navikt/sif-common-forms-ds/lib/forms/tidsperiode/tidsperiodeMessages';
import utenlandskNæringMessages from '@navikt/sif-common-forms-ds/lib/forms/utenlandsk-næring/utenlandskNæringMessages';
import utenlandsoppholdMessages from '@navikt/sif-common-forms-ds/lib/forms/utenlandsopphold/utenlandsoppholdMessages';
import virksomhetMessages from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/virksomhetMessages';
import omsorgstilbudMessages from '../../i18n/omsorgstilbudMessages';
import { sifCommonPleiepengerMessages } from '../../local-sif-common-pleiepenger/i18n';
import { velkommenPageMessages } from '../../pages/welcoming-page/velkommenPageMessages';

export const appBokmålstekster = require('../../i18n/nb.json');

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...bostedMessages.nb,
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
