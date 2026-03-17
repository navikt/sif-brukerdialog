import { uiMessages } from '@navikt/sif-common-ui';
import { rammeverkMessages } from '@sif/soknad/i18n';
import { typedIntlHelper } from '@sif/soknad/utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { velkommenPageMessages_nb } from '../pages/velkommen/i18n/nb';
import { appMessages_nb } from './nb/appMessages';
import { stepMessages_nb } from './nb/stepMessages';

const libMessages = {
    nb: {
        ...uiMessages.nb,
        ...rammeverkMessages.nb,
    },
};

const nb = {
    ...libMessages.nb,
    ...appMessages_nb,
    ...stepMessages_nb,
    ...velkommenPageMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
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
