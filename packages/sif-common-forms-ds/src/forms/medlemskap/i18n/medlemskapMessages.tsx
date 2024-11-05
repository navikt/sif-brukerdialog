import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';

const nb = {
    '@forms.medlemskapForm.annetLandSiste12.spm': 'Har du bodd i utlandet i hele eller deler av de siste 12 månedene?',
    '@forms.medlemskapForm.annetLandNeste12.spm':
        'Planlegger du å bo i utlandet i hele eller deler av de neste 12 månedene?',
    '@forms.medlemskapForm.annetLandSiste12.hjelp':
        'Du svarer ja bare hvis du har oppholdt deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
    '@forms.medlemskapForm.annetLandSiste12.listeTittel': 'Utenlandsopphold siste 12 måneder',
    '@forms.medlemskapForm.annetLandNeste12.hjelp':
        'Du svarer ja bare hvis du planlegger å oppholde deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
    '@forms.medlemskapForm.annetLandNeste12.listeTittel': 'Utenlandsopphold neste 12 måneder',
    '@forms.medlemskapForm.annetLandSisteOgNeste12.listeTittel':
        'Utenlandsopphold siste 12 måneder og neste 12 måneder',
    '@forms.medlemskapForm.info':
        'Medlemskap i folketrygden er nøkkelen til rettigheter fra NAV. Hvis du bor eller jobber i Norge er du vanligvis medlem. Du kan lese mer om medlemskap på <Lenke>nav.no</Lenke>.',
    '@forms.medlemskapForm.hvaBetyrDette': 'Hva betyr dette?',
    '@forms.medlemskapForm.utenlandsopphold.leggTilLabel': 'Legg til utenlandsopphold',
    '@forms.medlemskapForm.validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på om du har bodd i utlandet i hele eller deler av de siste 12 månedene.',
    '@forms.medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har ikke registrert noen utenlandsopphold for de siste 12 månedene.',
    '@forms.medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
        'Ett eller flere av utenlandsoppholdene de siste 12 månedene har datoer som overlapper.',
    '@forms.medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode':
        'Ett eller flere av utenlandsoppholdene de siste 12 månedene er utenfor tillatt tidsrom.',
    '@forms.medlemskapForm.validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på om du planlegger å bo i utlandet i hele eller deler av de neste 12 månedene.',
    '@forms.medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har ikke registrert noen utenlandsopphold for de neste 12 månedene.',
    '@forms.medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
        'Ett eller flere av utenlandsoppholdene de neste 12 månedene har datoer som overlapper.',
    '@forms.medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode':
        'Ett eller flere av utenlandsoppholdene de neste 12 månedene er utenfor tillatt tidsrom.',

    '@forms.medlemskapForm.summary.header': 'Medlemskap i folketrygden',
    '@forms.medlemskapForm.summary.utlandetSiste12.header': 'Har bodd i utlandet i de siste 12 månedene',
    '@forms.medlemskapForm.summary.utlandetNeste12.header': 'Skal bo i utlandet i de neste 12 månedene',
    '@forms.medlemskapForm.summary.utlandetSiste12.liste.header': 'Utenlandsopphold siste 12 måneder',
    '@forms.medlemskapForm.summary.utlandetNeste12.liste.header': 'Utenlandsopphold neste 12 måneder',
    '@forms.medlemskapForm.summary.tidsperiode': '{fraOgMed} - {tilOgMed}: {landnavn}',
};

const nn: Record<keyof typeof nb, string> = {
    '@forms.medlemskapForm.annetLandSiste12.spm':
        'Har du budd i utlandet i heile eller deler av dei siste 12 månadene?',
    '@forms.medlemskapForm.annetLandNeste12.spm':
        'Planlegg du å bu i utlandet i heile eller deler av dei neste 12 månadene?',
    '@forms.medlemskapForm.annetLandSiste12.hjelp':
        'Du svarer ja berre viss du har opphalde deg fast i eit anna land enn Noreg. Korte utlandsturar i samband med til dømes ferie blir ikkje rekna med.',
    '@forms.medlemskapForm.annetLandSiste12.listeTittel': 'Utanlandsopphald siste 12 månader',
    '@forms.medlemskapForm.annetLandNeste12.hjelp':
        'Du svarer ja berre viss du planlegg å opphalde deg fast i eit anna land enn Noreg. Korte utlandsturar i samband med til dømes ferie blir ikkje rekna med.',
    '@forms.medlemskapForm.annetLandNeste12.listeTittel': 'Utanlandsopphald neste 12 månader',
    '@forms.medlemskapForm.annetLandSisteOgNeste12.listeTittel':
        'Utanlandsopphald siste 12 månader og neste 12 månader',
    '@forms.medlemskapForm.info':
        'Medlemskap i folketrygda er nøkkelen til rettar frå NAV. Viss du bur eller jobbar i Noreg er du vanlegvis medlem. Du kan lesa meir om medlemskap på <Lenke>nav.no</Lenke>.',
    '@forms.medlemskapForm.hvaBetyrDette': 'Kva betyr dette?',
    '@forms.medlemskapForm.utenlandsopphold.leggTilLabel': 'Legg til utanlandsopphald',
    '@forms.medlemskapForm.validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
        'Du må svara på om du har budd i utlandet i heile eller deler av dei siste 12 månadene.',
    '@forms.medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har ikkje registrert nokon utanlandsopphald for dei siste 12 månadene.',
    '@forms.medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
        'Eitt eller fleire av utanlandsopphalda dei siste 12 månadene har datoar som overlappar.',
    '@forms.medlemskapForm.validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode':
        'Eitt eller fleire av utanlandsopphalda dei siste 12 månadene er utanfor tillatne tidsrom.',
    '@forms.medlemskapForm.validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
        'Du må svara på om du planlegg å bu i utlandet i heile eller deler av dei neste 12 månadene.',
    '@forms.medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har ikkje registrert nokon utanlandsopphald for dei neste 12 månadene.',
    '@forms.medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
        'Eitt eller fleire av utanlandsopphalda dei neste 12 månadene har datoar som overlappar.',
    '@forms.medlemskapForm.validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode':
        'Eitt eller fleire av utanlandsopphalda dei neste 12 månadene er utanfor tillatne tidsrom.',
    '@forms.medlemskapForm.summary.header': 'Medlemskap i folketrygda',
    '@forms.medlemskapForm.summary.utlandetSiste12.header': 'Har budd i utlandet i dei siste 12 månadene',
    '@forms.medlemskapForm.summary.utlandetNeste12.header': 'Skal bu i utlandet i dei neste 12 månadene',
    '@forms.medlemskapForm.summary.utlandetSiste12.liste.header': 'Utanlandsopphald siste 12 månader',
    '@forms.medlemskapForm.summary.utlandetNeste12.liste.header': 'Utanlandsopphald neste 12 månader',
    '@forms.medlemskapForm.summary.tidsperiode': '{fraOgMed} - {tilOgMed}: {landnavn}',
};

export type MedlemskapFormMessageKeys = keyof typeof nb;

export const useMedlemskapFormIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<MedlemskapFormMessageKeys>(intl);
};

export const MedlemskapFormText = (props: { id: MedlemskapFormMessageKeys; values?: any }) => {
    return <FormattedMessage {...props} />;
};

export const medlemskapFormMessages = { nb, nn };
