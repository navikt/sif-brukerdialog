interface Lenker {
    ettersend: string;
    medlemskap: string;
    minSide: string;
    navno: string;
    opplæringspengerNavNo: string;
    personvern: string;
    rettOgPlikt: string;
    saksbehandlingstider: string;
    skatteetaten: string;
    skatteetatenSN: string;
    søknadPåPapir: string;
}

const LenkerBokmål: Lenker = {
    navno: 'https://www.nav.no/',
    minSide: 'https://www.nav.no/minside',
    personvern:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten',
    rettOgPlikt: 'https://nav.no/rettOgPlikt',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',
    ettersend:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/ettersendelse',
    medlemskap:
        'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden',
    opplæringspengerNavNo: 'https://www.nav.no/opplaringspenger',
    søknadPåPapir: 'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger#NAV091205',
    skatteetaten: 'https://www.skatteetaten.no/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenSN:
        'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobber/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere',
};

const getLenker = (locale?: string): Lenker => {
    switch (locale) {
        case 'nn':
            return {
                ...LenkerBokmål,
            };
        default:
            return LenkerBokmål;
    }
};

export default getLenker;
