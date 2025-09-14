import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

import { ferieuttakMessages_nb } from './nb';
import { ferieuttakMessages_nn } from './nn';

export type FerieuttakMessageKeys = keyof typeof ferieuttakMessages_nb;

export const useFerieuttakIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<FerieuttakMessageKeys>(intl);
};

export const ferieuttakMessages = {
    nb: ferieuttakMessages_nb,
    nn: ferieuttakMessages_nn,
};
