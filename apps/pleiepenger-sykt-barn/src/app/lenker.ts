interface Lenker {
    medlemskap: string;
    papirskjemaPrivat: string;
    personvern: string;
    rettOgPlikt: string;
    saksbehandlingstider: string;

    skrivTilOss: string;
    innsynSIF: string;
    ettersend: string;
    endringsmelding: string;
    skatteetaten: string;
    skatteetatenSN: string;
}

const LenkerBokmål: Lenker = {
    medlemskap:
        'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden',
    papirskjemaPrivat:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/brev',
    personvern: 'https://www.nav.no/personvernerklaering',
    rettOgPlikt: 'https://nav.no/rettOgPlikt',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',
    innsynSIF: `https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn`,
    endringsmelding: 'https://nav.no/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger',
    ettersend:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/ettersendelse',
    skatteetaten: 'https://www.skatteetaten.no/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenSN:
        'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobber/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere',
    skrivTilOss: 'https://www.nav.no/skriv-til-oss',
};

const LenkerNynorsk: Partial<Lenker> = {
    medlemskap: 'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Nynorsk/medlemskap-i-folketrygda',
    papirskjemaPrivat:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/brev',
    rettOgPlikt:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Nynorsk/du-har-plikt-til-%C3%A5-gje-nav-riktige-opplysningar',
    ettersend:
        'https://www.nav.no/soknader/nn/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/ettersendelse',
    skatteetaten: 'https://www.skatteetaten.no/nn/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenSN:
        'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobber/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere',
};

const getLenker = (locale?: string): Lenker => {
    switch (locale) {
        case 'nn':
            return {
                ...LenkerBokmål,
                ...LenkerNynorsk,
            };
        default:
            return LenkerBokmål;
    }
};

export default getLenker;
