import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';
import { SoknadIntlMessageKeys } from '../i18n/soknadIntlMessages';

export const useSoknadIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<SoknadIntlMessageKeys>(intl);
};
