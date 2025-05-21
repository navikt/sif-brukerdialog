import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { kursperiodeMessages_nb } from './nb';
import { kursperiodeMessages_nn } from './nn';

export type KursperiodeMessageKeys = keyof typeof kursperiodeMessages_nb;

export const kursperiodeMessages = {
    nb: kursperiodeMessages_nb,
    nn: kursperiodeMessages_nn,
};

export const useKursperiodeIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<KursperiodeMessageKeys>(intl);
};
