import { FormattedMessage } from 'react-intl';

export const registrerteBarnMessages_nb = {
    'registrerteBarnListe.ingenbarn': 'Vi fant ikke noen barn registrert på deg.',
    'registrerteBarnListe.helpTextTooltip': 'Hvor kommer disse opplysningene fra?',
    'registrerteBarnListe.kilde':
        'Listen viser barn som er registrert på deg i Folkeregisteret. Hvis dette ikke stemmer, kan du kontakte Skatteetaten.',
    'registrertBarnListe.barn.født': 'Født {dato}',
};

type MessageKeys = keyof typeof registrerteBarnMessages_nb;

export function ComponentText<Keys extends string>(props: { id: Keys; values?: any }) {
    return <FormattedMessage {...props} />;
}

export const RegistrerteBarnListText = ComponentText<MessageKeys>;
