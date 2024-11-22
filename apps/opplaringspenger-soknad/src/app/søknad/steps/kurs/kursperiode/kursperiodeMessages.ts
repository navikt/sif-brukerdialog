import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    'kursperiode.form.title': 'Kursperiode',
    'kursperiode.form.intervalTitle': 'Velg fra og til tidsrom',
    'kursperiode.form.fromDate': 'Fra og med',
    'kursperiode.form.toDate': 'Til og med',
    'kursperiode.form.okButton': 'Ok',
    'kursperiode.form.cancelButton': 'Avbryt',
    'kursperiode.form.periode.label': 'Når starter og slutter opplæringen?',
    'kursperiode.form.avreiseSammeDag.label': 'Reiser du til kursstedet på samme dag som kurset starter?',
    'kursperiode.form.avreise.label': 'Hvilken dato reiser du til kursstedet?',
    'kursperiode.form.beskrivelseReisetidTil.label': 'Beskrivelse av årsaken til reisetiden til kurssted',
    'kursperiode.form.beskrivelseReisetidTil.description':
        'Fordi det er mer enn én dag mellom avreise og startdato, må du beskrive reisetiden til kursstedet.',
    'kursperiode.form.hjemkomstSammeDag.label': 'Kommer du hjem fra kursstedet på samme dag som kurset slutter?',
    'kursperiode.form.hjemkomst.label': 'Hvilken dato kommer du hjem fra kursstedet',
    'kursperiode.form.beskrivelseReisetidHjem.label': 'Beskrivelse av årsaken til reisetiden fra kurssted',
    'kursperiode.form.beskrivelseReisetidHjem.description':
        'Fordi det er mer enn én dag mellom sluttdato og hjemkomst, må du beskrive reisetiden fra kursstedet.',

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
        'Du må oppgi en beskrivelse av årsaken til at avreisedatoen er over én dag etter sluttdato.',
    'kursperiodeForm.begrunnelseReisetidFra.stringIsTooLong':
        'Beskrivelsen av årsaken til avreisedatoen kan ikke være lengre enn 500 tegn.',
    'kursperiodeForm.begrunnelseReisetidFra.stringIsTooShort':
        'Beskrivelsen av årsaken til avreisedatoen må være minst 5 tegn.',
    'kursperiodeForm.begrunnelseReisetidFra.stringContainsUnicodeChacters':
        'Beskrivelsen årsaken til avreisedatoen kan ikke inneholde spesialtegn.',

    'kursperiodeForm.beskrivelseReisetidTil.stringHasNoValue':
        'Du må oppgi en beskrivelse av årsaken til aten hjemkomstdato er over én dag etter sluttdato.',
    'kursperiodeForm.beskrivelseReisetidTil.stringIsTooLong':
        'Beskrivelsen av årsaken til hjemkomstdatoen kan ikke være lengre enn 500 tegn.',
    'kursperiodeForm.beskrivelseReisetidTil.stringIsTooShort':
        'Beskrivelsen av årsaken til hjemkomstdatoen må være minst 5 tegn.',
    'kursperiodeForm.beskrivelseReisetidTil.stringContainsUnicodeChacters':
        'Beskrivelsen årsaken til hjemkomstdatoen kan ikke inneholde spesialtegn.',
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
