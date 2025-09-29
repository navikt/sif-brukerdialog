import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { durationTextMessages_nb } from '../components/duration-text/i18n/nb';
import { durationTextMessages_nn } from '../components/duration-text/i18n/nn';
import { progressStepperMessages_nb } from '../components/progress-stepper/i18n/nb';
import { progressStepperMessages_nn } from '../components/progress-stepper/i18n/nn';
import { registrerteBarnKildeInfoMessages_nb } from '../components/registrerte-barn-kilde/i18n/nb';
import { registrerteBarnKildeInfoMessages_nn } from '../components/registrerte-barn-kilde/i18n/nn';
import { registrerteBarnListeMessages_nb } from '../components/registrerte-barn-liste/i18n/nb';
import { registrerteBarnListeMessages_nn } from '../components/registrerte-barn-liste/i18n/nn';
import { daySelectorMessages_nb } from '../inputs/day-selector/i18n/nb';
import { daySelectorMessages_nn } from '../inputs/day-selector/i18n/nn';
import { durationWeekdaysInputMessages_nb } from '../inputs/duration-weekdays-input/i18n/nb';
import { durationWeekdaysInputMessages_nn } from '../inputs/duration-weekdays-input/i18n/nn';
import { tidFasteUkedagerInputMessages_nb } from '../inputs/tid-faste-ukedager-input/i18n/nb';
import { tidFasteUkedagerInputMessages_nn } from '../inputs/tid-faste-ukedager-input/i18n/nn';

const nb = {
    '@ui.jaNeiSvar.Ja': 'Ja',
    '@ui.jaNeiSvar.Nei': 'Nei',
    ...daySelectorMessages_nb,
    ...durationTextMessages_nb,
    ...durationWeekdaysInputMessages_nb,
    ...progressStepperMessages_nb,
    ...tidFasteUkedagerInputMessages_nb,
    ...registrerteBarnListeMessages_nb,
    ...registrerteBarnKildeInfoMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    '@ui.jaNeiSvar.Ja': 'Ja',
    '@ui.jaNeiSvar.Nei': 'Nei',
    ...daySelectorMessages_nn,
    ...durationTextMessages_nn,
    ...durationWeekdaysInputMessages_nn,
    ...progressStepperMessages_nn,
    ...tidFasteUkedagerInputMessages_nn,
    ...registrerteBarnListeMessages_nn,
    ...registrerteBarnKildeInfoMessages_nn,
};

export const getUiIntl = (intl: IntlShape) => {
    return typedIntlHelper<keyof typeof nb>(intl);
};

export const useUiIntl = () => {
    const intl = useIntl();
    return getUiIntl(intl);
};

export type UiMessageKeys = keyof typeof nb;

interface UiTextProps {
    id: UiMessageKeys;
    values?: any;
}

export const UiText = (props: UiTextProps) => {
    return <FormattedMessage {...props} />;
};

export const uiMessages = { nb, nn };
