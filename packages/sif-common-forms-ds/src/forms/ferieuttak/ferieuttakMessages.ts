import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

const nb = {
    '@forms.ferieuttak.list.title': 'Registrer uttak av ferie',
    '@forms.ferieuttak.list.fromDate': 'Fra og med',
    '@forms.ferieuttak.list.toDate': 'Til og med',
    '@forms.ferieuttak.list.intervalTitle': 'Velg tidsrom',
    '@forms.ferieuttak.list.okButton': 'Ok',
    '@forms.ferieuttak.list.cancelButton': 'Avbryt',
    '@forms.ferieuttakForm.from.dateHasNoValue':
        'Du må oppgi når ferien starter. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.ferieuttakForm.from.dateIsAfterMax':
        'Datoen for når ferien starter kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.ferieuttakForm.from.dateIsBeforeMin':
        'Datoen for når ferien starter kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.ferieuttakForm.from.dateHasInvalidFormat':
        'Du må oppgi dato for når ferien starter i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.ferieuttakForm.from.fromDateIsAfterToDate':
        'Startdatoen for ferien må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.ferieuttakForm.from.dateIsNotWeekday': 'Startdatoen for ferien kan ikke være på en helgedag.',
    '@forms.ferieuttakForm.to.dateHasNoValue':
        'Du må oppgi når ferien slutter. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.ferieuttakForm.to.dateIsAfterMax':
        'Datoen for når ferien slutter kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.ferieuttakForm.to.dateIsBeforeMin':
        'Datoen for når ferien slutter kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.ferieuttakForm.to.dateHasInvalidFormat':
        'Du må oppgi dato for når ferien slutter i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.ferieuttakForm.to.toDateIsBeforeFromDate':
        'Sluttdatoen for ferien kan ikke være før startdatoen. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.ferieuttakForm.to.dateIsNotWeekday': 'Datoen for når ferien slutter kan ikke være på en helgedag.',
};

const nn: Record<keyof typeof nb, string> = {
    '@forms.ferieuttak.list.title': 'Registrer uttak av ferie',
    '@forms.ferieuttak.list.fromDate': 'Frå og med',
    '@forms.ferieuttak.list.toDate': 'Til og med',
    '@forms.ferieuttak.list.intervalTitle': 'Vel tidsrom',
    '@forms.ferieuttak.list.okButton': 'Ok',
    '@forms.ferieuttak.list.cancelButton': 'Avbryt',
    '@forms.ferieuttakForm.from.dateHasNoValue':
        'Du må oppgi når ferien startar. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.from.dateIsAfterMax':
        'Datoen for når ferien startar kan ikkje vera etter dagens dato. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.from.dateIsBeforeMin':
        'Datoen for når ferien startar kan ikkje vera før {dato}. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.ferieuttakForm.from.dateHasInvalidFormat':
        'Du må oppgi dato for når ferien startar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.ferieuttakForm.from.fromDateIsAfterToDate':
        'Startdatoen for ferien må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.from.dateIsNotWeekday': 'Startdatoen for ferien kan ikkje vera på ein helgedag.',
    '@forms.ferieuttakForm.to.dateHasNoValue':
        'Du må oppgi når ferien sluttar. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.to.dateIsAfterMax':
        'Datoen for når ferien sluttar kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.to.dateIsBeforeMin':
        'Datoen for når ferien sluttar kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.to.dateHasInvalidFormat':
        'Du må oppgi dato for når ferien sluttar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.ferieuttakForm.to.toDateIsBeforeFromDate':
        'Sluttdatoen for ferien kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.ferieuttakForm.to.dateIsNotWeekday': 'Datoen for når ferien sluttar kan ikkje vera på ein helgedag.',
};

export type FerieuttakMessageKeys = keyof typeof nb;

export const useFerieuttakIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<FerieuttakMessageKeys>(intl);
};

export const ferieuttakMessages = {
    nb,
    nn,
};
