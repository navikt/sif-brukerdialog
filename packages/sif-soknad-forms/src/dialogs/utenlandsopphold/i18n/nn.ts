import { utenlandsoppholdMessages_nb } from './nb';

export const utenlandsoppholdMessages_nn: Record<keyof typeof utenlandsoppholdMessages_nb, string> = {
    '@sifSoknadForms.utenlandsopphold.dialog.tittel': 'Utanlandsopphald',
    '@sifSoknadForms.utenlandsopphold.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.utenlandsopphold.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.utenlandsopphold.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.utenlandsopphold.form.tidsperiode.legend': 'Vel tidsperiode for opphaldet',
    '@sifSoknadForms.utenlandsopphold.form.fom.label': 'Frå og med',
    '@sifSoknadForms.utenlandsopphold.form.tom.label': 'Til og med',
    '@sifSoknadForms.utenlandsopphold.form.land.label': 'Vel land',
    '@sifSoknadForms.utenlandsopphold.form.erSammenMedBarnet.legend': 'Er barnet saman med deg til {land}?',
    '@sifSoknadForms.utenlandsopphold.form.erBarnetInnlagt.legend': 'Er barnet innlagd i helseinstitusjon i {land}?',
    '@sifSoknadForms.utenlandsopphold.form.barnInnlagtPerioder.legend': 'Periode(r) barnet er innlagd',
    '@sifSoknadForms.utenlandsopphold.form.barnInnlagtPerioder.leggTil': 'Legg til periode barnet er innlagd',
    '@sifSoknadForms.utenlandsopphold.form.årsak.legend': 'Korleis blir utgiftene dekte til innlegginga?',
    '@sifSoknadForms.utenlandsopphold.form.årsak.BARNET_INNLAGT_I_HELSEINSTITUSJON_FOR_NORSK_OFFENTLIG_REGNING':
        'For norsk offentleg rekning',
    '@sifSoknadForms.utenlandsopphold.form.årsak.BARNET_INNLAGT_I_HELSEINSTITUSJON_DEKKET_ETTER_AVTALE_MED_ET_ANNET_LAND_OM_TRYGD':
        'Etter trygdeavtale med eit anna land',
    '@sifSoknadForms.utenlandsopphold.form.årsak.ANNET': 'Eg dekkjer utgiftene sjølv',
};
