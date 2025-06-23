import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { virksomhetFormMessages_nb } from './nb';
import { virksomhetFormMessages_nn } from './nn';

export type VirksomhetMessageKeys = keyof typeof virksomhetFormMessages_nb;

export const virksomhetMessages = {
    nb: virksomhetFormMessages_nb,
    nn: virksomhetFormMessages_nn,
};

export const useVirksomhetIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<VirksomhetMessageKeys>(intl);
};

export type VirksomhetIntlShape = ReturnType<typeof useVirksomhetIntl>;
