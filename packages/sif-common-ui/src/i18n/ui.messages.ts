import { IntlShape, useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { durationTextMessages } from '../components/duration-text/durationText.messages';
import { progressStepperMessages } from '../components/progress-stepper/progressStepper.messages';
import { daySelectorMessages } from '../inputs/day-selector/daySelector.messages';
import { durationWeekdaysInputMessages } from '../inputs/duration-weekdays-input/durationWeekdaysInput.messages';
import { tidFasteUkedagerInputMessages } from '../inputs/tid-faste-ukedager-input/tidFasteUkerdagerInput.messages';

const nb = {
    '@ui.jaNeiSvar.Ja': 'Ja',
    '@ui.jaNeiSvar.Nei': 'Nei',
    ...daySelectorMessages.nb,
    ...durationTextMessages.nb,
    ...durationWeekdaysInputMessages.nb,
    ...progressStepperMessages.nb,
    ...tidFasteUkedagerInputMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    '@ui.jaNeiSvar.Ja': 'Ja',
    '@ui.jaNeiSvar.Nei': 'Nei',
    ...daySelectorMessages.nn,
    ...durationTextMessages.nn,
    ...durationWeekdaysInputMessages.nn,
    ...progressStepperMessages.nn,
    ...tidFasteUkedagerInputMessages.nn,
};

export const getUiIntl = (intl: IntlShape) => {
    return typedIntlHelper<keyof typeof nb>(intl);
};

export const useUiIntl = () => {
    const intl = useIntl();
    return getUiIntl(intl);
};

export const uiMessages = { nb, nn };
