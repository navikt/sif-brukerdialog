const nb = {
    'dagerMedTid.mandager': 'Mandager',
    'dagerMedTid.tirsdager': 'Tirsdager',
    'dagerMedTid.onsdager': 'Onsdager',
    'dagerMedTid.torsdager': 'Torsdager',
    'dagerMedTid.fredager': 'Fredager',
    'dagerMedTid.ingenDagerRegistrert': 'Ingen dager registrert.',
    'dagerMedTid.normaltTimer': 'Normalt {timer}',
    'dagerMedTid.uke': 'Uke {uke}',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const dagerMedTidMessages = { nb, nn };
