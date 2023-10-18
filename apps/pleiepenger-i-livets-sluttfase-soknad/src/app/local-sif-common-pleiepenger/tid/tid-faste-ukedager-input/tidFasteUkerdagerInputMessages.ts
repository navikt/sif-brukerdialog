import { ComponentMessages } from '../../i18n';

interface Messages {
    Mandager: string;
    Tirsdager: string;
    Onsdager: string;
    Torsdager: string;
    Fredager: string;
    mandag: string;
    tirsdag: string;
    onsdag: string;
    torsdag: string;
    fredag: string;
}

const nb: Messages = {
    Mandager: 'Mandager',
    Tirsdager: 'Tirsdager',
    Onsdager: 'Onsdager',
    Torsdager: 'Torsdager',
    Fredager: 'Fredager',
    mandag: 'mandag',
    tirsdag: 'tirsdag',
    onsdag: 'onsdag',
    torsdag: 'torsdag',
    fredag: 'fredag',
};

export const tidUkerdagerInputMessages: ComponentMessages<Messages> = {
    nb: nb,
};

export const getTidFasteUkerdagerInputMessages = (locale: string): Messages => {
    switch (locale) {
        case 'nn':
            return tidUkerdagerInputMessages.nn;
        default:
            return tidUkerdagerInputMessages.nb;
    }
};
