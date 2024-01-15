import { calendarGridMessages } from '../common/calendar-grid/calendarGridMessages';
import { dagerMedTidMessages } from '../common/dager-med-tid-liste/dagerMedTidMessages';
import { timerOgMinutterMessages } from '../common/timer-og-minutter/timerOgMinutterMessages';
import { arbeidstidPeriodeMessages } from '../../søknad/steps/arbeidstid/arbeidstidPeriodeMessages';
import tidEnkeltdagFormMessages from '../tid/tid-enkeltdag-dialog/i18n/tidEnkeltdagMessages';

export type ComponentMessages<Messages> = Record<string, Messages>;

export const sifCommonPleiepengerMessages = {
    nb: {
        ...arbeidstidPeriodeMessages.nb,
        ...timerOgMinutterMessages.nb,
        ...tidEnkeltdagFormMessages.nb,
        ...calendarGridMessages.nb,
        ...dagerMedTidMessages.nb,
    },
};
