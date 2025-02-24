import { FormattedMessage, useIntl } from 'react-intl';
import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    bostedUtlandMessages,
    ferieuttakMessages,
    medlemskapFormMessages,
    opptjeningUtlandMessages,
    tidsperiodeMessages,
    utenlandskNæringMessages,
    utenlandsoppholdMessages,
    virksomhetMessages,
} from '@navikt/sif-common-forms-ds';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { appMessages } from './appMessages';

const libMessages = {
    nb: {
        ...bostedUtlandMessages.nb,
        ...bostedUtlandMessages.nb,
        ...commonMessages.nb,
        ...ferieuttakMessages.nb,
        ...medlemskapFormMessages.nb,
        ...opptjeningUtlandMessages.nb,
        ...soknadMessages.nb,
        ...tidsperiodeMessages.nb,
        ...uiMessages.nb,
        ...utenlandskNæringMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...virksomhetMessages.nb,
    },
    nn: {
        ...bostedUtlandMessages.nn,
        ...bostedUtlandMessages.nn,
        ...commonMessages.nn,
        ...ferieuttakMessages.nn,
        ...medlemskapFormMessages.nn,
        ...opptjeningUtlandMessages.nn,
        ...soknadMessages.nn,
        ...tidsperiodeMessages.nn,
        ...uiMessages.nn,
        ...utenlandskNæringMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...virksomhetMessages.nn,
    },
};

const nb = {
    ...libMessages.nb,
    ...appMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...libMessages.nn,
    ...appMessages.nn,
};

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
