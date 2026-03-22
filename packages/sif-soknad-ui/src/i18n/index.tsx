import { typedIntlHelper } from '@navikt/sif-common-utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { progressStepperMessages_nb } from '../components/progress-stepper/i18n/nb';
import { stepPageMessages_nb } from '../pages/step-page/i18n/nb';

const nb = {
    ...progressStepperMessages_nb,
    ...stepPageMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

type SifSoknadUiMessageKeys = keyof typeof nb;

export const useSifSoknadUiIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<SifSoknadUiMessageKeys>(intl);
};

interface SifSoknadUiTextProps {
    id: SifSoknadUiMessageKeys;
    values?: any;
}

export const SifSoknadUiText = (props: SifSoknadUiTextProps) => {
    return <FormattedMessage {...props} />;
};

export const sifSoknadUiMessages = {
    nb,
    nn,
};
