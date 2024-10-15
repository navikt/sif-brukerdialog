import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { virksomhetValidationMessages } from './virksomhetValidationMessages';
import { virksomhetFormMessages } from './virksomhetFormMessages';
import { virksomhetSummaryMessages } from './virksomhetSummaryMessages';

const nb = {
    ...virksomhetFormMessages.nb,
    ...virksomhetValidationMessages.nb,
    ...virksomhetSummaryMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...virksomhetFormMessages.nn,
    ...virksomhetValidationMessages.nn,
    ...virksomhetSummaryMessages.nn,
};

export type VirksomhetMessageKeys = keyof typeof nb;

export const virksomhetMessages = {
    nb,
    nn,
};

export const useVirksomhetIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<VirksomhetMessageKeys>(intl);
};

export type VirksomhetIntlShape = ReturnType<typeof useVirksomhetIntl>;
