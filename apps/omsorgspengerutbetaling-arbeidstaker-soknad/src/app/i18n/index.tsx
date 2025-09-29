import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    annetBarnMessages,
    bostedUtlandMessages,
    fraværMessages,
    medlemskapFormMessages,
} from '@navikt/sif-common-forms-ds';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { FormattedMessage, useIntl } from 'react-intl';

import { appMessages_nb } from './nb';
import { appMessages_nn } from './nn';

const libMessages = {
    nb: {
        ...commonMessages.nb,
        ...uiMessages.nb,
        ...soknadMessages.nb,
        ...annetBarnMessages.nb,
        ...fraværMessages.nb,
        ...bostedUtlandMessages.nb,
        ...medlemskapFormMessages.nb,
    },
    nn: {
        ...commonMessages.nn,
        ...uiMessages.nn,
        ...soknadMessages.nn,
        ...annetBarnMessages.nn,
        ...fraværMessages.nn,
        ...bostedUtlandMessages.nn,
        ...medlemskapFormMessages.nn,
    },
};

export const appMessages = {
    nb: appMessages_nb,
    nn: appMessages_nn,
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
