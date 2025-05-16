import { medlemskapMessages_nb } from './nb';

export const medlemskapMessages_nn: Record<keyof typeof medlemskapMessages_nb, string> = {
    'step.medlemskap.pageTitle': 'Pleiepengesøknad - medlemskap',
    'step.medlemskap.stepTitle': 'Medlemskap',
    'step.medlemskap.veileder':
        'Medlemskap i folketrygda er nøkkelen til rettar frå Nav. Om du bur eller jobbar i Noreg, er du vanlegvis medlem. Du kan lese meir om medlemskap på',
    'step.medlemskap.stepIndicatorLabel': 'Om medlemskap i folketrygda',
    'step.medlemskap.leggTilKnapp': 'Legg til nytt utanlandsopphald',
    'step.medlemskap.utenlandsoppholdSiste12': 'Utanlandsopphald siste 12 månader',
    'step.medlemskap.utenlandsoppholdNeste12': 'Utanlandsopphald neste 12 månader',

    'steg.medlemsskap.annetLandSiste12.spm': 'Har du budd i utlandet i heile eller delar av dei siste 12 månadene?',
    'steg.medlemsskap.annetLandNeste12.spm':
        'Planlegg du å bu i utlandet i heile eller delar av dei neste 12 månadene?',
    'steg.medlemsskap.annetLandSiste12.hjelp':
        'Du svarar ja berre om du har opphalde deg fast i eit anna land enn Noreg. Korte utanlandsturar i samband med for eksempel ferie blir ikkje rekna med.',
    'steg.medlemsskap.annetLandSiste12.listeTittel': 'Utanlandsopphald siste 12 månader',
    'steg.medlemsskap.annetLandNeste12.hjelp':
        'Du svarar ja berre om du planlegg å opphalde deg fast i eit anna land enn Noreg. Korte utanlandsturar i samband med for eksempel ferie blir ikkje rekna med.',
    'steg.medlemsskap.annetLandNeste12.listeTittel': 'Utanlandsopphald neste 12 månader',

    'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har budd i utlandet i heile eller delar av dei siste 12 månadene.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har oppgitt at du har vore i utlandet dei siste 12 månadene. Du må registrere dette utanlandsopphaldet.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
        'Eitt eller fleire av utanlandsopphalda du har lagt inn for dei siste 12 månadene, har datoar som overlappar kvarandre.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode':
        'Eitt eller fleire av utanlandsopphalda du har lagt inn for dei siste 12 månadene, har datoar som ikkje er innanfor dei siste 12 månadene.',
    'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du planlegg å bu i utlandet i heile eller delar av dei neste 12 månadene.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har oppgitt at du skal opphalde deg i utlandet dei neste 12 månadene. Du må registrere dette utanlandsopphaldet.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
        'Eitt eller fleire av utanlandsopphalda du har lagt inn for dei neste 12 månadene, har datoar som overlappar kvarandre.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode':
        'Eitt eller fleire av utanlandsopphalda du har lagt inn for dei neste 12 månadene, har datoar som ikkje er innanfor dei neste 12 månadene.',
};
