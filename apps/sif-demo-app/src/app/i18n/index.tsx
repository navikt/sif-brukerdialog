import { FormattedMessage, useIntl } from 'react-intl';
import { typedIntlHelper } from '../../common/utils/intlUtils';
import { stepMessages_nb } from './nb/stepMessages';

const nb = {
    ...stepMessages_nb,
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
