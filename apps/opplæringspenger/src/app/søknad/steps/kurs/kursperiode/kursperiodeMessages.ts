import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    'kursperiode.form.title': 'Kursperiode',
    'kursperiode.form.intervalTitle': 'Velg fra og til tidsrom',
    'kursperiode.form.fromDate': 'Fra og med',
    'kursperiode.form.toDate': 'Til og med',
    'kursperiode.form.okButton': 'Ok',
    'kursperiode.form.cancelButton': 'Avbryt',
    'kursperiodeForm.fom.dateHasNoValue':
        'Du må oppgi når perioden startet. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.fom.dateIsAfterMax':
        'Datoen for når perioden startet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.fom.dateIsBeforeMin':
        'Datoen for når perioden startet kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    'kursperiodeForm.fom.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden startet i et gyldig format. Gyldig format er dd.mm.åååå.',
    'kursperiodeForm.fom.fromDateIsAfterToDate':
        'Startdatoen for perioden må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.tom.dateHasNoValue':
        'Du må oppgi når perioden sluttet. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.tom.dateIsAfterMax':
        'Datoen for når perioden sluttet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.tom.dateIsBeforeMin':
        'Datoen for når perioden sluttet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.tom.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden sluttet i et gyldig format. Gyldig format er dd.mm.åååå.',
    'kursperiodeForm.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for perioden kan ikke være før startdatoen. Skriv inn eller velg dato fra datovelgeren.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type KursperiodeMessageKeys = keyof typeof nb;

export const kursperiodeMessages = {
    nb,
    nn,
};

export const useKursperiodeIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<KursperiodeMessageKeys>(intl);
};
