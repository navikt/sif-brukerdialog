const nb = {
    '@ui.durationText.digital': '{hours}:{minutes}',
    '@ui.durationText.decimal': '{time} t.',
    '@ui.durationText.hours': '{hours} t.',
    '@ui.durationText.minutes': '{minutes} m.',
    '@ui.durationText.hoursAndMinutes': '{hours} t. {minutes} m.',
    '@ui.durationText.full.digital': '{hours}:{minutes}',
    '@ui.durationText.full.decimal': '{time}',
    '@ui.durationText.full.hours': '{hours, plural, one {# time} other {# timer}}',
    '@ui.durationText.full.minutes': '{minutes, plural, one {# minutt} other {# minutter}}',
    '@ui.durationText.full.hoursAndMinutes':
        '{hours, plural, one {# time} other {# timer}} {minutes, plural, one {# minutt} other {# minutter}}',
};

const nn: Record<keyof typeof nb, string> = {
    '@ui.durationText.digital': '{hours}:{minutes}',
    '@ui.durationText.decimal': '{time} t.',
    '@ui.durationText.hours': '{hours} t.',
    '@ui.durationText.minutes': '{minutes} m.',
    '@ui.durationText.hoursAndMinutes': '{hours} t. {minutes} m.',
    '@ui.durationText.full.digital': '{hours}:{minutes}',
    '@ui.durationText.full.decimal': '{time}',
    '@ui.durationText.full.hours': '{hours, plural, one {# time} other {# timar}}',
    '@ui.durationText.full.minutes': '{minutes} minutt',
    '@ui.durationText.full.hoursAndMinutes': '{hours, plural, one {# time} other {# timer}} {minutes} minutt',
};

export const durationTextMessages = {
    nb,
    nn,
};
