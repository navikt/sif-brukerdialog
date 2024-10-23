import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    '@forms.tidsperiode.form.title': 'Tidsperiode',
    '@forms.tidsperiode.form.intervalTitle': 'Velg fra og til tidsrom',
    '@forms.tidsperiode.form.fromDate': 'Fra og med',
    '@forms.tidsperiode.form.toDate': 'Til og med',
    '@forms.tidsperiode.form.okButton': 'Ok',
    '@forms.tidsperiode.form.cancelButton': 'Avbryt',
    '@forms.tidsperiodeForm.fom.dateHasNoValue':
        'Du må oppgi når perioden startet. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.tidsperiodeForm.fom.dateIsAfterMax':
        'Datoen for når perioden startet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.tidsperiodeForm.fom.dateIsBeforeMin':
        'Datoen for når perioden startet kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.tidsperiodeForm.fom.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden startet i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.tidsperiodeForm.fom.fromDateIsAfterToDate':
        'Startdatoen for perioden må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.tidsperiodeForm.tom.dateHasNoValue':
        'Du må oppgi når perioden sluttet. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.tidsperiodeForm.tom.dateIsAfterMax':
        'Datoen for når perioden sluttet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.tidsperiodeForm.tom.dateIsBeforeMin':
        'Datoen for når perioden sluttet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.tidsperiodeForm.tom.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden sluttet i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.tidsperiodeForm.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for perioden kan ikke være før startdatoen. Skriv inn eller velg dato fra datovelgeren.',
};

const nn: Record<keyof typeof nb, string> = {
    '@forms.tidsperiode.form.title': 'Tidsperiode',
    '@forms.tidsperiode.form.intervalTitle': 'Vel frå og til tidsrom',
    '@forms.tidsperiode.form.fromDate': 'Frå og med',
    '@forms.tidsperiode.form.toDate': 'Til og med',
    '@forms.tidsperiode.form.okButton': 'Ok',
    '@forms.tidsperiode.form.cancelButton': 'Avbryt',
    '@forms.tidsperiodeForm.fom.dateHasNoValue':
        'Du må oppgi når perioden starta. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.tidsperiodeForm.fom.dateIsAfterMax':
        'Datoen for når perioden starta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.tidsperiodeForm.fom.dateIsBeforeMin':
        'Datoen for når perioden starta kan ikkje vera før {dato}. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.tidsperiodeForm.fom.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden starta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.tidsperiodeForm.fom.fromDateIsAfterToDate':
        'Startdatoen for perioden må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.tidsperiodeForm.tom.dateHasNoValue':
        'Du må oppgi når perioden slutta. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.tidsperiodeForm.tom.dateIsAfterMax':
        'Datoen for når perioden slutta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.tidsperiodeForm.tom.dateIsBeforeMin':
        'Datoen for når perioden slutta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.tidsperiodeForm.tom.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden slutta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.tidsperiodeForm.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for perioden kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
};

export type TidsperiodeMessageKeys = keyof typeof nb;

export const tidsperiodeMessages = {
    nb,
    nn,
};

export const useTidsperiodeIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<TidsperiodeMessageKeys>(intl);
};
