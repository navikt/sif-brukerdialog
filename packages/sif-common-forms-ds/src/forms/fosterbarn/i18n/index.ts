import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { fosterbarnMessages_nb } from './nb';
import { forsterbarnMessages_nn } from './nn';

export type FosterbarnMessageKeys = keyof typeof fosterbarnMessages_nb;

export const fosterbarnMessages = {
    nb: fosterbarnMessages_nb,
    nn: forsterbarnMessages_nn,
};

export const useFosterbarnIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<FosterbarnMessageKeys>(intl);
};
