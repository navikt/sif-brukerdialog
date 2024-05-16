import { FormattedMessage, useIntl } from 'react-intl';
import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    bostedUtlandMessages,
    ferieuttakMessages,
    opptjeningUtlandMessages,
    tidsperiodeMessages,
    utenlandskNæringMessages,
    utenlandsoppholdMessages,
    virksomhetMessages,
} from '@navikt/sif-common-forms-ds';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { appMessages } from './appMessages';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/src/atoms/formatted-html-message/FormattedHtmlMessage';

const libMessages = {
    nb: {
        ...commonMessages.nb,
        ...uiMessages.nb,
        ...soknadMessages.nb,
        ...bostedUtlandMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...bostedUtlandMessages.nb,
        ...virksomhetMessages.nb,
        ...tidsperiodeMessages.nb,
        ...ferieuttakMessages.nb,
        ...opptjeningUtlandMessages.nb,
        ...utenlandskNæringMessages.nb,
    },
    nn: {
        ...commonMessages.nn,
        ...uiMessages.nn,
        ...soknadMessages.nn,
        ...bostedUtlandMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...bostedUtlandMessages.nn,
        ...virksomhetMessages.nn,
        ...tidsperiodeMessages.nn,
        ...ferieuttakMessages.nn,
        ...opptjeningUtlandMessages.nn,
        ...utenlandskNæringMessages.nn,
    },
};

const nb = {
    ...libMessages.nb,
    ...appMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
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
export const AppHtml = (props: { id: AppMessageKeys; values?: any }) => {
    return <FormattedHtmlMessage {...props} />;
};

export const applicationIntlMessages = {
    nb,
    nn,
};
