import { opptjeningUtlandMessages_nb } from './nb';

export const opptjeningUtlandMessages_nn: Record<keyof typeof opptjeningUtlandMessages_nb, string> = {
    '@sifSoknadForms.opptjeningUtland.dialog.tittel': 'Jobba i eit anna EØS-land',
    '@sifSoknadForms.opptjeningUtland.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.opptjeningUtland.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.opptjeningUtland.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.opptjeningUtland.form.tidsperiode.legend': 'Vel tidsperiode for jobb',
    '@sifSoknadForms.opptjeningUtland.form.fom.label': 'Frå og med',
    '@sifSoknadForms.opptjeningUtland.form.tom.label': 'Til og med',
    '@sifSoknadForms.opptjeningUtland.form.land.label': 'Vel land',
    '@sifSoknadForms.opptjeningUtland.form.opptjeningType.legend': 'Kva jobba du som?',
    '@sifSoknadForms.opptjeningUtland.form.opptjeningType.ARBEIDSTAKER': 'Arbeidstakar',
    '@sifSoknadForms.opptjeningUtland.form.opptjeningType.FRILANSER': 'Frilansar',
    '@sifSoknadForms.opptjeningUtland.form.arbeidsgiversNavn.label': 'Skriv inn namnet på arbeidsgjevaren',
    '@sifSoknadForms.opptjeningUtland.form.oppdragsgiverNavn.label': 'Skriv inn namnet på oppdragsgjevaren',
    '@sifSoknadForms.opptjeningUtland.list.jobbet_i': 'Jobba i',
    '@sifSoknadForms.opptjeningUtland.list.som': 'som',
    '@sifSoknadForms.opptjeningUtland.list.hos': 'hjå',
    '@sifSoknadForms.opptjeningUtland.list.aktivitet.ARBEIDSTAKER': 'arbeidstakar',
    '@sifSoknadForms.opptjeningUtland.list.aktivitet.FRILANSER': 'frilansar',
    '@sifSoknadForms.opptjeningUtlandForm.validation.fom.dateHasNoValue':
        'Du må oppgje når du starta å jobba. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.fom.dateHasInvalidFormat':
        'Du må oppgje dato for når du starta å jobba i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.fom.dateIsBeforeMin':
        'Datoen for når du starta å jobba kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.fom.dateIsAfterMax':
        'Datoen for når du starta å jobba kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.fom.fromDateIsAfterToDate':
        'Startdatoen for jobben må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.tom.dateHasNoValue':
        'Du må oppgje når du slutta å jobba. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.tom.dateHasInvalidFormat':
        'Du må oppgje dato for når du slutta å jobba i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.tom.dateIsBeforeMin':
        'Datoen for når du slutta å jobba kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.tom.dateIsAfterMax':
        'Datoen for når du slutta å jobba kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for jobben kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.landkode.noValue': 'Du må velja land.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.opptjeningType.noValue': 'Du må velja kva du jobba som.',
    '@sifSoknadForms.opptjeningUtlandForm.validation.navn.stringHasNoValue': 'Du må skriva inn namn.',
};
