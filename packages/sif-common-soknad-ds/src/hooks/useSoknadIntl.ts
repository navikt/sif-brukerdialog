import { useIntl } from 'react-intl';
import { getSoknadIntl } from '../i18n/soknad.messages';

export const useSoknadIntl = () => {
    const intl = useIntl();
    return getSoknadIntl(intl);
};
