import { bostedUtlandMessages_nb } from './nb';

export const bostedUtlandMessages_nn: Record<keyof typeof bostedUtlandMessages_nb, string> = {
    '@sifSoknadForms.bostedUtland.dialog.tittel': 'Utanlandsopphald',
    '@sifSoknadForms.bostedUtland.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.bostedUtland.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.bostedUtland.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.bostedUtland.form.tidsperiode.legend': 'Tidsperiode',
    '@sifSoknadForms.bostedUtland.form.fom.label': 'Frå og med',
    '@sifSoknadForms.bostedUtland.form.tom.label': 'Til og med',
    '@sifSoknadForms.bostedUtland.form.land.label': 'Vel land',
    '@sifSoknadForms.bostedUtlandForm.validation.fom.dateHasNoValue':
        'Du må oppgje kva dato utanlandsopphaldet starta. Skriv inn eller vel dato.',
    '@sifSoknadForms.bostedUtlandForm.validation.fom.dateIsAfterMax':
        'Datoen utanlandsopphaldet starta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.bostedUtlandForm.validation.fom.dateIsBeforeMin':
        'Datoen utanlandsopphaldet starta kan ikkje vera før {dato}. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@sifSoknadForms.bostedUtlandForm.validation.fom.dateHasInvalidFormat':
        'Du må oppgje når utanlandsopphaldet starta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.bostedUtlandForm.validation.bosted.fromDateIsAfterToDate':
        'Datoen utanlandsopphaldet starta kan ikkje vera etter datoen det vart avslutta. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@sifSoknadForms.bostedUtlandForm.validation.tom.dateHasNoValue':
        'Du må oppgje kva dato utanlandsopphaldet vart avslutta. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.bostedUtlandForm.validation.tom.dateIsAfterMax':
        'Datoen utanlandsopphaldet vart avslutta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.bostedUtlandForm.validation.tom.dateIsBeforeMin':
        'Datoen utanlandsopphaldet vart avslutta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.bostedUtlandForm.validation.tom.dateHasInvalidFormat':
        'Du må oppgje når utanlandsopphaldet vart avslutta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.bostedUtlandForm.validation.tom.toDateIsBeforeFromDate':
        'Datoen utanlandsopphaldet vart avslutta kan ikkje vera før datoen det vart starta. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@sifSoknadForms.bostedUtlandForm.validation.landkode.noValue': 'Du må velja land',
};
