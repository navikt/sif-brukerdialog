import { FerieuttakMessageKeys } from '.';

export const ferieuttakMessages_nn: Record<FerieuttakMessageKeys, string> = {
    '@forms.ferieuttak.list.title': 'Registrer uttak av ferie',
    '@forms.ferieuttak.list.fromDate': 'Frå og med',
    '@forms.ferieuttak.list.toDate': 'Til og med',
    '@forms.ferieuttak.list.intervalTitle': 'Vel tidsrom',
    '@forms.ferieuttak.list.okButton': 'Ok',
    '@forms.ferieuttak.list.cancelButton': 'Avbryt',
    '@forms.ferieuttakForm.from.dateHasNoValue':
        'Du må oppgje når ferien startar. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.from.dateIsAfterMax':
        'Datoen for når ferien startar kan ikkje vera etter dagens dato. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.from.dateIsBeforeMin':
        'Datoen for når ferien startar kan ikkje vera før {dato}. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.ferieuttakForm.from.dateHasInvalidFormat':
        'Du må oppgje dato for når ferien startar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.ferieuttakForm.from.fromDateIsAfterToDate':
        'Startdatoen for ferien må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.from.dateIsNotWeekday': 'Startdatoen for ferien kan ikkje vera på ein helgedag.',
    '@forms.ferieuttakForm.to.dateHasNoValue':
        'Du må oppgje når ferien sluttar. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.to.dateIsAfterMax':
        'Datoen for når ferien sluttar kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.to.dateIsBeforeMin':
        'Datoen for når ferien sluttar kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.to.dateHasInvalidFormat':
        'Du må oppgje dato for når ferien sluttar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.ferieuttakForm.to.toDateIsBeforeFromDate':
        'Sluttdatoen for ferien kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.to.dateIsNotWeekday': 'Datoen for når ferien sluttar kan ikkje vera på ein helgedag.',
};
