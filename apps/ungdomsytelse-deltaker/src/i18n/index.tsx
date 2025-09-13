import { FormattedMessage, useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { uiMessages } from '@navikt/sif-common-ui';
import { innsynMessages } from '../apps/innsyn/i18n';
import { ungSoknadMessages } from '../apps/søknad/i18n';

const nb = {
    ...ungSoknadMessages.nb,
    ...innsynMessages.nb,
    ...uiMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...ungSoknadMessages.nn,
    ...innsynMessages.nn,
    ...uiMessages.nn,
};

export type AppMessageKeys = keyof typeof nb;

export const useAppIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<AppMessageKeys>(intl);
};

export type AppIntlShape = ReturnType<typeof useAppIntl>;

export const AppText = (props: { id: AppMessageKeys; values?: any }) => {
    return <FormattedMessage {...props} />;
};

export const applicationIntlMessages = {
    nb,
    nn,
};
