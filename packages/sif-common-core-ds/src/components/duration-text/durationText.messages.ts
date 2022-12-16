import { MessageFileFormat } from '../../types/MessageFileFormat';

export const durationTextMessages: MessageFileFormat = {
    nb: {
        'durationText.digital': '{hours}:{minutes}',
        'durationText.decimal': '{time} t.',
        'durationText.hours': '{hours} t.',
        'durationText.minutes': '{minutes} m.',
        'durationText.hoursAndMinutes': '{hours} t. {minutes} m.',
        'durationText.full.digital': '{hours}:{minutes}',
        'durationText.full.decimal': '{time}',
        'durationText.full.hours': '{hours, plural, one {# time} other {# timer}}',
        'durationText.full.minutes': '{minutes, plural, one {# minutt} other {# minutter}}',
        'durationText.full.hoursAndMinutes':
            '{hours, plural, one {# time} other {# timer}} {minutes, plural, one {# minutt} other {# minutter}}',
    },
};
