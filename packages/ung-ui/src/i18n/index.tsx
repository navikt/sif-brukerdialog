import { typedIntlHelper } from '@navikt/sif-common-utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { ungUi_messages_nb } from './nb';

const nb = {
    ...ungUi_messages_nb,
};

export type UngUiMessageKeys = keyof typeof nb;

const nn: Record<UngUiMessageKeys, string> = {
    ...nb,
};

export const useUngUiIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<UngUiMessageKeys>(intl);
};

export type UngUiIntlShape = ReturnType<typeof useUngUiIntl>;

interface UngUiTextProps {
    id: UngUiMessageKeys;
    values?: any;
}

export const UngUiText = (props: UngUiTextProps) => {
    return <FormattedMessage {...props} />;
};

export const ungUiMessages = {
    nb,
    nn,
};
