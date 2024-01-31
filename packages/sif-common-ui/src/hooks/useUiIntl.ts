import { useIntl } from 'react-intl';
import { getUiIntl } from '../i18n/ui.messages';

export const useSoknadIntl = () => {
    const intl = useIntl();
    return getUiIntl(intl);
};
