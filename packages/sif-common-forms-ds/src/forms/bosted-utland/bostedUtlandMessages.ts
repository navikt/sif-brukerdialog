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
    '@forms.bostedUtland.list.add': 'Legg til opphald',
    '@forms.bostedUtland.form.tittel': 'Utanlandsopphald',
    '@forms.bostedUtland.form.tidsperiode.spm': 'Tidsperiode',
    '@forms.bostedUtland.form.tidsperiode.fraDato': 'Frå og med',
    '@forms.bostedUtland.form.tidsperiode.tilDato': 'Til og med',
    '@forms.bostedUtland.form.land.spm': 'Vel land',
    '@forms.bostedUtland.form.ok': 'Legg til',
    '@forms.bostedUtland.form.avbryt': 'Avbryt',
    '@forms.bostedUtlandForm.fom.dateHasNoValue':
        'Du må oppgi kva dato utanlandsopphaldet starta. Skriv inn eller vel dato.',
    '@forms.bostedUtlandForm.fom.dateIsAfterMax':
        'Datoen utanlandsopphaldet starta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.bostedUtlandForm.fom.dateIsBeforeMin':
        'Datoen utanlandsopphaldet starta kan ikkje vera før {dato}. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.bostedUtlandForm.fom.dateHasInvalidFormat':
        'Du må oppgi når utanlandsopphaldet starta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.bostedUtlandForm.fom.fromDateIsAfterToDate':
        'Datoen utanlandsopphaldet starta kan ikkje vera etter datoen det vart avslutta. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.bostedUtlandForm.tom.dateHasNoValue':
        'Du må oppgi kva dato utanlandsopphaldet vart avslutta. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.bostedUtlandForm.tom.dateIsAfterMax':
        'Datoen utanlandsopphaldet vart avslutta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.bostedUtlandForm.tom.dateIsBeforeMin':
        'Datoen utanlandsopphaldet vart avslutta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.bostedUtlandForm.tom.dateHasInvalidFormat':
        'Du må oppgi når utanlandsopphaldet vart avslutta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.bostedUtlandForm.tom.toDateIsBeforeFromDate':
        'Datoen utanlandsopphaldet vart avslutta kan ikkje vera før datoen det vart starta. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.bostedUtlandForm.landkode.noValue': 'Du må velja land',
};

export type BostedUtlandMessageKeys = keyof typeof nb;

export const useBostedUtlandIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<BostedUtlandMessageKeys>(intl);
};
export const bostedUtlandMessages = {
    nb,
    nn,
};
