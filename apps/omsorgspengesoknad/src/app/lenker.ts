interface Lenker {
    infosider: string;
    medlemskap: string;
    papirskjemaPrivat: string;
    vilkårPleiepenger: string;
    personvern: string;
    rettOgPlikt: string;
    saksbehandlingstider: string;
    dittNAV: string;
    innsynSIF: string;
    ettersend: string;
    skatteetaten: string;
    skatteetatenSN: string;
}

const LenkerBokmål: Lenker = {
    infosider: 'https://www.nav.no/omsorgspenger',
    medlemskap:
        'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden',
    papirskjemaPrivat:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/brev',
    vilkårPleiepenger: 'https://www.nav.no/familie/sykdom-i-familien/nb/pleiepenger-for-sykt-barn',
    personvern:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten',
    rettOgPlikt: 'https://nav.no/rettOgPlikt',
    saksbehandlingstider: 'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV',
    dittNAV: `https://www.nav.no/no/Ditt+NAV`,
    innsynSIF: `https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn`,
    ettersend: 'https://www.nav.no/ettersende#omsorgspenger-hjemme-med-sykt-barn-dager',
    skatteetaten: 'https://www.skatteetaten.no/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenSN:
        'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobber/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere',
};

const LenkerNynorsk: Partial<Lenker> = {
    medlemskap: 'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Nynorsk/medlemskap-i-folketrygda',
    papirskjemaPrivat:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/brev',
    vilkårPleiepenger: 'https://www.nav.no/familie/sykdom-i-familien/nn/pleiepenger-for-sykt-barn',
    rettOgPlikt:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Nynorsk/du-har-plikt-til-%C3%A5-gje-nav-riktige-opplysningar',
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
