import { FormattedMessage } from 'react-intl';

const nb = {
    'registrerteBarnListe.ingenbarn': 'Vi fant ikke noen barn registrert på deg.',
    'registrerteBarnListe.kilde':
        'Listen viser barn registrert på deg hos Folkeregisteret. Hvis dette ikke stemmer, kan du kontakte Skatteetaten.',
    'registrertBarnListe.barn.født': 'Født {dato}',
};

type MessageKeys = keyof typeof nb;

const nn: Record<MessageKeys, string> = {
    ...nb,
};

export function ComponentText<Keys extends string>(props: { id: Keys; values?: any }) {
    return <FormattedMessage {...props} />;
}

export const registrerteBarnMessages = {
    nb,
    nn,
};

export const RegistrerteBarnListText = ComponentText<MessageKeys>;
