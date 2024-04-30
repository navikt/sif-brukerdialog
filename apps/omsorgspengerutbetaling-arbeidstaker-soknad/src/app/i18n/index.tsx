import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { bostedUtlandMessages } from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/bostedUtlandMessages';
import { fosterbarnMessages } from '@navikt/sif-common-forms-ds/src/forms/fosterbarn/fosterbarnMessages';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { appMessages } from './appMessages';
import { FormattedMessage, useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

export const libMessages = {
    nb: {
        ...commonMessages.nb,
        ...uiMessages.nb,
        ...soknadMessages.nb,
        ...fosterbarnMessages.nb,
        ...bostedUtlandMessages.nb,
        ...appMessages.nb,
    },
    nn: {
        ...commonMessages.nn,
        ...uiMessages.nn,
        ...soknadMessages.nn,
        ...fosterbarnMessages.nn,
        ...bostedUtlandMessages.nn,
        ...appMessages.nn,
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

export const applicationIntlMessages = {
    nb,
    nn,
};
