import { typedIntlHelper } from '@sif/utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { ungInnsyn_messages_nb } from './nb';

const nb = {
    ...ungInnsyn_messages_nb,
};

export type UngInnsynMessageKeys = keyof typeof nb;

const nn: Record<UngInnsynMessageKeys, string> = {
    ...nb,
};

export const useUngInnsynIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<UngInnsynMessageKeys>(intl);
};

export type UngInnsynIntlShape = ReturnType<typeof useUngInnsynIntl>;

interface UngInnsynTextProps {
    id: UngInnsynMessageKeys;
    values?: any;
}

export const UngInnsynText = (props: UngInnsynTextProps) => {
    return <FormattedMessage {...props} />;
};

export const ungInnsynMessages = {
    nb,
    nn,
};
