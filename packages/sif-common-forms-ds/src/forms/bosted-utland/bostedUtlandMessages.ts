import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

const nb = {
    '@forms.bostedUtland.list.add': 'Legg til opphold',
    '@forms.bostedUtland.form.tittel': 'Utenlandsopphold',
    '@forms.bostedUtland.form.tidsperiode.spm': 'Tidsperiode',
    '@forms.bostedUtland.form.tidsperiode.fraDato': 'Fra og med',
    '@forms.bostedUtland.form.tidsperiode.tilDato': 'Til og med',
    '@forms.bostedUtland.form.land.spm': 'Velg land',
    '@forms.bostedUtland.form.ok': 'Legg til',
    '@forms.bostedUtland.form.avbryt': 'Avbryt',
    '@forms.bostedUtlandForm.fom.dateHasNoValue':
        'Du må oppgi hvilken dato utenlandsoppholdet startet. Skriv inn eller velg dato.',
    '@forms.bostedUtlandForm.fom.dateIsAfterMax':
        'Datoen utenlandsoppholdet startet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.bostedUtlandForm.fom.dateIsBeforeMin':
        'Datoen utenlandsoppholdet startet kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.bostedUtlandForm.fom.dateHasInvalidFormat':
        'Du må oppgi når utenlandsoppholdet startet i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.bostedUtlandForm.fom.fromDateIsAfterToDate':
        'Datoen utenlandsoppholdet startet kan ikke være etter datoen det ble avsluttet. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.bostedUtlandForm.tom.dateHasNoValue':
        'Du må oppgi hvilken dato utenlandsoppholdet ble avsluttet. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.bostedUtlandForm.tom.dateIsAfterMax':
        'Datoen utenlandsoppholdet ble avsluttet kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.bostedUtlandForm.tom.dateIsBeforeMin':
        'Datoen utenlandsoppholdet ble avsluttet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.bostedUtlandForm.tom.dateHasInvalidFormat':
        'Du må oppgi når utenlandsoppholdet ble avsluttet i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.bostedUtlandForm.tom.toDateIsBeforeFromDate':
        'Datoen utenlandsoppholdet ble avsluttet kan ikke være før datoen det ble startet. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.bostedUtlandForm.landkode.noValue': 'Du må velge land',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type BostedUtlandMessageKeys = keyof typeof nb;

export const bostedUtlandMessages = {
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
