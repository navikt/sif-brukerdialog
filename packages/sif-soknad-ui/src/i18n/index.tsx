import { typedIntlHelper } from '@navikt/sif-common-utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { appErrorFallbackMessages_nb } from '../components/app-error-fallback/i18n/nb';
import { formLayoutMessages_nb } from '../components/form-layout/i18n/nb';
import { pictureScanningGuideMessages_nb } from '../components/picture-scanning-guide/i18n/nb';
import { pictureScanningGuideMessages_nn } from '../components/picture-scanning-guide/i18n/nn';
import { progressStepperMessages_nb } from '../components/progress-stepper/i18n/nb';
import { registrerteBarnKildeInfoMessages_nb } from '../components/registrerte-barn-kilde/i18n/nb';
import { registrerteBarnListeMessages_nb } from '../components/registrerte-barn-liste/i18n/nb';
import { vedleggSummaryListMessages_nb } from '../components/vedlegg-summary-list/i18n/nb';
import { vedleggSummaryListMessages_nn } from '../components/vedlegg-summary-list/i18n/nn';
import { stepPageMessages_nb } from '../pages/step-page/i18n/nb';

const nb = {
    ...appErrorFallbackMessages_nb,
    ...formLayoutMessages_nb,
    ...progressStepperMessages_nb,
    ...stepPageMessages_nb,
    ...registrerteBarnKildeInfoMessages_nb,
    ...registrerteBarnListeMessages_nb,
    ...pictureScanningGuideMessages_nb,
    ...vedleggSummaryListMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    ...pictureScanningGuideMessages_nn,
    ...vedleggSummaryListMessages_nn,
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
