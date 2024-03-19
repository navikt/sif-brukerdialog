import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { nb } from './nb';

type MessageKeys = keyof typeof nb;

export type MessagesType = Record<MessageKeys, string>;

const nn: MessagesType = {
    ...nb,
};

export const getMessagesIntl = (intl: IntlShape) => {
    return typedIntlHelper<keyof typeof nb>(intl);
};

export type MessagesText = (key: MessageKeys, values?: any) => string;

export const useMessages = () => {
    const intl = useIntl();
    return getMessagesIntl(intl);
};

interface Props {
    id: MessageKeys;
    values?: any;
}

export const Msg: React.FunctionComponent<Props> = ({ id, values }) => <FormattedMessage id={id} values={values} />;

export const messages = {
    nb,
    nn,
};
