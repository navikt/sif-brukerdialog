import { typedIntlHelper } from '@navikt/sif-common-utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { appErrorFallbackMessages_nb } from '../components/app-error-fallback/i18n/nb';
import { appErrorFallbackMessages_nn } from '../components/app-error-fallback/i18n/nn';
import { deleteButtonMessages_nb } from '../components/delete-button/i18n/nb';
import { deleteButtonMessages_nn } from '../components/delete-button/i18n/nn';
import { formLayoutMessages_nb } from '../components/form-layout/i18n/nb';
import { formLayoutMessages_nn } from '../components/form-layout/i18n/nn';
import { itemListDarksideMessages_nb } from '../components/item-list-darkside/i18n/nb';
import { itemListDarksideMessages_nn } from '../components/item-list-darkside/i18n/nn';
import { pictureScanningGuideMessages_nb } from '../components/picture-scanning-guide/i18n/nb';
import { pictureScanningGuideMessages_nn } from '../components/picture-scanning-guide/i18n/nn';
import { progressStepperMessages_nb } from '../components/progress-stepper/i18n/nb';
import { progressStepperMessages_nn } from '../components/progress-stepper/i18n/nn';
import { registrerteBarnKildeInfoMessages_nb } from '../components/registrerte-barn-kilde/i18n/nb';
import { registrerteBarnKildeInfoMessages_nn } from '../components/registrerte-barn-kilde/i18n/nn';
import { registrerteBarnListeMessages_nb } from '../components/registrerte-barn-liste/i18n/nb';
import { registrerteBarnListeMessages_nn } from '../components/registrerte-barn-liste/i18n/nn';
import { vedleggSummaryListMessages_nb } from '../components/vedlegg-summary-list/i18n/nb';
import { vedleggSummaryListMessages_nn } from '../components/vedlegg-summary-list/i18n/nn';
import { errorPageMessages_nb } from '../pages/error-page/i18n/nb';
import { errorPageMessages_nn } from '../pages/error-page/i18n/nn';
import { loadingPageMessages_nb } from '../pages/loading-page/i18n/nb';
import { loadingPageMessages_nn } from '../pages/loading-page/i18n/nn';
import { startPageMessages_nb } from '../pages/start-page/i18n/nb';
import { startPageMessages_nn } from '../pages/start-page/i18n/nn';
import { stepPageMessages_nb } from '../pages/step-page/i18n/nb';
import { stepPageMessages_nn } from '../pages/step-page/i18n/nn';

const nb = {
    ...appErrorFallbackMessages_nb,
    ...deleteButtonMessages_nb,
    ...formLayoutMessages_nb,
    ...itemListDarksideMessages_nb,
    ...progressStepperMessages_nb,
    ...stepPageMessages_nb,
    ...startPageMessages_nb,
    ...loadingPageMessages_nb,
    ...errorPageMessages_nb,
    ...registrerteBarnKildeInfoMessages_nb,
    ...registrerteBarnListeMessages_nb,
    ...pictureScanningGuideMessages_nb,
    ...vedleggSummaryListMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...appErrorFallbackMessages_nn,
    ...deleteButtonMessages_nn,
    ...formLayoutMessages_nn,
    ...itemListDarksideMessages_nn,
    ...progressStepperMessages_nn,
    ...stepPageMessages_nn,
    ...startPageMessages_nn,
    ...loadingPageMessages_nn,
    ...errorPageMessages_nn,
    ...registrerteBarnKildeInfoMessages_nn,
    ...registrerteBarnListeMessages_nn,
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
