import { FormattedMessage, useIntl } from 'react-intl';
import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    bostedUtlandMessages,
    enkeltdatoMessages,
    ferieuttakMessages,
    medlemskapFormMessages,
    opptjeningUtlandMessages,
    utenlandskNæringMessages,
    utenlandsoppholdMessages,
    virksomhetMessages,
} from '@navikt/sif-common-forms-ds';
import { velgBarnFormPart_nb } from '@navikt/sif-common-forms-ds/src/form-parts/velg-barn-form-part/i18n/nb';
import { velgBarnFormPart_nn } from '@navikt/sif-common-forms-ds/src/form-parts/velg-barn-form-part/i18n/nn';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { appMessages } from './appMessages';

export const libMessages = {
    nb: {
        ...bostedUtlandMessages.nb,
        ...commonMessages.nb,
        ...enkeltdatoMessages.nb,
        ...ferieuttakMessages.nb,
        ...medlemskapFormMessages.nb,
        ...opptjeningUtlandMessages.nb,
        ...soknadMessages.nb,
        ...uiMessages.nb,
        ...utenlandskNæringMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...virksomhetMessages.nb,
        ...velgBarnFormPart_nb,
    },
    nn: {
        ...bostedUtlandMessages.nn,
        ...commonMessages.nn,
        ...enkeltdatoMessages.nn,
        ...ferieuttakMessages.nn,
        ...medlemskapFormMessages.nn,
        ...opptjeningUtlandMessages.nn,
        ...soknadMessages.nn,
        ...uiMessages.nn,
        ...utenlandskNæringMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...virksomhetMessages.nn,
        ...velgBarnFormPart_nn,
    },
};

const nb = {
    ...libMessages.nb,
    ...appMessages.nb,
};

const nn: Record<keyof typeof nb, string> = { ...libMessages.nn, ...appMessages.nn };

export type AppMessageKeys = keyof typeof nb;

export const useAppIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<AppMessageKeys>(intl);
};

export type AppIntlShape = ReturnType<typeof useAppIntl>;

export const AppText = (props: { id: AppMessageKeys; values?: any }) => {
    return <FormattedMessage {...props} />;
};

export const applicationIntlMessages = {
    nb,
    nn,
};
