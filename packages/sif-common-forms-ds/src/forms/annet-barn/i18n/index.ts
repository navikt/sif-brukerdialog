import { useIntl } from 'react-intl';
import { annetBarnMessages_nb } from './nb';
import { annetBarnMessages_nn } from './nn';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

export type AnnetBarnMessageKeys = keyof typeof annetBarnMessages_nb;

export const annetBarnMessages = {
    nb: annetBarnMessages_nb,
    nn: annetBarnMessages_nn,
};

export const useAnnetBarnIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<AnnetBarnMessageKeys>(intl);
};
