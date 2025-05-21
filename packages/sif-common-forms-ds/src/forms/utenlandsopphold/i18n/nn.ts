import { UtenlandsoppholdMessageKeys } from '.';

export const utenlandsoppholdMessages_nn: Record<UtenlandsoppholdMessageKeys, string> = {
    '@forms.utenlandsopphold.list.add': 'Legg til opphald',
    '@forms.utenlandsopphold.form.tittel': 'Utenlandsopphald',
    '@forms.utenlandsopphold.form.tidsperiode.spm': 'Vel tidsperiode for opphaldet',
    '@forms.utenlandsopphold.form.tidsperiode.fraDato': 'Frå og med',
    '@forms.utenlandsopphold.form.tidsperiode.tilDato': 'Til og med',
    '@forms.utenlandsopphold.form.land.spm': 'Vel land',
    '@forms.utenlandsopphold.form.erSammenMedBarnet.spm': 'Er barnet saman med deg til {land}?',
    '@forms.utenlandsopphold.form.erBarnetInnlagt.spm': 'Er barnet innlagt i helseinstitusjon i {land}?',
    '@forms.utenlandsopphold.form.perioderBarnetErInnlag.formTitle': 'Periode barnet er innlagd',
    '@forms.utenlandsopphold.form.perioderBarnetErInnlag.addLabel': 'Legg til periode barnet er innlagd',
    '@forms.utenlandsopphold.form.perioderBarnetErInnlag.listTitle': 'periode(r) barnet er innlagd',
    '@forms.utenlandsopphold.form.årsak.spm': 'Korleis blir utgiftene dekte til innlegginga?',
    '@forms.utenlandsopphold.form.årsak.BARNET_INNLAGT_I_HELSEINSTITUSJON_FOR_NORSK_OFFENTLIG_REGNING':
        'For norsk offentleg rekning',
    '@forms.utenlandsopphold.form.årsak.BARNET_INNLAGT_I_HELSEINSTITUSJON_DEKKET_ETTER_AVTALE_MED_ET_ANNET_LAND_OM_TRYGD':
        'Etter trygdeavtale med eit anna land',
    '@forms.utenlandsopphold.form.årsak.ANNET': 'Eg dekkjer utgiftene sjølv',
    '@forms.utenlandsopphold.oppsummering.årsak.ANNET': 'Eg dekkjer utgiftene sjølv',
    '@forms.utenlandsopphold.form.ok': 'Legg til',
    '@forms.utenlandsopphold.form.avbryt': 'Avbryt',
    '@forms.utenlandsoppholdForm.fom.dateHasNoValue':
        'Du må oppgi når utanlandsopphaldet starta. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.utenlandsoppholdForm.fom.dateIsAfterMax':
        'Datoen for når utanlandsopphaldet starta kan ikkje vera etter dagens dato. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.utenlandsoppholdForm.fom.dateIsBeforeMin':
        'Datoen for når utanlandsopphaldet starta kan ikkje vera før {dato}. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.utenlandsoppholdForm.fom.dateHasInvalidFormat':
        'Du må oppgi dato for når utanlandsopphaldet starta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.utenlandsoppholdForm.fom.fromDateIsAfterToDate':
        'Startdatoen for utanlandsopphaldet må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.utenlandsoppholdForm.tom.dateHasNoValue':
        'Du må oppgi når utanlandsopphaldet slutta. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.utenlandsoppholdForm.tom.dateIsAfterMax':
        'Du har lagt inn eit utanlandsopphald som er utanfor søknadsperioden.',
    '@forms.utenlandsoppholdForm.tom.dateIsBeforeMin':
        'Datoen for når utanlandsopphaldet slutta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.utenlandsoppholdForm.tom.dateHasInvalidFormat':
        'Du må oppgi dato for når utanlandsopphaldet slutta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.utenlandsoppholdForm.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for utanlandsopphaldet kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.utenlandsoppholdForm.landkode.noValue': 'Du må velja land.',
    '@forms.utenlandsoppholdForm.årsak.noValue': 'Du må velja korleis utgiftene til innlegginga blir dekte.',
    '@forms.utenlandsoppholdForm.erBarnetInnlagt.yesOrNoIsUnanswered':
        'Du må svara ja eller nei på om barnet er innlagt i helseinstitusjon i {land}.',
    '@forms.utenlandsoppholdForm.barnInnlagtPerioder.listIsEmpty': 'Du har ikkje lagt til periode for innlegging.',
    '@forms.utenlandsoppholdForm.erSammenMedBarnet.yesOrNoIsUnanswered':
        'Du må svara ja eller nei på om barnet barnet saman med deg til {land}.',
};
