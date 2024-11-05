const nb = {
    'step.omBarna.listHeader.registrerteBarn': 'Registrerte barn',
    'step.omBarna.registrerteBarn.kilde':
        'Nedenfor ser du barn som er registrert på deg hos Folkeregisteret. Hvis noe ikke stemmer, kan du legge til barn, eller kontakte Skatteetaten.',
    'step.omBarna.spm.andreBarn': 'Har du andre barn?',
    'step.omBarna.spm.flereBarn': 'Har du flere barn?',
    'step.omBarna.info.ingenbarn.2': 'Du må legge til minst ett barn for å kunne gå videre.',
    'step.omBarna.info.spm.text':
        'Har du barn som ikke er registrert her, kan du legge inn disse selv. Det kan for eksempel være fosterbarn.',
    'step.omBarna.født': 'Født',

    'step.omBarna.listDialog.knapplabel': 'Legg til barn',
    'step.omBarna.listDialog.listTitle': 'Andre barn',
    'step.omBarna.listDialog.modalTitle': 'Legg til barn',

    'step.omBarna.nextButtonLabel': 'Fortsett',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const omBarnaMessages = { nb, nn };
