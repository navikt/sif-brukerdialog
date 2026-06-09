import { typedIntlHelper } from '@navikt/sif-common-utils';
import { uiMessages } from '@navikt/sif-common-ui';
import { sifSoknadUiMessages } from '@sif/soknad-ui';
import { FormattedMessage, useIntl } from 'react-intl';

import { innsynMessages } from '../apps/innsyn/i18n';
import { ungSoknadMessages } from '../apps/søknad/i18n';

const nb = {
    ...ungSoknadMessages.nb,
    ...innsynMessages.nb,
    ...uiMessages.nb,
    ...sifSoknadUiMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...ungSoknadMessages.nn,
    ...innsynMessages.nn,
    ...uiMessages.nn,
    ...sifSoknadUiMessages.nn,
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
