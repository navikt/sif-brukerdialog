export const sifLenkerProdBokmal = {
    navForside: 'https://www.nav.no/',
    navMinSide: 'https://www.nav.no/minside',
    navMedlemskapIFolketrygden:
        'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden',
    navSkrivTilOss: 'https://www.nav.no/skriv-til-oss',
    navKontaktOss: 'https://www.nav.no/kontaktoss',
    navTilbakemeldinger: 'https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger',
    navPersonvernerklaering: 'https://www.nav.no/personvernerklaering',
    navPersonopplysninger: 'https://www.nav.no/person/personopplysninger/nb/',
    navRettOgPlikt: 'https://www.nav.no/endringer',
    navRettOgPliktRiktigeOpplysninger: 'https://www.nav.no/endringer#du-har-plikt-til-a-gi-nav-riktige-opplysninger',
    navSaksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',
    navEndreKontonummer: 'https://www.nav.no/start/soknad-endring-bankkontonummer',
    navInntektsmelding: 'https://www.nav.no/arbeidsgiver/inntektsmelding',
    navArbeidsgiverPleiepenger: 'https://www.nav.no/arbeidsgiver/pleiepenger-barn',
    omsorgspengerInfo: 'https://www.nav.no/omsorgspenger',
    omsorgspengerHvorMangeDager: 'https://www.nav.no/omsorgspenger#hvor-mange',
    omsorgspengerEkstraDager: 'https://www.nav.no/omsorgspenger#ekstra-dager',
    omsorgspengerSituasjon: 'https://www.nav.no/omsorgspenger#situasjon',
    omsorgspengerEttersending: 'https://www.nav.no/ettersende#omsorgspenger-hjemme-med-sykt-barn-dager',
    omsorgspengerEttersendingSelvstendigFrilansere:
        'https://www.nav.no/start/ettersend-soknad-omsorgspenger-selvstendig-frilansere',
    omsorgspengerSoknadEkstraOmsorgsdagerAndreForelder:
        'https://www.nav.no/start/soknad-ekstra-omsorgsdager-andre-forelder',
    omsorgspengerBrevskjema: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.05/brev',
    pleiepengerBarnInfo: 'https://www.nav.no/pleiepenger-barn',
    pleiepengerSoknad: 'https://www.nav.no/familie/sykdom-i-familien/soknad/pleiepenger',
    pleiepengerInnsyn: 'https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn',
    pleiepengerBrevskjema:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/brev',
    pleiepengerEttersending:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/ettersendelse',
    navUngdomsprogrammet: 'https://www.nav.no/ungdomsprogrammet',
    navDokumentarkivOmsorgspenger: 'https://www.nav.no/dokumentarkiv/tema/OMS',
    navDokumentarkivUngdomsytelse: 'https://www.nav.no/dokumentarkiv/tema/UNG',
    innboksBeskjedTilOssEndringSykdomIFamilien:
        'https://innboks.nav.no/s/beskjed-til-oss?category=Endring-sykdom-familien',
    innboksSkrivTilOssPleiepenger: 'https://innboks.nav.no/s/skriv-til-oss?category=Pleiepenger',
    navUtbetalingsoversikt: 'https://tjenester.nav.no/utbetalingsoversikt/',
    skatteetatenForside: 'https://www.skatteetaten.no',
    skatteetatenArbeidstakerinntekt: 'https://www.skatteetaten.no/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenNaeringsinntekt:
        'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobber/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere',
    skatteetatenSkattekort: 'https://www.skatteetaten.no/person/skatt/skattekort/',
    lovdataFolketrygdlovenParagraf5_10: 'https://lovdata.no/dokument/NL/lov/1999-03-26-14/KAPITTEL_6-2#%C2%A75-10',
    lovdataFolketrygdlovenKapittel9: 'https://lovdata.no/nav/folketrygdloven/kap9',
    regjeringenBostedOgSamvar:
        'https://www.regjeringen.no/no/tema/familie-og-barn/innsiktsartikler/bosted-og-samvar/samvar/id749587/',
};

export type SifLenker = typeof sifLenkerProdBokmal;
export type SifLenkeKey = keyof SifLenker;
export type SifLenkerLocale = 'nb' | 'nn';
export type SifLenkerEnvironment = 'prod' | 'dev';

export const sifLenkerBokmal: SifLenker = sifLenkerProdBokmal;

export const sifLenkerProdNynorsk: SifLenker = {
    ...sifLenkerProdBokmal,
    navRettOgPlikt: 'https://www.nav.no/endringer/nn',
    navSaksbehandlingstider: 'https://www.nav.no/saksbehandlingstider/nn',
    omsorgspengerInfo: 'https://www.nav.no/omsorgspenger/nn',
    omsorgspengerEkstraDager: 'https://www.nav.no/omsorgspenger/nn#ekstra-dagar',
    omsorgspengerSoknadEkstraOmsorgsdagerAndreForelder:
        'https://www.nav.no/start/soknad-ekstra-omsorgsdager-andre-forelder/nn',
    omsorgspengerEttersendingSelvstendigFrilansere:
        'https://www.nav.no/start/ettersend-soknad-omsorgspenger-selvstendig-frilansere/nn',
    skatteetatenArbeidstakerinntekt: 'https://www.skatteetaten.no/nn/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenNaeringsinntekt:
        'https://www.skatteetaten.no/nn/person/skatt/hjelp-til-rett-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobbar/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere/',
};

export const sifLenkerNynorsk: SifLenker = sifLenkerProdNynorsk;

export const sifLenkerDevBokmal: SifLenker = {
    ...sifLenkerProdBokmal,
    navMinSide: 'https://www.intern.dev.nav.no/minside',
    navSkrivTilOss: 'https://www.ansatt.dev.nav.no/skriv-til-oss',
    navPersonvernerklaering: 'https://www.ansatt.dev.nav.no/personvernerklaering',
    navPersonopplysninger: 'https://www.ansatt.dev.nav.no/person/personopplysninger/nb/',
    navRettOgPlikt: 'https://www.ansatt.dev.nav.no/endringer',
    navEndreKontonummer: 'https://www.ansatt.dev.nav.no/start/soknad-endring-bankkontonummer',
    navDokumentarkivOmsorgspenger: 'https://www.dev.nav.no/dokumentarkiv/tema/OMS',
    navDokumentarkivUngdomsytelse: 'https://www.ansatt.dev.nav.no/dokumentarkiv/tema/UNG',
    innboksBeskjedTilOssEndringSykdomIFamilien:
        'https://innboks.dev.nav.no/s/beskjed-til-oss?category=Endring-sykdom-familien',
    innboksSkrivTilOssPleiepenger: 'https://innboks.dev.nav.no/s/skriv-til-oss?category=Pleiepenger',
};

export const sifLenkerDevNynorsk: SifLenker = {
    ...sifLenkerDevBokmal,
    navRettOgPlikt: 'https://www.nav.no/endringer/nn',
    navSaksbehandlingstider: 'https://www.nav.no/saksbehandlingstider/nn',
    omsorgspengerInfo: 'https://www.nav.no/omsorgspenger/nn',
    omsorgspengerEkstraDager: 'https://www.nav.no/omsorgspenger/nn#ekstra-dagar',
    omsorgspengerSoknadEkstraOmsorgsdagerAndreForelder:
        'https://www.nav.no/start/soknad-ekstra-omsorgsdager-andre-forelder/nn',
    omsorgspengerEttersendingSelvstendigFrilansere:
        'https://www.nav.no/start/ettersend-soknad-omsorgspenger-selvstendig-frilansere/nn',
    skatteetatenArbeidstakerinntekt: 'https://www.skatteetaten.no/nn/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenNaeringsinntekt:
        'https://www.skatteetaten.no/nn/person/skatt/hjelp-til-rett-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobbar/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere/',
};

export const getSifLenker = (locale: SifLenkerLocale = 'nb', environment: SifLenkerEnvironment = 'prod'): SifLenker => {
    if (environment === 'dev') {
        return locale === 'nn' ? sifLenkerDevNynorsk : sifLenkerDevBokmal;
    }

    return locale === 'nn' ? sifLenkerProdNynorsk : sifLenkerProdBokmal;
};

export const getSifLenke = (
    key: SifLenkeKey,
    locale: SifLenkerLocale = 'nb',
    environment: SifLenkerEnvironment = 'prod',
): string => getSifLenker(locale, environment)[key];
