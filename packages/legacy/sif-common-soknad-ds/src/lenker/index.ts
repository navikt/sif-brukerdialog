export const sifCommonLenkerBokmål = {
    navno: 'https://www.nav.no/',
    minSide: 'https://www.nav.no/minside',
    medlemskapIFolketrygden:
        'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden',
    skrivTilOss: 'https://www.nav.no/skriv-til-oss',
    inntektsmelding: 'https://www.nav.no/arbeidsgiver/inntektsmelding',
    kontaktOss: 'https://www.nav.no/kontaktoss',
    personvernerklæring: 'https://www.nav.no/personvernerklaering',
    rettOgPlikt: 'https://www.nav.no/endringer',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',
    skatt_arbeidstakerinntekt: 'https://www.skatteetaten.no/skjema/mine-inntekter-og-arbeidsforhold/',
    skatt_SNInntekt:
        'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobber/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere',
};

export type SifCommonLenker = typeof sifCommonLenkerBokmål;

export const sifCommonLenkerNynorsk: SifCommonLenker = {
    ...sifCommonLenkerBokmål,
    navno: 'https://www.nav.no/minside/nn/',
    rettOgPlikt: 'https://www.nav.no/endringer/nn',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider/nn',
    skatt_arbeidstakerinntekt: 'https://www.skatteetaten.no/nn/skjema/mine-inntekter-og-arbeidsforhold/',
    skatt_SNInntekt:
        'https://www.skatteetaten.no/nn/person/skatt/hjelp-til-rett-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobbar/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere/',
};
