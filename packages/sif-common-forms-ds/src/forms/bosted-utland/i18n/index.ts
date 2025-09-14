import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

import { bostedUtlandMessages_nb } from './nb';
import { bostedUtlandMessages_nn } from './nn';

export type BostedUtlandMessageKeys = keyof typeof bostedUtlandMessages_nb;

export const useBostedUtlandIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<BostedUtlandMessageKeys>(intl);
};

export const bostedUtlandMessages = {
    nb: bostedUtlandMessages_nb,
    nn: bostedUtlandMessages_nn,
};
