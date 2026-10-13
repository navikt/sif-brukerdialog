import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';

import { medlemskapFormMessages_nb } from './nb';
import { medlemskapFormMessages_nn } from './nn';

export type MedlemskapFormMessageKeys = keyof typeof medlemskapFormMessages_nb;

export const useMedlemskapFormIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<MedlemskapFormMessageKeys>(intl);
};

export const MedlemskapFormText = (props: { id: MedlemskapFormMessageKeys; values?: any }) => {
    return <FormattedMessage {...props} />;
};

export const medlemskapFormMessages = { nb: medlemskapFormMessages_nb, nn: medlemskapFormMessages_nn };
