import { FormattedMessage, useIntl } from 'react-intl';

import { stepPageMessages_nb } from '../pages/step-page/i18n/nb';
import { typedIntlHelper } from '../utils';

const nb = {
    ...stepPageMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type RammeverkMessageKeys = keyof typeof nb;

export const useRammeverkIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<RammeverkMessageKeys>(intl);
};

export type RammeverkIntlShape = ReturnType<typeof useRammeverkIntl>;

interface RammeverkTextProps {
    id: RammeverkMessageKeys;
    values?: any;
}

export const RammeverkText = (props: RammeverkTextProps) => {
    return <FormattedMessage {...props} />;
};

export const rammeverkMessages = {
    nb,
    nn,
};
