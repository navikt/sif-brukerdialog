import { uiMessages } from '@navikt/sif-common-ui';
import { typedIntlHelper } from '@sif/soknad/utils';
import { sifSoknadFormsMessages } from '@sif/soknad-forms';
import { sifSoknadUiMessages } from '@sif/soknad-ui/i18n';
import { FormattedMessage, useIntl } from 'react-intl';

import { velkommenPageMessages_nb } from '../pages/velkommen/i18n/nb';
import { velkommenPageMessages_nn } from '../pages/velkommen/i18n/nn';
import { appMessages_nb } from './nb/appMessages';
import { stepMessages_nb } from './nb/stepMessages';
import { appMessages_nn } from './nn/appMessages';
import { stepMessages_nn } from './nn/stepMessages';

const libMessages = {
    nb: {
        ...uiMessages.nb,
        ...sifSoknadFormsMessages.nb,
        ...sifSoknadUiMessages.nb,
    },
    nn: {
        ...uiMessages.nn,
        ...sifSoknadFormsMessages.nn,
        ...sifSoknadUiMessages.nn,
    },
};

const nb = {
    ...libMessages.nb,
    ...appMessages_nb,
    ...stepMessages_nb,
    ...velkommenPageMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...libMessages.nn,
    ...appMessages_nn,
    ...stepMessages_nn,
    ...velkommenPageMessages_nn,
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
