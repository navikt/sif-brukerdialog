import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

import { tidsperiodeMessages_nb } from './nb';
import { tidsperiodeMessages_nn } from './nn';

export type TidsperiodeMessageKeys = keyof typeof tidsperiodeMessages_nb;

export const tidsperiodeMessages = {
    nb: tidsperiodeMessages_nb,
    nn: tidsperiodeMessages_nn,
};

export const useTidsperiodeIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<TidsperiodeMessageKeys>(intl);
};
