import { barnStegMessages_nb } from './nb';

export const barnStegMessages_nn: Record<keyof typeof barnStegMessages_nb, string> = {
    'barnSteg.tittel': 'Barn',
    'barnSteg.beskrivelse': 'Viss du har barn, har du rett på barnetillegg i tillegg til aktivitetspengane.',
    'barnSteg.registrerteBarn.tittel': 'Barn me har registrert på deg:',
    'barnSteg.barnStemmer.ja.label': 'Ja',
    'barnSteg.barnStemmer.nei.label': 'Nei',
    'barnSteg.spørsmål.ingenBarn': 'Stemmer det at du ikkje har barn?',
    'barnSteg.spørsmål.harBarn': 'Stemmer opplysninga om {antallBarn, plural, one {barnet} other {barna}}?',
    'barnForm.validation.informasjonStemmer.yesOrNoIsUnanswered': 'Du må svare på om informasjonen stemmer',
    'barnSteg.opplysninger.info.tittel': 'Me hentar opplysningar frå Folkeregisteret',
    'barnSteg.opplysninger.info.text':
        'Du må vere registrert som forelder med foreldreansvar i Folkeregisteret for å ha rett på barnetillegg. Viss du meiner opplysningane frå Folkeregisteret er feil, må du ta kontakt med <Lenke>Skatteetaten</Lenke>. Hos Skatteetaten kan du registrere foreldreansvar.',
    'barnSteg.barnInfo.ingenBarn': 'Me har ikkje registrert at du har barn.',
};
