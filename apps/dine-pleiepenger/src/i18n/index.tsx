import { FormattedMessage, useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { nb } from './nb';

type MessageKeys = keyof typeof nb;

export type MessagesType = Record<MessageKeys, string>;

const nn: MessagesType = {
    ...nb,
};

export type IntlTextFn = (key: MessageKeys, values?: any) => string;

export const useAppIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<keyof typeof nb>(intl);
};

interface Props {
    id: MessageKeys;
    values?: any;
}

export const AppText: React.FunctionComponent<Props> = ({ id, values }) => <FormattedMessage id={id} values={values} />;

export type AppIntlShape = ReturnType<typeof useAppIntl>;

export const messages = {
    nb,
    nn,
};
