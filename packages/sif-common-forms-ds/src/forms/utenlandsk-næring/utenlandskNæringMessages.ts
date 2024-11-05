import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    '@forms.utenlandskNæringForm.næringstype_FISKE': 'Fisker',
    '@forms.utenlandskNæringForm.næringstype_JORDBRUK_SKOGBRUK': 'Jordbruker',
    '@forms.utenlandskNæringForm.næringstype_DAGMAMMA': 'Dagmamma eller familiebarnehage i eget hjem',
    '@forms.utenlandskNæringForm.næringstype_ANNEN': 'Annet',
    '@forms.utenlandskNæringForm.form_title': 'Opplysninger om virksomheten',
    '@forms.utenlandskNæringForm.hvilken_type_virksomhet': 'Hvilken type virksomhet hadde du?',
    '@forms.utenlandskNæringForm.hva_heter_virksomheten': 'Skriv inn navnet på virksomheten',
    '@forms.utenlandskNæringForm.registert_i_hvilket_land': `I hvilket land var {navnPåVirksomheten} registrert i?`,
    '@forms.utenlandskNæringForm.organisasjonsnummer':
        'Skriv inn virksomhetens organisasjonsnummer/identifikasjonsnummer',
    '@forms.utenlandskNæringForm.startdato': `Når startet du {navnPåVirksomheten}?`,
    '@forms.utenlandskNæringForm.kalender_fom': 'Startdato',
    '@forms.utenlandskNæringForm.kalender_tom': 'Sluttdato',
    '@forms.utenlandskNæringForm.kalender_pågående': 'Er pågående',

    '@forms.utenlandskNæringForm.summary.tittel': 'Næringsvirksomhet som du har lagt inn',
    '@forms.utenlandskNæringForm.summary.navn': 'Navn',
    '@forms.utenlandskNæringForm.summary.næringstype': 'Næringstype',
    '@forms.utenlandskNæringForm.summary.tidsinfo.avsluttet': 'Startet {fraOgMed}, avsluttet {tilOgMed}',
    '@forms.utenlandskNæringForm.summary.tidsinfo.pågående': 'Startet {fraOgMed} (pågående)',

    '@forms.utenlandskNæringForm.summary.registrertILand': 'Registrert i {land}',
    '@forms.utenlandskNæringForm.summary.registrertILand.orgnr': ' (organisasjonsnummer {orgnr})',

    '@forms.utenlandskNæringForm.næringstype.noValue': 'Velg hvilken type virksomhet du har fra listen.',
    '@forms.utenlandskNæringForm.navnPåVirksomheten.stringHasNoValue': 'Skriv inn navnet på virksomheten din.',
    '@forms.utenlandskNæringForm.land.noValue':
        'Du må velge hvilket land virksomheten din er registrert i. Velg land fra listen.',
    '@forms.utenlandskNæringForm.identifikasjonsnummer.noValue': 'Skriv inn organisasjonsnummeret.',
    '@forms.utenlandskNæringForm.fraOgMed.dateHasNoValue':
        'Du må oppgi hvilken dato du startet virksomheten. Skriv inn eller velg startdato fra datovelgeren.',
    '@forms.utenlandskNæringForm.fraOgMed.dateIsAfterMax':
        'Startdatoen for når du startet virksomheten må være før dagens dato. Skriv inn eller velg startdato fra datovelgeren.',
    '@forms.utenlandskNæringForm.fraOgMed.dateHasInvalidFormat':
        'Du må oppgi startdato for virksomheten i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.utenlandskNæringForm.fraOgMed.fromDateIsAfterToDate':
        'Startdatoen for når du startet virksomheten må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.utenlandskNæringForm.tilOgMed.dateHasNoValue':
        'Du må oppgi hvilken dato du avsluttet virksomheten. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.utenlandskNæringForm.tilOgMed.dateIsBeforeMin':
        'Sluttdatoen for når du avsluttet virksomheten kan ikke være før startdatoen. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.utenlandskNæringForm.tilOgMed.dateIsAfterMax':
        'Sluttdatoen for når du avsluttet virksomheten kan ikke være etter dagens dato. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.utenlandskNæringForm.tilOgMed.dateHasInvalidFormat':
        'Du må oppgi dato for når du avsluttet virksomheten i et gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.utenlandskNæringForm.tilOgMed.toDateIsBeforeFromDate':
        'Sluttdatoen for når du avsluttet virksomheten kan ikke være før startdatoen. Skriv inn eller velg sluttdato fra datovelgeren.',
};

const nn: Record<keyof typeof nb, string> = {
    '@forms.utenlandskNæringForm.næringstype_FISKE': 'Fiskar',
    '@forms.utenlandskNæringForm.næringstype_JORDBRUK_SKOGBRUK': 'Jordbrukar',
    '@forms.utenlandskNæringForm.næringstype_DAGMAMMA': 'Dagmamma eller familiebarnehage i eigen heim',
    '@forms.utenlandskNæringForm.næringstype_ANNEN': 'Anna',
    '@forms.utenlandskNæringForm.form_title': 'Opplysningar om verksemda',
    '@forms.utenlandskNæringForm.hvilken_type_virksomhet': 'Kva type verksemd hadde du?',
    '@forms.utenlandskNæringForm.hva_heter_virksomheten': 'Skriv inn namnet på verksemda',
    '@forms.utenlandskNæringForm.registert_i_hvilket_land': 'I kva for eit land var {navnPåVirksomheten} registrert?',
    '@forms.utenlandskNæringForm.organisasjonsnummer':
        'Skriv inn organisasjonsnummeret/identifikasjonsnummeret for verksemda',
    '@forms.utenlandskNæringForm.startdato': 'Når starta du {navnPåVirksomheten}?',
    '@forms.utenlandskNæringForm.kalender_fom': 'Startdato',
    '@forms.utenlandskNæringForm.kalender_tom': 'Sluttdato',
    '@forms.utenlandskNæringForm.kalender_pågående': 'Er pågåande',
    '@forms.utenlandskNæringForm.summary.tittel': 'Næringsverksemd som du har lagt inn',
    '@forms.utenlandskNæringForm.summary.navn': 'Namn',
    '@forms.utenlandskNæringForm.summary.næringstype': 'Næringstype',
    '@forms.utenlandskNæringForm.summary.tidsinfo.avsluttet': 'Starta {fraOgMed}, avslutta {tilOgMed}',
    '@forms.utenlandskNæringForm.summary.tidsinfo.pågående': 'Starta {fraOgMed} (pågåande)',
    '@forms.utenlandskNæringForm.summary.registrertILand': 'Registrert i {land}',
    '@forms.utenlandskNæringForm.summary.registrertILand.orgnr': ' (organisasjonsnummer {orgnr})',
    '@forms.utenlandskNæringForm.næringstype.noValue': 'Vel kva type verksemd du har frå lista.',
    '@forms.utenlandskNæringForm.navnPåVirksomheten.stringHasNoValue': 'Skriv inn namnet på verksemda di.',
    '@forms.utenlandskNæringForm.land.noValue':
        'Du må velja kva for eit land verksemda di er registrert i. Vel land frå lista.',
    '@forms.utenlandskNæringForm.identifikasjonsnummer.noValue': 'Skriv inn organisasjonsnummeret.',
    '@forms.utenlandskNæringForm.fraOgMed.dateHasNoValue':
        'Du må oppgi kva dato du starta verksemda. Skriv inn eller vel startdato frå datoveljaren.',
    '@forms.utenlandskNæringForm.fraOgMed.dateIsAfterMax':
        'Startdatoen for når du starta verksemda må vera før dagens dato. Skriv inn eller vel startdato frå datoveljaren.',
    '@forms.utenlandskNæringForm.fraOgMed.dateHasInvalidFormat':
        'Du må oppgi startdato for verksemda i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.utenlandskNæringForm.fraOgMed.fromDateIsAfterToDate':
        'Startdatoen for når du starta verksemda må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.utenlandskNæringForm.tilOgMed.dateHasNoValue':
        'Du må oppgi kva dato du avslutta verksemda. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.utenlandskNæringForm.tilOgMed.dateIsBeforeMin':
        'Sluttdatoen for når du avslutta verksemda kan ikkje vera før startdatoen. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.utenlandskNæringForm.tilOgMed.dateIsAfterMax':
        'Sluttdatoen for når du avslutta verksemda kan ikkje vera etter dagens dato. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.utenlandskNæringForm.tilOgMed.dateHasInvalidFormat':
        'Du må oppgi dato for når du avslutta verksemda i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.utenlandskNæringForm.tilOgMed.toDateIsBeforeFromDate':
        'Sluttdatoen for når du avslutta verksemda kan ikkje vera før startdatoen. Skriv inn eller vel sluttdato frå datoveljaren.',
};

export type UtenlandskNæringMessageKeys = keyof typeof nb;

export const utenlandskNæringMessages = {
    nb,
    nn,
};

export const useUtenlandskNæringIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<UtenlandskNæringMessageKeys>(intl);
};
