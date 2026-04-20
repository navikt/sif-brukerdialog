import { utenlandsoppholdMessages_nb } from './nb';

export const utenlandsoppholdMessages_nn: Record<keyof typeof utenlandsoppholdMessages_nb, string> = {
    '@sifSoknadForms.utenlandsopphold.dialog.tittel': 'Utanlandsopphald',
    '@sifSoknadForms.utenlandsopphold.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.utenlandsopphold.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.utenlandsopphold.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.utenlandsopphold.form.tidsperiode.legend': 'Vel tidsperiode for opphaldet',
    '@sifSoknadForms.utenlandsopphold.form.fom.label': 'Frå og med',
    '@sifSoknadForms.utenlandsopphold.form.tom.label': 'Til og med',
    '@sifSoknadForms.utenlandsopphold.form.land.label': 'Vel land',
    '@sifSoknadForms.utenlandsopphold.form.erSammenMedBarnet.legend': 'Er barnet saman med deg til {land}?',
    '@sifSoknadForms.utenlandsopphold.form.erBarnetInnlagt.legend': 'Er barnet innlagd i helseinstitusjon i {land}?',
    '@sifSoknadForms.utenlandsopphold.form.barnInnlagtPerioder.legend': 'Periode(r) barnet er innlagd',
    '@sifSoknadForms.utenlandsopphold.form.barnInnlagtPerioder.leggTil': 'Legg til periode barnet er innlagd',
    '@sifSoknadForms.utenlandsopphold.form.årsak.legend': 'Korleis blir utgiftene dekte til innlegginga?',
    '@sifSoknadForms.utenlandsopphold.form.årsak.BARNET_INNLAGT_I_HELSEINSTITUSJON_FOR_NORSK_OFFENTLIG_REGNING':
        'For norsk offentleg rekning',
    '@sifSoknadForms.utenlandsopphold.form.årsak.BARNET_INNLAGT_I_HELSEINSTITUSJON_DEKKET_ETTER_AVTALE_MED_ET_ANNET_LAND_OM_TRYGD':
        'Etter trygdeavtale med eit anna land',
    '@sifSoknadForms.utenlandsopphold.form.årsak.ANNET': 'Eg dekkjer utgiftene sjølv',
    '@sifSoknadForms.utenlandsoppholdForm.validation.fom.dateHasNoValue':
        'Du må oppgje når utanlandsopphaldet starta. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.fom.dateHasInvalidFormat':
        'Du må oppgje dato for når utanlandsopphaldet starta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.fom.dateIsBeforeMin':
        'Datoen utanlandsopphaldet starta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.fom.dateIsAfterMax':
        'Datoen utanlandsopphaldet starta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.fom.fromDateIsAfterToDate':
        'Startdatoen for utanlandsopphaldet må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.tom.dateHasNoValue':
        'Du må oppgje når utanlandsopphaldet slutta. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.tom.dateHasInvalidFormat':
        'Du må oppgje dato for når utanlandsopphaldet slutta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.tom.dateIsBeforeMin':
        'Datoen utanlandsopphaldet slutta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.tom.dateIsAfterMax':
        'Datoen utanlandsopphaldet slutta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for utanlandsopphaldet kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.landkode.noValue': 'Du må velja land.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.erSammenMedBarnet.yesOrNoIsUnanswered':
        'Du må svara ja eller nei på om barnet er saman med deg.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.erBarnetInnlagt.yesOrNoIsUnanswered':
        'Du må svara ja eller nei på om barnet er innlagd i helseinstitusjon.',
    '@sifSoknadForms.utenlandsoppholdForm.validation.årsak.noValue':
        'Du må velja korleis utgiftene til innlegginga blir dekte.',
};
