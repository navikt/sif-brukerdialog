import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { enkeltdatoMessages_nb } from './nb';
import { enkeltdatoMessages_nn } from './nn';

export type EnkeltdatoMessageKeys = keyof typeof enkeltdatoMessages_nb;

export const enkeltdatoMessages = {
    nb: enkeltdatoMessages_nb,
    nn: enkeltdatoMessages_nn,
};

export const useEnkeltdatoIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<EnkeltdatoMessageKeys>(intl);
};
