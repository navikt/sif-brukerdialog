import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import {
    bostedUtlandMessages,
    opptjeningUtlandMessages,
    utenlandskNæringMessages,
    utenlandsoppholdMessages,
    virksomhetMessages,
} from '@navikt/sif-common-forms-ds';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { appMessages } from './appMessages';

export const libMessages = {
    nb: {
        ...commonMessages.nb,
        ...uiMessages.nb,
        ...soknadMessages.nb,
        ...bostedUtlandMessages.nb,
        ...opptjeningUtlandMessages.nb,
        ...utenlandskNæringMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...virksomhetMessages.nb,
    },
    nn: {
        ...commonMessages.nn,
        ...uiMessages.nn,
        ...soknadMessages.nn,
        ...bostedUtlandMessages.nn,
        ...opptjeningUtlandMessages.nn,
        ...utenlandskNæringMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...virksomhetMessages.nn,
    },
};

const nb = {
    ...libMessages.nb,
    ...appMessages.nb,
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const applicationIntlMessages = {
    nb,
    nn,
};
