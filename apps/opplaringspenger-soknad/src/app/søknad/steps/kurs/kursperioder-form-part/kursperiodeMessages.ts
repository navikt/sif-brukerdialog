import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    'kursperiode.form.periode.label': 'Periode {index}',
    'kursperiode.form.harTaptArbeidstid.label':
        'Har du tapt arbeidstid på grunn av reise til eller fra opplæringsstedet?',
    'kursperiode.form.avreise.label': 'Når reiser du til opplæringsstedet?',
    'kursperiode.form.hjemkomst.label': 'Når er du hjemme fra opplæringsstedet?',
    'kursperiode.form.beskrivelseReisetid.label': 'Årsak for reisetid over en dag',
    'kursperiode.form.beskrivelseReisetid.description':
        'Fordi du har oppgitt mer enn én dag med reise, må du beskrive årsaken til dette.',

    'kursperiode.form.fom.label': 'Fra og med',
    'kursperiode.form.fom.validation.dateHasNoValue':
        'Du må oppgi når perioden startet. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.fom.validation.dateIsAfterMax':
        'Datoen for når perioden startet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.fom.validation.dateIsBeforeMin':
        'Datoen for når perioden startet kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    'kursperiode.form.fom.validation.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden startet i et gyldig format. Gyldig format er dd.mm.åååå.',
    'kursperiode.form.fom.validation.fromDateIsAfterToDate':
        'Startdatoen for perioden må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',

    'kursperiode.form.tom.label': 'Til og med',
    'kursperiode.form.tom.validation.dateHasNoValue':
        'Du må oppgi når perioden sluttet. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.tom.validation.dateIsAfterMax':
        'Datoen for når perioden sluttet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.tom.validation.dateIsBeforeMin':
        'Datoen for når perioden sluttet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.tom.validation.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden sluttet i et gyldig format. Gyldig format er dd.mm.åååå.',
    'kursperiode.form.tom.validation.toDateIsBeforeFromDate':
        'Sluttdatoen for perioden kan ikke være før startdatoen. Skriv inn eller velg dato fra datovelgeren.',

    'kursperiode.form.avreise.validation.dateHasNoValue':
        'Du må oppgi når avreise til kurset er. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.avreise.validation.dateIsAfterMax':
        'Datoen for avreise kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.avreise.validation.dateIsBeforeMin':
        'Datoen for avreise kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.avreise.validation.dateHasInvalidFormat':
        'Du må oppgi dato for avreise i et gyldig format. Gyldig format er dd.mm.åååå.',

    'kursperiode.form.hjemkomst.validation.dateHasNoValue':
        'Du må oppgi når avreise til kurset er. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.hjemkomst.validation.dateIsAfterMax':
        'Datoen for avreise kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.hjemkomst.validation.dateIsBeforeMin':
        'Datoen for avreise kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.hjemkomst.validation.dateHasInvalidFormat':
        'Du må oppgi dato for avreise i et gyldig format. Gyldig format er dd.mm.åååå.',

    'kursperiode.form.harTaptArbeidstid.validation.yesOrNoIsUnanswered':
        'Du må svare på om du har tapt arbeidstid på grunn av reise til eller fra opplæringsstedet{harFlerePerioder, select, true { (periode {index})} other{}}.',

    'kursperiode.form.beskrivelseReisetid.stringHasNoValue':
        'Du må oppgi en beskrivelse av årsaken til at reisetiden er over én dag etter sluttdato.',
    'kursperiode.form.beskrivelseReisetid.stringIsTooLong':
        'Beskrivelsen av årsaken til reisetiden kan ikke være lengre enn 500 tegn.',
    'kursperiode.form.beskrivelseReisetid.stringIsTooShort':
        'Beskrivelsen av årsaken til reisetiden må være minst 5 tegn.',
    'kursperiode.form.beskrivelseReisetid.stringContainsUnicodeChacters':
        'Beskrivelsen årsaken til reisetiden kan ikke inneholde spesialtegn.',
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
