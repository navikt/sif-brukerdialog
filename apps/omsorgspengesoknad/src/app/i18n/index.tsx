import { FormattedMessage, useIntl } from 'react-intl';
import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { velgBarnFormPart_nb } from '@navikt/sif-common-forms-ds/src/form-parts/velg-barn-form-part/i18n/nb';
import { velgBarnFormPart_nn } from '@navikt/sif-common-forms-ds/src/form-parts/velg-barn-form-part/i18n/nn';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { componentMessages } from './componentMessages';
import { appMessages_nb } from './nb';
import { appMessages_nn } from './nn';

export const libMessages = {
    nb: {
        ...commonMessages.nb,
        ...uiMessages.nb,
        ...soknadMessages.nb,
        ...velgBarnFormPart_nb,
    },
    nn: {
        ...commonMessages.nn,
        ...uiMessages.nn,
        ...soknadMessages.nn,
        ...velgBarnFormPart_nn,
    },
};

export const appMessages = {
    nb: appMessages_nb,
    nn: appMessages_nn,
};

const nb = {
    ...libMessages.nb,
    ...appMessages.nb,
    ...componentMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...libMessages.nn,
    ...appMessages.nn,
    ...componentMessages.nn,
};

export const appAndComponentIntlMessages = {
    nb: {
        ...appMessages.nb,
        ...componentMessages.nb,
    },
    nn: { ...appMessages.nn, ...componentMessages.nn },
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
