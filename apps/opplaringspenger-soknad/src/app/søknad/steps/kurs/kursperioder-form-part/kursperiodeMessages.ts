import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    'kursperiode.form.title': 'Kursperiode',
    'kursperiode.form.intervalTitle': 'Velg fra og til tidsrom',
    'kursperiode.form.fromDate': 'Fra og med',
    'kursperiode.form.toDate': 'Til og med',
    'kursperiode.form.okButton': 'Ok',
    'kursperiode.form.cancelButton': 'Avbryt',
    'kursperiode.form.periode.label': 'Periode {index}',
    'kursperiode.form.harTaptArbeidstid.label':
        'Har du tapt arbeidstid på grunn av reise til eller fra opplæringsstedet?',
    'kursperiode.form.avreiseSammeDag.label': 'Reiser du til kursstedet på samme dag som kurset starter?',
    'kursperiode.form.avreise.label': 'Når reiser du til opplæringsstedet?',
    'kursperiode.form.beskrivelseReisetidTil.label': 'Beskrivelse av årsaken til reisetiden til kurssted',
    'kursperiode.form.beskrivelseReisetidTil.description':
        'Fordi det er mer enn én dag mellom avreise og startdato, må du beskrive reisetiden til kursstedet.',
    'kursperiode.form.hjemkomstSammeDag.label': 'Kommer du hjem fra kursstedet på samme dag som kurset slutter?',
    'kursperiode.form.hjemkomst.label': 'Når er du hjemme fra opplæringsstedet?',
    'kursperiode.form.beskrivelseReisetidHjem.label': 'Beskrivelse av årsaken til reisetiden fra kurssted',
    'kursperiode.form.beskrivelseReisetidHjem.description':
        'Fordi det er mer enn én dag mellom sluttdato og hjemkomst, må du beskrive reisetiden fra kursstedet.',
    'kursperiode.form.beskrivelseReisetid.label': 'Årsak for reisetid over en dag',
    'kursperiode.form.beskrivelseReisetid.description':
        'Fordi du har oppgitt mer enn én dag med reise, må du beskrive årsaken til dette.',

    'kursperiode.form.fom.dateHasNoValue':
        'Du må oppgi når perioden startet. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.fom.dateIsAfterMax':
        'Datoen for når perioden startet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.fom.dateIsBeforeMin':
        'Datoen for når perioden startet kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    'kursperiode.form.fom.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden startet i et gyldig format. Gyldig format er dd.mm.åååå.',
    'kursperiode.form.fom.fromDateIsAfterToDate':
        'Startdatoen for perioden må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.tom.dateHasNoValue':
        'Du må oppgi når perioden sluttet. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.tom.dateIsAfterMax':
        'Datoen for når perioden sluttet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.tom.dateIsBeforeMin':
        'Datoen for når perioden sluttet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.tom.dateHasInvalidFormat':
        'Du må oppgi dato for når perioden sluttet i et gyldig format. Gyldig format er dd.mm.åååå.',
    'kursperiode.form.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for perioden kan ikke være før startdatoen. Skriv inn eller velg dato fra datovelgeren.',

    'kursperiode.form.avreise.dateHasNoValue':
        'Du må oppgi når avreise til kurset er. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.avreise.dateIsAfterMax':
        'Datoen for avreise kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.avreise.dateIsBeforeMin':
        'Datoen for avreise kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.avreise.dateHasInvalidFormat':
        'Du må oppgi dato for avreise i et gyldig format. Gyldig format er dd.mm.åååå.',

    'kursperiode.form.hjemkomst.dateHasNoValue':
        'Du må oppgi når avreise til kurset er. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.hjemkomst.dateIsAfterMax':
        'Datoen for avreise kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.hjemkomst.dateIsBeforeMin':
        'Datoen for avreise kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'kursperiode.form.hjemkomst.dateHasInvalidFormat':
        'Du må oppgi dato for avreise i et gyldig format. Gyldig format er dd.mm.åååå.',

    'kursperiode.form.avreiseSammeDag.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du reiser samme dag som kurset starter.',
    'kursperiode.form.hjemkomstSammeDag.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du kommer hjem samme dag som kurset slutter.',

    'kursperiode.form.begrunnelseReisetidFra.stringHasNoValue':
        'Du må oppgi en beskrivelse av årsaken til at avreisedatoen er over én dag etter sluttdato.',
    'kursperiode.form.begrunnelseReisetidFra.stringIsTooLong':
        'Beskrivelsen av årsaken til avreisedatoen kan ikke være lengre enn 500 tegn.',
    'kursperiode.form.begrunnelseReisetidFra.stringIsTooShort':
        'Beskrivelsen av årsaken til avreisedatoen må være minst 5 tegn.',
    'kursperiode.form.begrunnelseReisetidFra.stringContainsUnicodeChacters':
        'Beskrivelsen årsaken til avreisedatoen kan ikke inneholde spesialtegn.',

    'kursperiode.form.beskrivelseReisetidTil.stringHasNoValue':
        'Du må oppgi en beskrivelse av årsaken til aten hjemkomstdato er over én dag etter sluttdato.',
    'kursperiode.form.beskrivelseReisetidTil.stringIsTooLong':
        'Beskrivelsen av årsaken til hjemkomstdatoen kan ikke være lengre enn 500 tegn.',
    'kursperiode.form.beskrivelseReisetidTil.stringIsTooShort':
        'Beskrivelsen av årsaken til hjemkomstdatoen må være minst 5 tegn.',
    'kursperiode.form.beskrivelseReisetidTil.stringContainsUnicodeChacters':
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
