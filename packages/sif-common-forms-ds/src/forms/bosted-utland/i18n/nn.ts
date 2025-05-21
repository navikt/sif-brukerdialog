import { bostedUtlandMessages_nb } from './nb';

export const bostedUtlandMessages_nn: Record<keyof typeof bostedUtlandMessages_nb, string> = {
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
