import { FormattedMessage, IntlShape } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { soknadMessages_nb } from './nb';
import { soknadMessages_nn } from './nn';

type SoknadMessageKeys = keyof typeof soknadMessages_nb;

export type SoknadMessagesType = Record<SoknadMessageKeys, string>;

export const getSoknadIntl = (intl: IntlShape) => {
    return typedIntlHelper<SoknadMessageKeys>(intl);
};

export const SoknadText = (props: { id: SoknadMessageKeys; values?: any }) => {
    return <FormattedMessage {...props} />;
};

export const soknadMessages = {
    nb: soknadMessages_nb,
    nn: soknadMessages_nn,
};
