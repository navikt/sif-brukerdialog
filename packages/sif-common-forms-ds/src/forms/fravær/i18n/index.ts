import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { fraværMessages_nb } from './nb';
import { fraværMessages_nn } from './nn';

export type FraværMessageKeys = keyof typeof fraværMessages_nb;

export const fraværMessages = {
    nb: fraværMessages_nb,
    nn: fraværMessages_nn,
};

export const useFraværIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<FraværMessageKeys>(intl);
};
