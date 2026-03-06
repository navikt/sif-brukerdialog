import { typedIntlHelper } from '@common/utils/intlUtils';
import { uiMessages } from '@navikt/sif-common-ui';
import { FormattedMessage, useIntl } from 'react-intl';

import { rammeverkMessages } from '../../rammeverk/i18n';
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
