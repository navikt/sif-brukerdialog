const nb = {
    'medlemskapForm.annetLandSiste12.spm': 'Har du bodd i utlandet i hele eller deler av de siste 12 månedene?',
    'medlemskapForm.annetLandNeste12.spm': 'Planlegger du å bo i utlandet i hele eller deler av de neste 12 månedene?',
    'medlemskapForm.annetLandSiste12.hjelp':
        'Du svarer ja bare hvis du har oppholdt deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
    'medlemskapForm.annetLandSiste12.listeTittel': 'Utenlandsopphold siste 12 måneder',
    'medlemskapForm.annetLandNeste12.hjelp':
        'Du svarer ja bare hvis du planlegger å oppholde deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
    'medlemskapForm.annetLandNeste12.listeTittel': 'Utenlandsopphold neste 12 måneder',
    'medlemskapForm.annetLandSisteOgNeste12.listeTittel': 'Utenlandsopphold siste 12 måneder og neste 12 måneder',
    'medlemskapForm.info':
        'Medlemskap i folketrygden er nøkkelen til rettigheter fra NAV. Hvis du bor eller jobber i Norge er du vanligvis medlem. Du kan lese mer om medlemskap på <Lenke>nav.no</Lenke>.',
    'medlemskapForm.hvaBetyrDette': 'Hva betyr dette?',
    'medlemskapForm.utenlandsopphold.leggTilLabel': 'Legg til utenlandsopphold',
    'medlemskapForm.validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på om du har bodd i utlandet i hele eller deler av de siste 12 månedene.',
    'medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har ikke registrert noen utenlandsopphold for de siste 12 månedene.',
    'medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
        'Ett eller flere av utenlandsoppholdene de siste 12 månedene har datoer som overlapper.',
    'medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode':
        'Ett eller flere av utenlandsoppholdene de siste 12 månedene er utenfor tillatt tidsrom.',
    'medlemskapForm.validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på om du planlegger å bo i utlandet i hele eller deler av de neste 12 månedene.',
    'medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har ikke registrert noen utenlandsopphold for de neste 12 månedene.',
    'medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
        'Ett eller flere av utenlandsoppholdene de neste 12 månedene har datoer som overlapper.',
    'medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode':
        'Ett eller flere av utenlandsoppholdene de neste 12 månedene er utenfor tillatt tidsrom.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const medlemskapFormMessages = { nb, nn };
