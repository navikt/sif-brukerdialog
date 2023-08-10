import { calendarGridMessages } from '../common/calendar-grid/calendarGridMessages';
import { dagerMedTidMessages } from '../common/dager-med-tid-liste/dagerMedTidMessages';
import { timerOgMinutterMessages } from '../common/timer-og-minutter/timerOgMinutterMessages';
import { omsorgstilbudEnkeltdagFormMessages } from '../';
import arbeidstidEnkeltdagFormMessages from '../arbeidstid/arbeidstid-enkeltdag-dialog/arbeidstidEnkeltdagMessages';
import arbeidstidMånedMessages from '../arbeidstid/arbeidstid-kalender/i18n/arbeidstidMånedMessages';
import { arbeidstidPeriodeMessages } from '../arbeidstid/arbeidstid-periode-dialog/i18n/arbeidstidPeriodeMessages';
import { omsorgstibudPeriodeMessages } from '../omsorgstilbud/omsorgstilbud-periode/i18n/omsorgstilbudPeriodeMessages';
import tidEnkeltdagFormMessages from '../tid/tid-enkeltdag-dialog/i18n/tidEnkeltdagMessages';

export type ComponentMessages<Messages> = Record<string, Messages>;

export const sifCommonPleiepengerMessages = {
    nb: {
        ...arbeidstidPeriodeMessages.nb,
        ...omsorgstibudPeriodeMessages.nb,
        ...omsorgstilbudEnkeltdagFormMessages.nb,
        ...timerOgMinutterMessages.nb,
        ...tidEnkeltdagFormMessages.nb,
        ...arbeidstidEnkeltdagFormMessages.nb,
        ...calendarGridMessages.nb,
        ...arbeidstidMånedMessages.nb,
        ...dagerMedTidMessages.nb,
    },
};
