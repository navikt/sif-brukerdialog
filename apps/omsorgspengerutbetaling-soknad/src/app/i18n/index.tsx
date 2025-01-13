import { FormattedMessage, useIntl } from 'react-intl';
import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    annetBarnMessages,
    bostedUtlandMessages,
    medlemskapFormMessages,
    virksomhetMessages,
} from '@navikt/sif-common-forms-ds';
import { fraværMessages } from '@navikt/sif-common-forms-ds/src/forms/fravær/fraværMessages';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { appMessages } from './appMessages';

export const libMessages = {
    nb: {
        ...commonMessages.nb,
        ...uiMessages.nb,
        ...soknadMessages.nb,
        ...annetBarnMessages.nb,
        ...bostedUtlandMessages.nb,
        ...fraværMessages.nb,
        ...virksomhetMessages.nb,
        ...medlemskapFormMessages.nb,
        ...uiMessages.nb,
    },
    nn: {
        ...commonMessages.nn,
        ...uiMessages.nn,
        ...soknadMessages.nn,
        ...annetBarnMessages.nn,
        ...bostedUtlandMessages.nn,
        ...fraværMessages.nn,
        ...virksomhetMessages.nn,
        ...medlemskapFormMessages.nn,
        ...uiMessages.nn,
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
