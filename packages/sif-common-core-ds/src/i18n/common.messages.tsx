import { FormattedMessage, useIntl } from 'react-intl';
import { typedIntlHelper } from '../utils/intlUtils';
import { commonMessages_nb } from './nb';
import { commonMessages_nn } from './nn';

export type CoreMessageKeys = keyof typeof commonMessages_nb;

export const useCoreIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<CoreMessageKeys>(intl);
};

export type CoreIntlShape = ReturnType<typeof useCoreIntl>;

interface CoreTextProps {
    id: CoreMessageKeys;
    values?: any;
}

export const CoreText = (props: CoreTextProps) => {
    return <FormattedMessage {...props} />;
};

export const commonMessages = {
    nb: commonMessages_nb,
    nn: commonMessages_nn,
};
