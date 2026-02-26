import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { bostedUtlandMessages } from '@navikt/sif-common-forms-ds';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { FormattedMessage, useIntl } from 'react-intl';

import { soknadMessages_nb } from './messages/nb';
import { soknadMessages_nn } from './messages/nn';

const nb = {
    ...soknadMessages_nb,
    ...uiMessages.nb,
    ...soknadMessages.nb,
    ...bostedUtlandMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...soknadMessages_nn,
    ...uiMessages.nn,
    ...soknadMessages.nn,
    ...bostedUtlandMessages.nn,
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
