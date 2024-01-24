import { calendarGridMessages } from '../components/calendar-grid/calendarGridMessages';
import omsorgstilbudEnkeltdagFormMessages from '../components/omsorgstilbud-enkeltdag/omsorgstilbudEnkeltdagFormMessages';
import { omsorgstibudPeriodeMessages } from '../components/omsorgstilbud-periode/i18n/omsorgstilbudPeriodeMessages';
import tidEnkeltdagFormMessages from '../components/tid-enkeltdag-dialog/i18n/tidEnkeltdagMessages';

export type ComponentMessages<Messages> = Record<string, Messages>;

export const sifCommonPleiepengerMessages = {
    nb: {
        ...omsorgstibudPeriodeMessages.nb,
        ...omsorgstilbudEnkeltdagFormMessages.nb,
        ...tidEnkeltdagFormMessages.nb,
        ...calendarGridMessages.nb,
    },
};
