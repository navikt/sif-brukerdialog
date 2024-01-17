import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';
import { SoknadMessageKeys } from '../i18n/soknad.messages';

export const useSoknadIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<SoknadMessageKeys>(intl);
};
