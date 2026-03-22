import { typedIntlHelper } from '@navikt/sif-common-utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { appErrorFallbackMessages_nb } from '../components/app-error-fallback/i18n/nb';
import { appErrorFallbackMessages_nn } from '../components/app-error-fallback/i18n/nn';
import { formLayoutMessages_nb } from '../components/form-layout/i18n/nb';
import { formLayoutMessages_nn } from '../components/form-layout/i18n/nn';
import { progressStepperMessages_nb } from '../components/progress-stepper/i18n/nb';
import { stepPageMessages_nb } from '../pages/step-page/i18n/nb';

const nb = {
    ...appErrorFallbackMessages_nb,
    ...formLayoutMessages_nb,
    ...progressStepperMessages_nb,
    ...stepPageMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    ...appErrorFallbackMessages_nn,
    ...formLayoutMessages_nn,
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
