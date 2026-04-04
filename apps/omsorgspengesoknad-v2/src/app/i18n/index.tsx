import { typedIntlHelper } from '@navikt/sif-common-utils';
import { sifSoknadFormsMessages } from '@sif/soknad-forms';
import { sifSoknadUiMessages } from '@sif/soknad-ui/i18n';
import { FormattedMessage, useIntl } from 'react-intl';

import { appMessages_nb } from './app-messages/nb';
import { appMessages_nn } from './app-messages/nn';

const libMessages = {
    nb: {
        ...sifSoknadUiMessages.nb,
        ...sifSoknadFormsMessages.nb,
    },
    nn: {
        ...sifSoknadUiMessages.nn,
        ...sifSoknadFormsMessages.nn,
    },
};

const nb = {
    ...libMessages.nb,
    ...appMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...libMessages.nn,
    ...appMessages_nn,
};

export type AppMessageKeys = keyof typeof nb;

export const useAppIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<AppMessageKeys>(intl);
};

export type AppIntlShape = ReturnType<typeof useAppIntl>;

interface AppTextProps {
    id: AppMessageKeys;
    values?: any;
}

export const AppText = (props: AppTextProps) => {
    return <FormattedMessage {...props} />;
};

export const applicationIntlMessages = {
    nb,
    nn,
};
