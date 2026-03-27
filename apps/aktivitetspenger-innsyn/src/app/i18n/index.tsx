import { uiMessages } from '@navikt/sif-common-ui';
import { typedIntlHelper } from '@navikt/sif-common-utils';
import { ungUiMessages } from '@sif/ung-innsyn/i18n';
import { FormattedMessage, useIntl } from 'react-intl';

import { appMessages_nb } from './nb/appMessages';

const libMessages = {
    nb: {
        ...ungUiMessages.nb,
        ...uiMessages.nb,
    },
};

const nb = {
    ...libMessages.nb,
    ...appMessages_nb,
};

export type AppMessageKeys = keyof typeof nb;

const nn: Record<AppMessageKeys, string> = {
    ...nb,
};

export const useAppIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<AppMessageKeys>(intl);
};

export type AppIntlShape = ReturnType<typeof useAppIntl>;

interface AppTextProps {
    id: AppMessageKeys;
    values?: any;
}

export const AppText = (props: AppTextProps) => {
    return <FormattedMessage {...props} />;
};

export const applicationIntlMessages = {
    nb,
    nn,
};
