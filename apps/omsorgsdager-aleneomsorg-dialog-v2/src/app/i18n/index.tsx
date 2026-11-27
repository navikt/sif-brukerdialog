import { IntlMessageObjectFormat } from '@sif/soknad-app';
import { sifSoknadUiMessages } from '@sif/soknad-ui/i18n';
import { typedIntlHelper } from '@sif/utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { appMessages_nb } from './nb';
import { appMessages_nn } from './nn';

const nb = {
    ...sifSoknadUiMessages.nb,
    ...appMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...sifSoknadUiMessages.nn,
    ...appMessages_nn,
};

export type AppMessageKeys = keyof typeof nb;

export const useAppIntl = () => typedIntlHelper<AppMessageKeys>(useIntl());
export type AppIntlShape = ReturnType<typeof useAppIntl>;

export const AppText = ({ id, values }: { id: AppMessageKeys; values?: any }) => (
    <FormattedMessage id={id} values={values} />
);

export const applicationIntlMessages: IntlMessageObjectFormat = {
    nb,
    nn,
};
