import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    '@forms.opptjeningUtland.list.add': '+ Legg til jobb',
    '@forms.opptjeningUtland.form.tittel': 'Jobbet i et annet EØS-land',
    '@forms.opptjeningUtland.form.tidsperiode.spm': 'Velg tidsperiode for jobb',
    '@forms.opptjeningUtland.form.tidsperiode.fraDato': 'Fra og med',
    '@forms.opptjeningUtland.form.tidsperiode.tilDato': 'Til og med',
    '@forms.opptjeningUtland.form.land.spm': 'Velg land',
    '@forms.opptjeningUtland.form.opptjeningAktivitet.spm': 'Hva jobbet du som?',
    '@forms.opptjeningUtland.form.opptjeningAktivitet.FRILANSER': 'Frilanser',
    '@forms.opptjeningUtland.form.opptjeningAktivitet.ARBEIDSTAKER': 'Arbeidstaker',
    '@forms.opptjeningUtland.form.arbeidsgiversNavn': 'Skriv inn navnet på arbeidsgiveren',
    '@forms.opptjeningUtland.form.oppdragsgiverNavn': 'Skriv inn navnet på oppdragsgiveren',
    '@forms.opptjeningUtland.form.ok': 'Legg til',
    '@forms.opptjeningUtland.form.avbryt': 'Avbryt',
    '@forms.opptjeningUtlandForm.fom.dateHasNoValue':
        'Du må oppgi når du startet å jobbe. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.opptjeningUtlandForm.fom.dateIsAfterMax':
        'Datoen for når du startet å jobbe kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.opptjeningUtlandForm.fom.dateIsBeforeMin':
        'Datoen for når du startet å jobbe kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.opptjeningUtlandForm.fom.dateHasInvalidFormat':
        'Du må oppgi dato når du startet å jobbe i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.opptjeningUtlandForm.fom.fromDateIsAfterToDate':
        'Startdatoen for jobb må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.opptjeningUtlandForm.tom.dateHasNoValue':
        'Du må oppgi når du sluttet å jobbe. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.opptjeningUtlandForm.tom.dateIsAfterMax': 'Du har lagt inn et jobb som er utenfor søknadsperioden.',
    '@forms.opptjeningUtlandForm.tom.dateIsBeforeMin':
        'Datoen for når du sluttet å jobbe kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.opptjeningUtlandForm.tom.dateHasInvalidFormat':
        'Du må oppgi dato for når du sluttet å jobbe i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.opptjeningUtlandForm.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for jobb kan ikke være før startdatoen. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.opptjeningUtlandForm.landkode.noValue': 'Du må velge land.',
    '@forms.opptjeningUtlandForm.type.noValue': 'Du må velge hva jobbet du som.',
    '@forms.opptjeningUtlandForm.oppdragsgiverNavn.noValue': 'Du må skrive inn {opptjeningAktivitet} navn.',
    '@forms.opptjeningUtlandForm.navn.noValue': 'Du må skrive inn navn.',
    '@forms.opptjeningUtlandForm.opptjeningType.noValue': 'Du må oppgi hva jobbet du som.',
};

const nn: Record<keyof typeof nb, string> = {
    '@forms.opptjeningUtland.list.add': 'Legg til jobb',
    '@forms.opptjeningUtland.form.tittel': 'Jobbet i eit anna EØS-land',
    '@forms.opptjeningUtland.form.tidsperiode.spm': 'Vel tidsperiode for jobb',
    '@forms.opptjeningUtland.form.tidsperiode.fraDato': 'Frå og med',
    '@forms.opptjeningUtland.form.tidsperiode.tilDato': 'Til og med',
    '@forms.opptjeningUtland.form.land.spm': 'Vel land',
    '@forms.opptjeningUtland.form.opptjeningAktivitet.spm': 'Kva jobba du som?',
    '@forms.opptjeningUtland.form.opptjeningAktivitet.FRILANSER': 'Frilansar',
    '@forms.opptjeningUtland.form.opptjeningAktivitet.ARBEIDSTAKER': 'Arbeidstaker',
    '@forms.opptjeningUtland.form.arbeidsgiversNavn': 'Skriv inn namnet på arbeidsgivaren',
    '@forms.opptjeningUtland.form.oppdragsgiverNavn': 'Skriv inn namnet på oppdragsgivaren',
    '@forms.opptjeningUtland.form.ok': 'Legg til',
    '@forms.opptjeningUtland.form.avbryt': 'Avbryt',
    '@forms.opptjeningUtlandForm.fom.dateHasNoValue':
        'Du må oppgi når du starta å jobba. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.opptjeningUtlandForm.fom.dateIsAfterMax':
        'Datoen for når du starta å jobba kan ikkje vera etter dagens dato. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.opptjeningUtlandForm.fom.dateIsBeforeMin':
        'Datoen for når du starta å jobba kan ikkje vera før {dato}. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.opptjeningUtlandForm.fom.dateHasInvalidFormat':
        'Du må oppgi dato når du starta å jobba i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.opptjeningUtlandForm.fom.fromDateIsAfterToDate':
        'Startdatoen for jobb må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.opptjeningUtlandForm.tom.dateHasNoValue':
        'Du må oppgi når du slutta å jobba. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.opptjeningUtlandForm.tom.dateIsAfterMax': 'Du har lagt inn eit jobb som er utanfor søknadsperioden.',
    '@forms.opptjeningUtlandForm.tom.dateIsBeforeMin':
        'Datoen for når du slutta å jobba kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.opptjeningUtlandForm.tom.dateHasInvalidFormat':
        'Du må oppgi dato for når du slutta å jobba i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.opptjeningUtlandForm.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for jobb kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.opptjeningUtlandForm.landkode.noValue': 'Du må velja land.',
    '@forms.opptjeningUtlandForm.type.noValue': 'Du må velja kva jobba du som.',
    '@forms.opptjeningUtlandForm.oppdragsgiverNavn.noValue': 'Du må skriva inn {opptjeningAktivitet} namn.',
    '@forms.opptjeningUtlandForm.navn.noValue': 'Du må skriva inn namn.',
    '@forms.opptjeningUtlandForm.opptjeningType.noValue': 'Du må oppgi kva jobba du som.',
};

export type OpptjeningUtlandMessageKeys = keyof typeof nb;

export const opptjeningUtlandMessages = {
    nb,
    nn,
};

export const useOpptjeningUtlandIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<OpptjeningUtlandMessageKeys>(intl);
};
