import { FormattedMessage } from 'react-intl';

const nb = {
    'registrerteBarnListe.ingenbarn': 'Vi fant ikke noen barn registrert på deg.',
    'registrerteBarnListe.helpTextTooltip': 'Hvor kommer disse opplysningene fra?',
    'registrerteBarnListe.kilde':
        'Listen viser barn som er registrert på deg i Folkeregisteret. Hvis dette ikke stemmer, kan du kontakte Skatteetaten.',
    'registrertBarnListe.barn.født': 'Født {dato}',
};

type MessageKeys = keyof typeof nb;

const nn: Record<MessageKeys, string> = {
    'registrerteBarnListe.ingenbarn': 'Vi fann ikkje nokon barn registrert på deg.',
    'registrerteBarnListe.helpTextTooltip': 'Kvar kjem desse opplysningane frå?',
    'registrerteBarnListe.kilde':
        'Lista viser barn som er registrert på deg i Folkeregisteret. Viss dette ikkje stemmer, kan du kontakte Skatteetaten.',
    'registrertBarnListe.barn.født': 'Fødd {dato}',
};

export function ComponentText<Keys extends string>(props: { id: Keys; values?: any }) {
    return <FormattedMessage {...props} />;
}

export const registrerteBarnMessages = {
    nb,
    nn,
};

export const RegistrerteBarnListText = ComponentText<MessageKeys>;
