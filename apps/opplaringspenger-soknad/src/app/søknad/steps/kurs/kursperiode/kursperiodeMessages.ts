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
    'kursperiodeForm.avreise.dateHasNoValue':
        'Du må oppgi når avreise til kurset er. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.avreise.dateIsAfterMax':
        'Datoen for avreise kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.avreise.dateIsBeforeMin':
        'Datoen for avreise kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.avreise.dateHasInvalidFormat':
        'Du må oppgi dato for avreise i et gyldig format. Gyldig format er dd.mm.åååå.',
    'kursperiodeForm.hjemkomst.dateHasNoValue':
        'Du må oppgi når avreise til kurset er. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.hjemkomst.dateIsAfterMax':
        'Datoen for avreise kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.hjemkomst.dateIsBeforeMin':
        'Datoen for avreise kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiodeForm.hjemkomst.dateHasInvalidFormat':
        'Du må oppgi dato for avreise i et gyldig format. Gyldig format er dd.mm.åååå.',

    'kursperiodeForm.avreiseSammeDag.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du reiser samme dag som kurset starter.',
    'kursperiodeForm.hjemkomstSammeDag.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du kommer hjem samme dag som kurset slutter.',

    'kursperiodeForm.begrunnelseReisetidFra.stringHasNoValue':
        'Du må oppgi en beskrivelse av årsak til at avreisedato er over én dag etter sluttdato.',
    'kursperiodeForm.begrunnelseReisetidFra.stringIsTooLong':
        'Beskrivelsen av årsak til avreisedato kan ikke være lengre enn 500 tegn.',
    'kursperiodeForm.begrunnelseReisetidFra.stringIsTooShort':
        'Beskrivelsen av årsak til avreisedato må være minst 5 tegn.',
    'kursperiodeForm.begrunnelseReisetidFra.stringContainsUnicodeChacters':
        'Beskrivelsen årsak til avreisedato kan ikke inneholde spesialtegn.',

    'kursperiodeForm.beskrivelseReisetidTil.stringHasNoValue':
        'Du må oppgi en beskrivelse av årsak til at hjemkomstdato er over én dag etter sluttdato.',
    'kursperiodeForm.beskrivelseReisetidTil.stringIsTooLong':
        'Beskrivelsen av årsak til hjemkomstdato kan ikke være lengre enn 500 tegn.',
    'kursperiodeForm.beskrivelseReisetidTil.stringIsTooShort':
        'Beskrivelsen av årsak til hjemkomstdato må være minst 5 tegn.',
    'kursperiodeForm.beskrivelseReisetidTil.stringContainsUnicodeChacters':
        'Beskrivelsen årsak til hjemkomstdato kan ikke inneholde spesialtegn.',
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
