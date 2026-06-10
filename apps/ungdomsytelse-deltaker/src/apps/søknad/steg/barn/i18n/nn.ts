import { barnStegMessages_nb } from './nb';

export const barnStegMessages_nn: Record<keyof typeof barnStegMessages_nb, string> = {
    'barnSteg.tittel': 'Barn',
    'barnSteg.beskrivelse': 'Deltar du i ungdomsprogrammet og har barn, kan du ha rett på barnetillegg.',
    'barnSteg.registrerteBarn.tittel': 'Barn vi har registrert på deg:',
    'barnSteg.barnStemmer.ja.label': 'Ja',
    'barnSteg.barnStemmer.nei.label': 'Nei',
    'barnSteg.spørsmål.ingenBarn': 'Stemmer det at du ikkje har barn?',
    'barnSteg.spørsmål.harBarn': 'Stemmer opplysningen om {antallBarn, plural, one {barnet} other {barna}}?',
    'barnSteg.validering.ikkeSvart': 'Du må svare på om informasjonen stemmer',
    'barnSteg.validation.barnStemmer.yesOrNoIsUnanswered': 'Du må svare på om informasjonen stemmer',
    'barnSteg.opplysninger.info.tittel': 'Vi hentar opplysningar frå folkeregisteret',
    'barnSteg.opplysninger.info.text':
        'Du må vere registrert som forelder med foreldreansvar i Folkeregisteret for å ha rett på barnetillegg. Meiner du opplysningane frå Folkeregisteret er feil, må du ta <Lenke>kontakt med Skatteetaten</Lenke>. Hos Skatteetaten kan du registrere foreldreansvar.',
    'barnSteg.barnInfo.ingenBarn': 'Vi har ikkje registrert at du har barn.',
};
