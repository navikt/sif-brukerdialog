const nb = {
    'steg.medlemskap.stepIndicatorLabel': 'Om medlemskap i folketrygden',
    'steg.medlemskap.nextButtonLabel': 'Fortsett',
    'steg.medlemskap.annetLandSiste12.spm': 'Har du bodd i utlandet i hele eller deler av de siste 12 månedene?',
    'steg.medlemskap.annetLandNeste12.spm': 'Planlegger du å bo i utlandet i hele eller deler av de neste 12 månedene?',
    'steg.medlemskap.annetLandSiste12.hjelp':
        'Du svarer ja bare hvis du har oppholdt deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
    'steg.medlemskap.annetLandSiste12.listeTittel': 'Utenlandsopphold siste 12 måneder',
    'steg.medlemskap.annetLandNeste12.hjelp':
        'Du svarer ja bare hvis du planlegger å oppholde deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
    'steg.medlemskap.annetLandNeste12.listeTittel': 'Utenlandsopphold neste 12 måneder',
    'steg.medlemskap.annetLandSisteOgNeste12.listeTittel': 'Utenlandsopphold siste 12 måneder og neste 12 måneder',
    'steg.medlemskap.info.1':
        'Medlemskap i folketrygden er nøkkelen til rettigheter fra NAV. Hvis du bor eller jobber i Norge er du vanligvis medlem. Du kan lese mer om medlemskap på ',
    'steg.medlemskap.info.2': 'nav.no',
    'steg.medlemskap.hvaBetyrDette': 'Hva betyr dette?',
    'steg.medlemskap.utenlandsopphold.leggTilLabel': 'Legg til nytt utenlandsopphold',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const medlemskapMessages = { nb, nn };
