import { durationTextMessages_nb } from './nb';

export const durationTextMessages_nn: Record<keyof typeof durationTextMessages_nb, string> = {
    '@ui.durationText.digital': '{hours}:{minutes}',
    '@ui.durationText.decimal': '{time} t.',
    '@ui.durationText.hours': '{hours} t.',
    '@ui.durationText.minutes': '{minutes} m.',
    '@ui.durationText.hoursAndMinutes': '{hours} t. {minutes} m.',
    '@ui.durationText.full.digital': '{hours}:{minutes}',
    '@ui.durationText.full.decimal': '{time}',
    '@ui.durationText.full.hours': '{hours, plural, one {# time} other {# timar}}',
    '@ui.durationText.full.minutes': '{minutes, plural, one {# minutt} other {# minutt}}',
    '@ui.durationText.full.hoursAndMinutes':
        '{hours, plural, one {# time} other {# timar}} {minutes, plural, one {# minutt} other {# minutt}}',
};
