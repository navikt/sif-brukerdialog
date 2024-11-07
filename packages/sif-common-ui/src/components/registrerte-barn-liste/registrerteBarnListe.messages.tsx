import { FormattedMessage } from 'react-intl';

const nb = {
    'registrerteBarnListe.ingenbarn': 'Vi fant ikke noen barn registrert på deg.',
    'registrerteBarnListe.helpTextTooltip': 'Hvor kommer listen av barn fra?',
    'registrerteBarnListe.kilde':
        'Listen viser barn registrert på deg hos Folkeregisteret. Hvis dette ikke stemmer, kan du kontakte Skatteetaten.',
    'registrertBarnListe.barn.født': 'Født {dato}',
};

type MessageKeys = keyof typeof nb;

const nn: Record<MessageKeys, string> = {
    'registrerteBarnListe.ingenbarn': 'Vi fann ikkje nokon barn registrert på deg.',
    'registrerteBarnListe.helpTextTooltip': 'Kor kjem lista over barn frå?',
    'registrerteBarnListe.kilde':
        'Lista viser barn registrert på deg hos Folkeregisteret. Viss dette ikkje stemmer, kan du kontakte Skatteetaten.',
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
