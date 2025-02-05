const nb = {
    'step.medlemskap.pageTitle': 'Pleiepengesøknad - medlemskap',
    'step.medlemskap.stepTitle': 'Medlemskap',
    'step.medlemskap.veileder':
        'Medlemskap i folketrygden er nøkkelen til rettigheter fra Nav. Hvis du bor eller jobber i Norge er du vanligvis medlem. Du kan lese mer om medlemskap på',
    'step.medlemskap.stepIndicatorLabel': 'Om medlemskap i folketrygden',
    'step.medlemskap.leggTilKnapp': 'Legg til nytt utenlandsopphold',
    'step.medlemskap.utenlandsoppholdSiste12': 'Utenlandsopphold siste 12 måneder',
    'step.medlemskap.utenlandsoppholdNeste12': 'Utenlandsopphold neste 12 måneder',

    'steg.medlemsskap.annetLandSiste12.spm': 'Har du bodd i utlandet i hele eller deler av de siste 12 månedene?',
    'steg.medlemsskap.annetLandNeste12.spm':
        'Planlegger du å bo i utlandet i hele eller deler av de neste 12 månedene?',
    'steg.medlemsskap.annetLandSiste12.hjelp':
        'Du svarer ja bare hvis du har oppholdt deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
    'steg.medlemsskap.annetLandSiste12.listeTittel': 'Utenlandsopphold siste 12 måneder',
    'steg.medlemsskap.annetLandNeste12.hjelp':
        'Du svarer ja bare hvis du planlegger å oppholde deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
    'steg.medlemsskap.annetLandNeste12.listeTittel': 'Utenlandsopphold neste 12 måneder',

    'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har bodd i utlandet i hele eller deler av de siste 12 månedene.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har oppgitt at du har vært i utlandet de siste 12 månedene. Du må registrere dette utenlandsoppholdet.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
        'Ett eller flere av utenlandsoppholdene du har lagt inn for de siste 12 månedene, har datoer som overlapper hverandre.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode':
        'Ett eller flere av utenlandsoppholdene du har lagt inn for de siste 12 månedene, har datoer som ikke er innenfor siste 12 måneder.',
    'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du planlegger å bo i utlandet i hele eller deler av de neste 12 månedene.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har oppgitt at du skal oppholde deg i utlandet de neste 12 månedene. Du må registrere dette utenlandsoppholdet.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
        'Ett eller flere av utenlandsoppholdene du har lagt inn for de neste 12 månedene, har datoer som overlapper hverandre.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode':
        'Ett eller flere av utenlandsoppholdene du har lagt inn for de neste 12 månedene, har datoer som ikke er innenfor neste 12 måneder.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const medlemskapMessages = {
    nb,
    nn,
};
