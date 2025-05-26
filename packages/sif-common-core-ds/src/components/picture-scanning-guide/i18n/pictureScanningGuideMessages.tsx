import { useIntl } from 'react-intl';
import { typedIntlHelper } from '../../../utils/intlUtils';
import { psgMessages_nb } from './nb';
import { psgMessages_nn } from './nn';

export type PSGMessageKeys = keyof typeof psgMessages_nb;

export const usePSGIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<PSGMessageKeys>(intl);
};

export const pictureScanningGuideMessages = {
    nb: psgMessages_nb,
    nn: psgMessages_nn,
};
