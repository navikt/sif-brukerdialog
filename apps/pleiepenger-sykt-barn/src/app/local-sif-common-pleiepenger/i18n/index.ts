import { calendarGridMessages } from '../components/calendar-grid/calendarGridMessages';
import omsorgstilbudEnkeltdagFormMessages from '../components/omsorgstilbud-enkeltdag/omsorgstilbudEnkeltdagFormMessages';
import { omsorgstibudPeriodeMessages } from '../components/omsorgstilbud-periode/i18n/omsorgstilbudPeriodeMessages';
import tidEnkeltdagFormMessages from '../components/tid-enkeltdag-dialog/i18n/tidEnkeltdagMessages';
import { timerOgMinutterMessages } from '../components/timer-og-minutter/timerOgMinutterMessages';
import { arbeidstidPeriodeMessages } from './arbeidstidPeriodeMessages';

export type ComponentMessages<Messages> = Record<string, Messages>;

export const sifCommonPleiepengerMessages = {
    nb: {
        ...arbeidstidPeriodeMessages.nb,
        ...omsorgstibudPeriodeMessages.nb,
        ...omsorgstilbudEnkeltdagFormMessages.nb,
        ...timerOgMinutterMessages.nb,
        ...tidEnkeltdagFormMessages.nb,
        ...calendarGridMessages.nb,
    },
};
