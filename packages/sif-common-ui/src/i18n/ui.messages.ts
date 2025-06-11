import { IntlShape, useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { durationTextMessages_nb } from '../components/duration-text/i18n/nb';
import { durationTextMessages_nn } from '../components/duration-text/i18n/nn';
import { progressStepperMessages_nb } from '../components/progress-stepper/i18n/nb';
import { progressStepperMessages_nn } from '../components/progress-stepper/i18n/nn';
import { registrerteBarnMessages_nb } from '../components/registrerte-barn-liste/i18n/nb';
import { registrerteBarnMessages_nn } from '../components/registrerte-barn-liste/i18n/nn';
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
    ...registrerteBarnMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    '@ui.jaNeiSvar.Ja': 'Ja',
    '@ui.jaNeiSvar.Nei': 'Nei',
    ...daySelectorMessages_nn,
    ...durationTextMessages_nn,
    ...durationWeekdaysInputMessages_nn,
    ...progressStepperMessages_nn,
    ...tidFasteUkedagerInputMessages_nn,
    ...registrerteBarnMessages_nn,
};

export const getUiIntl = (intl: IntlShape) => {
    return typedIntlHelper<keyof typeof nb>(intl);
};

export const useUiIntl = () => {
    const intl = useIntl();
    return getUiIntl(intl);
};

export const uiMessages = { nb, nn };
