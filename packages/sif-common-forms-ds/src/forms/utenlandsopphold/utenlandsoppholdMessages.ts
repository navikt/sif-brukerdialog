import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    '@forms.utenlandsopphold.list.add': '+ Legg til opphold',
    '@forms.utenlandsopphold.form.tittel': 'Utenlandsopphold',
    '@forms.utenlandsopphold.form.tidsperiode.spm': 'Velg tidsperiode for oppholdet',
    '@forms.utenlandsopphold.form.tidsperiode.fraDato': 'Fra og med',
    '@forms.utenlandsopphold.form.tidsperiode.tilDato': 'Til og med',
    '@forms.utenlandsopphold.form.land.spm': 'Velg land',
    '@forms.utenlandsopphold.form.erSammenMedBarnet.spm': 'Er, eller skal barnet være sammen med deg til {land}?',
    '@forms.utenlandsopphold.form.erBarnetInnlagt.spm':
        'Er, eller skal barnet være innlagt i helseinstitusjon i {land}?',
    '@forms.utenlandsopphold.form.perioderBarnetErInnlag.formTitle': 'Periode barnet er innlagt',
    '@forms.utenlandsopphold.form.perioderBarnetErInnlag.addLabel': 'Legg til periode barnet er innlagt',
    '@forms.utenlandsopphold.form.perioderBarnetErInnlag.listTitle': 'Periode(r) barnet er innlagt',
    '@forms.utenlandsopphold.form.årsak.spm': 'Hvordan dekkes utgiftene til innleggelsen?',
    '@forms.utenlandsopphold.form.årsak.BARNET_INNLAGT_I_HELSEINSTITUSJON_FOR_NORSK_OFFENTLIG_REGNING':
        'For norsk offentlig regning',
    '@forms.utenlandsopphold.form.årsak.BARNET_INNLAGT_I_HELSEINSTITUSJON_DEKKET_ETTER_AVTALE_MED_ET_ANNET_LAND_OM_TRYGD':
        'Etter trygdeavtale med et annet land',
    '@forms.utenlandsopphold.form.årsak.ANNET': 'Jeg dekker utgiftene selv',
    '@forms.utenlandsopphold.oppsummering.årsak.ANNET': 'Jeg dekker utgiftene selv',
    '@forms.utenlandsopphold.form.ok': 'Legg til',
    '@forms.utenlandsopphold.form.avbryt': 'Avbryt',
    '@forms.utenlandsoppholdForm.fom.dateHasNoValue':
        'Du må oppgi når utenlandsoppholdet startet. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.utenlandsoppholdForm.fom.dateIsAfterMax':
        'Datoen for når utenlandsoppholdet startet kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.utenlandsoppholdForm.fom.dateIsBeforeMin':
        'Datoen for når utenlandsoppholdet startet kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.utenlandsoppholdForm.fom.dateHasInvalidFormat':
        'Du må oppgi dato for når utenlandsoppholdet startet i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.utenlandsoppholdForm.fom.fromDateIsAfterToDate':
        'Startdatoen for utenlandsoppholdet må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.utenlandsoppholdForm.tom.dateHasNoValue':
        'Du må oppgi når utenlandsoppholdet sluttet. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.utenlandsoppholdForm.tom.dateIsAfterMax':
        'Du har lagt inn et utenlandsopphold som er utenfor søknadsperioden.',
    '@forms.utenlandsoppholdForm.tom.dateIsBeforeMin':
        'Datoen for når utenlandsoppholdet sluttet kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.utenlandsoppholdForm.tom.dateHasInvalidFormat':
        'Du må oppgi dato for når utenlandsoppholdet sluttet i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.utenlandsoppholdForm.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for utenlandsoppholdet kan ikke være før startdatoen. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.utenlandsoppholdForm.landkode.noValue': 'Du må velge land.',
    '@forms.utenlandsoppholdForm.årsak.noValue': 'Du må velge hvordan utgiftene til innleggelsen dekkes.',
    '@forms.utenlandsoppholdForm.erBarnetInnlagt.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om barnet er, eller skal være innlagt i helseinstitusjon i {land}.',
    '@forms.utenlandsoppholdForm.barnInnlagtPerioder.listIsEmpty': 'Du har ikke lagt til periode for innleggelse.',
    '@forms.utenlandsoppholdForm.erSammenMedBarnet.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om barnet barnet er, eller skal være sammen med deg til {land}.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type UtenlandsoppholdMessageKeys = keyof typeof nb;

export const utenlandsoppholdMessages = {
    nb,
    nn,
};

export const useUtenlandsoppholdIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<UtenlandsoppholdMessageKeys>(intl);
};
