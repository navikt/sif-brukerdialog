export const sifLenkerProdBokmal = {
    navno: 'https://www.nav.no/',
    minSide: 'https://www.nav.no/minside',
    medlemskapIFolketrygden:
        'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden',
    skrivTilOss: 'https://www.nav.no/skriv-til-oss',
    kontaktOss: 'https://www.nav.no/kontaktoss',
    tilbakemeldinger: 'https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger',
    personvernerklaering: 'https://www.nav.no/personvernerklaering',
    personopplysninger: 'https://www.nav.no/person/personopplysninger/nb/',
    rettOgPlikt: 'https://www.nav.no/endringer',
    rettOgPliktRiktigeOpplysninger: 'https://www.nav.no/endringer#du-har-plikt-til-a-gi-nav-riktige-opplysninger',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',
    endreKontonummer: 'https://www.nav.no/start/soknad-endring-bankkontonummer',
    inntektsmelding: 'https://www.nav.no/arbeidsgiver/inntektsmelding',
    arbeidsgiverPleiepenger: 'https://www.nav.no/arbeidsgiver/pleiepenger-barn',
    omsorgspenger: 'https://www.nav.no/omsorgspenger',
    omsorgspengerHvorMange: 'https://www.nav.no/omsorgspenger#hvor-mange',
    omsorgspengerEkstraDager: 'https://www.nav.no/omsorgspenger#ekstra-dager',
    omsorgspengerSituasjon: 'https://www.nav.no/omsorgspenger#situasjon',
    ettersendOmsorgspenger: 'https://www.nav.no/ettersende#omsorgspenger-hjemme-med-sykt-barn-dager',
    ettersendOmsorgspengerSelvstendigFrilansere:
        'https://www.nav.no/start/ettersend-soknad-omsorgspenger-selvstendig-frilansere',
    soknadEkstraOmsorgsdagerAndreForelder: 'https://www.nav.no/start/soknad-ekstra-omsorgsdager-andre-forelder',
    skjemaOmsorgspengerBrev: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.05/brev',
    pleiepengerBarn: 'https://www.nav.no/pleiepenger-barn',
    pleiepengerSoknad: 'https://www.nav.no/familie/sykdom-i-familien/soknad/pleiepenger',
    pleiepengerInnsyn: 'https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn',
    skjemaPleiepengerBrev:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/brev',
    ettersendPleiepenger:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/ettersendelse',
    ungdomsprogrammet: 'https://www.nav.no/ungdomsprogrammet',
    dokumentarkivOMS: 'https://www.nav.no/dokumentarkiv/tema/OMS',
    dokumentarkivUNG: 'https://www.nav.no/dokumentarkiv/tema/UNG',
    innboksBeskjedEndring: 'https://innboks.nav.no/s/beskjed-til-oss?category=Endring-sykdom-familien',
    innboksSkrivPleiepenger: 'https://innboks.nav.no/s/skriv-til-oss?category=Pleiepenger',
    utbetalingsoversikt: 'https://tjenester.nav.no/utbetalingsoversikt/',
    skatteetaten: 'https://www.skatteetaten.no',
    skatteetatenArbeidstakerinntekt: 'https://www.skatteetaten.no/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenSNInntekt:
        'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobber/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere',
    skattekort: 'https://www.skatteetaten.no/person/skatt/skattekort/',
    lovdataFolketrygdloven5_10: 'https://lovdata.no/dokument/NL/lov/1999-03-26-14/KAPITTEL_6-2#%C2%A75-10',
    lovdataFolketrygdlovenKap9: 'https://lovdata.no/nav/folketrygdloven/kap9',
    regjeringenSamvar:
        'https://www.regjeringen.no/no/tema/familie-og-barn/innsiktsartikler/bosted-og-samvar/samvar/id749587/',
};

export type SifLenker = typeof sifLenkerProdBokmal;
export type SifLenkeKey = keyof SifLenker;
export type SifLenkerLocale = 'nb' | 'nn';
export type SifLenkerEnvironment = 'prod' | 'dev';

export const sifLenkerBokmal: SifLenker = sifLenkerProdBokmal;

export const sifLenkerProdNynorsk: SifLenker = {
    ...sifLenkerProdBokmal,
    navno: 'https://www.nav.no/minside/nn/',
    rettOgPlikt: 'https://www.nav.no/endringer/nn',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider/nn',
    omsorgspenger: 'https://www.nav.no/omsorgspenger/nn',
    omsorgspengerEkstraDager: 'https://www.nav.no/omsorgspenger/nn#ekstra-dagar',
    soknadEkstraOmsorgsdagerAndreForelder: 'https://www.nav.no/start/soknad-ekstra-omsorgsdager-andre-forelder/nn',
    ettersendOmsorgspengerSelvstendigFrilansere:
        'https://www.nav.no/start/ettersend-soknad-omsorgspenger-selvstendig-frilansere/nn',
    skatteetatenArbeidstakerinntekt: 'https://www.skatteetaten.no/nn/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenSNInntekt:
        'https://www.skatteetaten.no/nn/person/skatt/hjelp-til-rett-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobbar/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere/',
};

export const sifLenkerNynorsk: SifLenker = sifLenkerProdNynorsk;

export const sifLenkerDevBokmal: SifLenker = {
    ...sifLenkerProdBokmal,
    minSide: 'https://www.intern.dev.nav.no/minside',
    skrivTilOss: 'https://www.ansatt.dev.nav.no/skriv-til-oss',
    personvernerklaering: 'https://www.ansatt.dev.nav.no/personvernerklaering',
    personopplysninger: 'https://www.ansatt.dev.nav.no/person/personopplysninger/nb/',
    rettOgPlikt: 'https://www.ansatt.dev.nav.no/endringer',
    endreKontonummer: 'https://www.ansatt.dev.nav.no/start/soknad-endring-bankkontonummer',
    dokumentarkivOMS: 'https://www.dev.nav.no/dokumentarkiv/tema/OMS',
    dokumentarkivUNG: 'https://www.ansatt.dev.nav.no/dokumentarkiv/tema/UNG',
    innboksBeskjedEndring: 'https://innboks.dev.nav.no/s/beskjed-til-oss?category=Endring-sykdom-familien',
    innboksSkrivPleiepenger: 'https://innboks.dev.nav.no/s/skriv-til-oss?category=Pleiepenger',
};

export const sifLenkerDevNynorsk: SifLenker = {
    ...sifLenkerDevBokmal,
    navno: 'https://www.nav.no/minside/nn/',
    rettOgPlikt: 'https://www.nav.no/endringer/nn',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider/nn',
    omsorgspenger: 'https://www.nav.no/omsorgspenger/nn',
    omsorgspengerEkstraDager: 'https://www.nav.no/omsorgspenger/nn#ekstra-dagar',
    soknadEkstraOmsorgsdagerAndreForelder: 'https://www.nav.no/start/soknad-ekstra-omsorgsdager-andre-forelder/nn',
    ettersendOmsorgspengerSelvstendigFrilansere:
        'https://www.nav.no/start/ettersend-soknad-omsorgspenger-selvstendig-frilansere/nn',
    skatteetatenArbeidstakerinntekt: 'https://www.skatteetaten.no/nn/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenSNInntekt:
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
