import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { IntlShape } from 'react-intl';
import { FraværÅrsak } from './types';

const fraværMessages = {
    nb: {
        'fravær.årsak.STENGT_SKOLE_ELLER_BARNEHAGE': 'Skolen/barnehagen var stengt på grunn av koronasituasjonen.',
        'fravær.årsak.SMITTEVERNHENSYN':
            'Skolen/barnehagen var åpen, men barnet måtte være hjemme på grunn av særlige smittevernhensyn.',
        'fravær.årsak.STENGT_SKOLE_ELLER_BARNEHAGE.kort': 'stengt skole/barnehage',
        'fravær.årsak.SMITTEVERNHENSYN.kort': 'særlige smittevernhensyn',

        'fravær.list.årsak': 'På grunn av {årsak}',
        'fravær.form.validation.dateOutsideRange': 'Første gyldige dato er {fom}, og siste gyldige dato er {tom}',
        'fravær.form.validation.fromDateAfterToDate': 'Fra-dato må være lik eller før til-dato',
        'fravær.form.validation.toDateBeforeFromDate': 'Til-dato må være lik eller etter fra-dato',
        'fravær.form.validation.fra_og_til_er_ulike_år': 'Fra og til dato må være i samme år',
        'fravær.form.validation.timer_mer_enn_arbeidstimer':
            'Antall timer med fravær kan ikke være mer enn antall timer du skulle ha jobbet denne dagen',
        'fravær.form.validation.er_helg': 'Lørdag og søndag er ikke gyldig.',
        'fieldvalidation.dager_overlapper_med_andre_dager':
            'Én eller flere dager med fravær overlapper med andre dager med fravær.',
        'fieldvalidation.fra_dato_kolliderer_med_annet_fravær':
            'Fra og med datoen overlapper med allerede registrert fraværsdag',
        'fieldvalidation.til_dato_kolliderer_med_annet_fravær':
            'Til og med datoen overlapper med allerede registrert fraværsdag',
        'fieldvalidation.dato_kolliderer_med_annet_fravær': 'Datoen overlapper med allerede registrert fraværsdag',
        'info.smittevern.tittel': 'Hva menes med særlige smittevernhensyn?',
        'info.smittevern.info.html':
            'Når barnehagen eller skolen er åpen, men du må være hjemme med barnet ditt på grunn <strong>av særlige smittevernhensyn</strong>, kan du bruke omsorgsdager. Det er en lege som avgjør om det foreligger særlige smittevernhensyn. Det kan være smittevernhensyn til barnet eller andre familiemedlemmer som bor med barnet.',
        'info.årsak.tittel': 'Hva om begge årsakene gjelder i perioden jeg har lagt inn?',
        'info.årsak.info.1': `Hvis du har vært hjemme med barn både fordi barnehage/skole var stengt, og på grunn av særlige smittevernshensyn, må du legge inn flere perioder. Når du har lagt inn én periode og trykker OK, får du mulighet til å legge til flere perioder.`,
        'info.årsak.info.2': `Eksempel:`,
        'info.årsak.info.3': `1.-2. mars var du hjemme med barn fordi barnehage/skole var stengt. Da legger du inn 1.-2. mars som en periode. I tillegg var du hjemme 3.-5. mars på grunn av særlige smittevernshensyn. Da legger du inn 3.-5. mars som en egen periode.`,

        'fravær.form.felles.hjemmePgaKorona':
            'Var du hjemme med barn fordi barnehage/skole var stengt på grunn av koronaviruset, eller på grunn av særlige smittevernshensyn?',
        'fravær.form.felles.årsak': 'Velg årsaken til at du var hjemme med barn i perioden du har lagt inn',
        'fravær.form.felles.ok': 'Ok',
        'fravær.form.felles.avbryt': 'Avbryt',
        'fravær.form.periode.tittel': 'Periode med fravær fra jobb',
        'fravær.form.periode.tidsrom': 'Velg tidsrom',
        'fravær.form.periode.fom': 'Fra og med',
        'fravær.form.periode.tom': 'Til og med',
        'fravær.form.dag.tittel': 'Dag med delvis fravær fra jobb',
        'fravær.form.dag.dato': 'Dato',
        'fravær.form.dag.antallArbeidstimer': 'Antall timer du skulle ha jobbet denne dagen',
        'fravær.form.dag.timerFravær': 'Antall timer du var borte fra jobb denne dagen',

        'fraværDagForm.dato.dateHasNoValue': 'Du må oppgi dato for når du hadde delvis fravær.',
        'fraværDagForm.dato.dateHasInvalidFormat':
            'Du må oppgi dato for når du hadde delvis fravær i et gyldig format. Gyldig format er dd.mm.åååå.',
        'fraværDagForm.dato.dateIsAfterMax':
            'Dato for når du hadde delvis fravær kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
        'fraværDagForm.dato.dateIsBeforeMin':
            'Datoen for når du hadde delvis fravær kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
        'fraværDagForm.dato.er_helg':
            'Dato for når du hadde delvis fravær må være en ukedag, det kan ikke være lørdag eller søndag.',
        'fraværDagForm.dato.dato_kolliderer_med_annet_fravær': 'Datoen overlapper med allerede registrert fraværsdag',
        'fraværDagForm.timerArbeidsdag.noValue': 'Du må velge antall timer du skulle ha jobbet denne dagen.',
        'fraværDagForm.timerFravær.noValue': 'Du må velge antall timer du var borte fra jobb denne dagen',
        'fraværDagForm.timerFravær.fravær_timer_mer_enn_arbeidstimer': 'Fravær kan ikke være høyere enn arbeidstimer',
        'fraværDagForm.hjemmePgaKorona.yesOrNoIsUnanswered':
            'Velg ja eller nei om du hjemme med barn fordi barnehage/skole var stengt på grunn av koronaviruset, eller på grunn av særlige smittevernshensyn.',
        'fraværDagForm.årsak.noValue': 'Velg årsaken til at du var hjemme med barn i perioden du har lagt inn.',

        'fraværPeriodeForm.fraOgMed.dateHasNoValue':
            'Du må oppgi når perioden startet. Skriv inn eller velg dato fra datovelgeren.',
        'fraværPeriodeForm.fraOgMed.dateIsAfterMax':
            'Datoen for når perioden startet kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
        'fraværPeriodeForm.fraOgMed.dateIsBeforeMin':
            'Datoen for når perioden startet kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
        'fraværPeriodeForm.fraOgMed.dateHasInvalidFormat':
            'Du må oppgi dato for når perioden startet i et gyldig format. Gyldig format er dd.mm.åååå.',
        'fraværPeriodeForm.fraOgMed.fromDateIsAfterToDate':
            'Startdatoen for perioden må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',
        'fraværPeriodeForm.tilOgMed.dateHasNoValue':
            'Du må oppgi når perioden sluttet. Skriv inn eller velg dato fra datovelgeren.',
        'fraværPeriodeForm.tilOgMed.dateIsAfterMax':
            'Datoen for når perioden sluttet kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
        'fraværPeriodeForm.tilOgMed.dateIsBeforeMin':
            'Datoen for når perioden sluttet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
        'fraværPeriodeForm.tilOgMed.dateHasInvalidFormat':
            'Du må oppgi dato for når perioden sluttet i et gyldig format. Gyldig format er dd.mm.åååå.',
        'fraværPeriodeForm.tilOgMed.toDateIsBeforeFromDate':
            'Sluttdatoen for perioden kan ikke være før startdatoen. Skriv inn eller velg dato fra datovelgeren.',
        'fraværPeriodeForm.fraOgMed.er_helg':
            'Periodens fra-dato må være en ukedag, det kan ikke være lørdag eller søndag. Hvis perioden startet en lørdag eller søndag må du velge mandagen etter som startdato.',
        'fraværPeriodeForm.fraOgMed.fra_og_til_er_ulike_år': 'Fra og til dato må være i samme år',
        'fraværPeriodeForm.fraOgMed.fra_dato_kolliderer_med_annet_fravær':
            'Fra og med datoen overlapper med allerede registrert fraværsdag.',
        'fraværPeriodeForm.tilOgMed.er_helg':
            'Periodens til-dato må være en ukedag, det kan ikke være lørdag eller søndag. Hvis perioden sluttet en lørdag eller søndag må du velge fredagen før som sluttdato.',
        'fraværPeriodeForm.tilOgMed.fra_og_til_er_ulike_år': 'Fra og til dato må være i samme år',
        'fraværPeriodeForm.tilOgMed.til_dato_kolliderer_med_annet_fravær':
            'Til og med datoen overlapper med allerede registrert fraværsdag',
        'fraværPeriodeForm.årsak.noValue': 'Velg årsaken til at du var hjemme med barn i perioden du har lagt inn.',
        'fraværPeriodeForm.periode.dager_overlapper_med_andre_dager':
            'Én eller flere dager med fravær overlapper med andre dager med fravær.',
        'fraværPeriodeForm.hjemmePgaKorona.yesOrNoIsUnanswered':
            'Velg ja eller nei om du hjemme med barn fordi barnehage/skole var stengt på grunn av koronaviruset, eller på grunn av særlige smittevernshensyn.',
    },
    nn: {
        'fravær.list.årsak': 'På grunn av {årsak}',
        'fravær.form.validation.dateOutsideRange': 'Første gyldige dato er {fom}, og siste gyldige dato er {tom}',
        'fravær.form.validation.fromDateAfterToDate': 'Frå-datoen må vere lik eller før til-datoen',
        'fravær.form.validation.toDateBeforeFromDate': 'Til-datoen må vere lik eller etter frå-datoen',
        'fravær.form.validation.fra_og_til_er_ulike_år': 'Fra og til dato må vera i same år',
        'fieldvalidation.dager_overlapper_med_andre_dager':
            'Ein eller fleire dagar med fråvær overlappar andre dagar med fråvær.',
        'fieldvalidation.fra_dato_kolliderer_med_annet_fravær':
            'Frå og med datoen overlappar med allereie registrert fråværsdag',
        'fieldvalidation.til_dato_kolliderer_med_annet_fravær':
            'Til og med datoen overlappar med allereie registrert fråværsdag',
        'fieldvalidation.dato_kolliderer_med_annet_fravær': 'Datoen overlappar med allereie registrert fråværsdag',
        'fravær.form.validation.timer_mer_enn_arbeidstimer':
            'Talet på timar med fråvær kan ikkje vere meir enn talet på timar du skulle ha jobba denne dagen',
        'fravær.form.validation.er_helg': 'Laurdag og søndag er ikkje gyldig.',

        'fravær.årsak.STENGT_SKOLE_ELLER_BARNEHAGE': 'Skolen/barnehagen var stengt på grunn av koronasituasjonen',
        'fravær.årsak.SMITTEVERNHENSYN':
            'Skolen/barnehagen var åpen, men barnet måtte være hjemme på grunn av særlige smittevernhensyn.',
        'fravær.årsak.ORDINÆRT_FRAVÆR': 'Ordinært fravær',
        'fravær.årsak.STENGT_SKOLE_ELLER_BARNEHAGE.kort': 'stengt skole/barnehage',
        'fravær.årsak.SMITTEVERNHENSYN.kort': 'særlige smittevernhensyn',
        'fravær.årsak.ORDINÆRT_FRAVÆR.kort': 'ordinært fravær',
        'info.smittevern.tittel': 'Hva menes med særlige smittevernhensyn?',
        'info.smittevern.info.html':
            'Når barnehagen eller skolen er åpen, men du må være hjemme med barnet ditt på grunn <strong>av særlige smittevernhensyn</strong>, kan du bruke omsorgsdager. Det er en lege som avgjør om det foreligger særlige smittevernhensyn. Det kan være smittevernhensyn til barnet eller andre familiemedlemmer som bor med barnet.',
        'info.årsak.tittel': 'Hva om begge årsakene gjelder i perioden jeg har lagt inn?',
        'info.årsak.info.1': `Hvis du har vært hjemme med barn både fordi barnehage/skole var stengt, og på grunn av særlige smittevernshensyn, må du legge inn flere perioder. Når du har lagt inn én periode og trykker OK, får du mulighet til å legge til flere perioder.`,
        'info.årsak.info.2': `Eksempel:`,
        'info.årsak.info.3': `1.-2. mars var du hjemme med barn fordi barnehage/skole var stengt. Da legger du inn 1.-2. mars som en periode. I tillegg var du hjemme 3.-5. mars på grunn av særlige smittevernshensyn. Da legger du inn 3.-5. mars som en egen periode.`,
    },
};

export const getFraværÅrsakTekst = (årsak: FraværÅrsak, intl: IntlShape): string => {
    return intlHelper(intl, `fravær.årsak.${årsak}`);
};

export const getFraværÅrsakTekstKort = (årsak: FraværÅrsak, intl: IntlShape): string => {
    return intlHelper(intl, `fravær.årsak.${årsak}.kort`);
};

export default fraværMessages;
