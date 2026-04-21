import { ferieuttakMessages_nb } from './nb';

export const ferieuttakMessages_nn: Record<keyof typeof ferieuttakMessages_nb, string> = {
    '@sifSoknadForms.ferieuttak.dialog.tittel': 'Ferie',
    '@sifSoknadForms.ferieuttak.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.ferieuttak.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.ferieuttak.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.ferieuttak.form.tidsperiode.legend': 'Vel tidsrom',
    '@sifSoknadForms.ferieuttak.form.fom.label': 'Frå og med',
    '@sifSoknadForms.ferieuttak.form.tom.label': 'Til og med',
    '@sifSoknadForms.ferieuttakForm.validation.fom.dateHasNoValue':
        'Du må oppgje når ferien startar. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.ferieuttakForm.validation.fom.dateHasInvalidFormat':
        'Du må oppgje dato for når ferien startar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.ferieuttakForm.validation.fom.dateIsBeforeMin':
        'Datoen for når ferien startar kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.ferieuttakForm.validation.fom.dateIsAfterMax':
        'Datoen for når ferien startar kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.ferieuttakForm.validation.fom.fromDateIsAfterToDate':
        'Startdatoen for ferien må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.ferieuttakForm.validation.tom.dateHasNoValue':
        'Du må oppgje når ferien sluttar. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.ferieuttakForm.validation.tom.dateHasInvalidFormat':
        'Du må oppgje dato for når ferien sluttar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.ferieuttakForm.validation.tom.dateIsBeforeMin':
        'Datoen for når ferien sluttar kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.ferieuttakForm.validation.tom.dateIsAfterMax':
        'Datoen for når ferien sluttar kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.ferieuttakForm.validation.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for ferien kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
};
