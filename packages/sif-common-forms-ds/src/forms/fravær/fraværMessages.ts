import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
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
    'fraværPeriodeForm.periode.dager_overlapper_med_andre_dager':
        'Én eller flere dager med fravær overlapper med andre dager med fravær.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type FraværMessageKeys = keyof typeof nb;

export const fraværMessages = {
    nb,
    nn,
};

export const useFraværIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<FraværMessageKeys>(intl);
};
