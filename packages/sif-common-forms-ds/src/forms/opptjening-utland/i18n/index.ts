import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { opptjeningUtlandMessages_nb } from './nb';
import { opptjeningUtlandMessages_nn } from './nn';

export type OpptjeningUtlandMessageKeys = keyof typeof opptjeningUtlandMessages_nb;

export const opptjeningUtlandMessages = {
    nb: opptjeningUtlandMessages_nb,
    nn: opptjeningUtlandMessages_nn,
};

export const useOpptjeningUtlandIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<OpptjeningUtlandMessageKeys>(intl);
};
