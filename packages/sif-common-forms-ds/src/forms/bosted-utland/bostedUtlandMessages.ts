import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

const nb = {
    'bostedUtland.list.add': 'Legg til opphold',
    'bostedUtland.form.tittel': 'Utenlandsopphold',
    'bostedUtland.form.tidsperiode.spm': 'Tidsperiode',
    'bostedUtland.form.tidsperiode.fraDato': 'Fra og med',
    'bostedUtland.form.tidsperiode.tilDato': 'Til og med',
    'bostedUtland.form.land.spm': 'Velg land',
    'bostedUtland.form.ok': 'Legg til',
    'bostedUtland.form.avbryt': 'Avbryt',
    'bostedUtlandForm.fom.dateHasNoValue':
        'Du må oppgi hvilken dato utenlandsoppholdet startet. Skriv inn eller velg dato.',
    'bostedUtlandForm.fom.dateIsAfterMax':
        'Datoen utenlandsoppholdet startet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'bostedUtlandForm.fom.dateIsBeforeMin':
        'Datoen utenlandsoppholdet startet kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    'bostedUtlandForm.fom.dateHasInvalidFormat':
        'Du må oppgi når utenlandsoppholdet startet i et gyldig format. Gyldig format er dd.mm.åååå.',
    'bostedUtlandForm.fom.fromDateIsAfterToDate':
        'Datoen utenlandsoppholdet startet kan ikke være etter datoen det ble avsluttet. Skriv inn eller velg sluttdato fra datovelgeren.',
    'bostedUtlandForm.tom.dateHasNoValue':
        'Du må oppgi hvilken dato utenlandsoppholdet ble avsluttet. Skriv inn eller velg dato fra datovelgeren.',
    'bostedUtlandForm.tom.dateIsAfterMax':
        'Datoen utenlandsoppholdet ble avsluttet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'bostedUtlandForm.tom.dateIsBeforeMin':
        'Datoen utenlandsoppholdet ble avsluttet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'bostedUtlandForm.tom.dateHasInvalidFormat':
        'Du må oppgi når utenlandsoppholdet ble avsluttet i et gyldig format. Gyldig format er dd.mm.åååå.',
    'bostedUtlandForm.tom.toDateIsBeforeFromDate':
        'Datoen utenlandsoppholdet ble avsluttet kan ikke være før datoen det ble startet. Skriv inn eller velg sluttdato fra datovelgeren.',
    'bostedUtlandForm.landkode.noValue': 'Du må velge land',
};

const nn: Record<keyof typeof nb, string> = {
    'bostedUtland.list.add': 'Legg til opphold',
    'bostedUtland.form.tittel': 'Utenlandsopphold',
    'bostedUtland.form.tidsperiode.spm': 'Tidsperiode',
    'bostedUtland.form.tidsperiode.fraDato': 'Fra og med',
    'bostedUtland.form.tidsperiode.tilDato': 'Til og med',
    'bostedUtland.form.land.spm': 'Velg land',
    'bostedUtland.form.ok': 'Legg til',
    'bostedUtland.form.avbryt': 'Avbryt',
    'bostedUtlandForm.fom.dateHasNoValue':
        'Du må oppgi hvilken dato utenlandsoppholdet startet. Skriv inn eller velg dato.',
    'bostedUtlandForm.fom.dateIsAfterMax':
        'Datoen utenlandsoppholdet startet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'bostedUtlandForm.fom.dateIsBeforeMin':
        'Datoen utenlandsoppholdet startet kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    'bostedUtlandForm.fom.dateHasInvalidFormat':
        'Du må oppgi når utenlandsoppholdet startet i et gyldig format. Gyldig format er dd.mm.åååå.',
    'bostedUtlandForm.fom.fromDateIsAfterToDate':
        'Datoen utenlandsoppholdet startet kan ikke være etter datoen det ble avsluttet. Skriv inn eller velg sluttdato fra datovelgeren.',
    'bostedUtlandForm.tom.dateHasNoValue':
        'Du må oppgi hvilken dato utenlandsoppholdet ble avsluttet. Skriv inn eller velg dato fra datovelgeren.',
    'bostedUtlandForm.tom.dateIsAfterMax':
        'Datoen utenlandsoppholdet ble avsluttet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'bostedUtlandForm.tom.dateIsBeforeMin':
        'Datoen utenlandsoppholdet ble avsluttet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'bostedUtlandForm.tom.dateHasInvalidFormat':
        'Du må oppgi når utenlandsoppholdet ble avsluttet i et gyldig format. Gyldig format er dd.mm.åååå.',
    'bostedUtlandForm.tom.toDateIsBeforeFromDate':
        'Datoen utenlandsoppholdet ble avsluttet kan ikke være før datoen det ble startet. Skriv inn eller velg sluttdato fra datovelgeren.',
    'bostedUtlandForm.landkode.noValue': 'Du må velge land',
};

type BostedUtlandMessageKeys = keyof typeof nb;

export const soknadMessages = {
    nb,
    nn,
};

export const useBostedUtlandIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<BostedUtlandMessageKeys>(intl);
};

export default {
    nb,
    nn,
};
