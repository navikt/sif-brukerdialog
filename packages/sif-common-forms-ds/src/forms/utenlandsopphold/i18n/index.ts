import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { utenlandsoppholdMessages_nb } from './nb';
import { utenlandsoppholdMessages_nn } from './nn';

export type UtenlandsoppholdMessageKeys = keyof typeof utenlandsoppholdMessages_nb;

export const utenlandsoppholdMessages = {
    nb: utenlandsoppholdMessages_nb,
    nn: utenlandsoppholdMessages_nn,
};

export const useUtenlandsoppholdIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<UtenlandsoppholdMessageKeys>(intl);
};
