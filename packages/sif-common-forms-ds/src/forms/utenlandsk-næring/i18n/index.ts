import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

import { utenlandskNæringMessages_nb } from './nb';
import { utenlandskNæringMessages_nn } from './nn';

export type UtenlandskNæringMessageKeys = keyof typeof utenlandskNæringMessages_nb;

export const utenlandskNæringMessages = {
    nb: utenlandskNæringMessages_nb,
    nn: utenlandskNæringMessages_nn,
};

export const useUtenlandskNæringIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<UtenlandskNæringMessageKeys>(intl);
};
