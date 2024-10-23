interface Lenker {
    inntektsmelding: string;
    medlemskap: string;
    papirskjemaPrivat: string;
    vilkårOmsorgspenger: string;
    personvern: string;
    rettOgPlikt: string;
    saksbehandlingstider: string;
    søkeEkstraDager: string;
    veiledningEttersendelse: string;
    skatteetaten: string;
    skatteetatenSN: string;
    ettersending: string;
}

const LenkerBokmål: Lenker = {
    inntektsmelding: 'https://www.nav.no/arbeidsgiver/inntektsmelding',
    medlemskap:
        'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden',
    papirskjemaPrivat: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.05/brev',
    vilkårOmsorgspenger: 'https://www.nav.no/familie/sykdom-i-familien/nb/omsorgspenger',
    personvern:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten',
    rettOgPlikt: 'https://nav.no/rettOgPlikt',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',

    søkeEkstraDager: 'https://www.nav.no/familie/sykdom-i-familien/nb/omsorgspenger#Nar-kan-du-soke-om-ekstra-dager',
    veiledningEttersendelse: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-35.01/ettersendelse',
    skatteetaten: 'https://www.skatteetaten.no/skjema/mine-inntekter-og-arbeidsforhold/',
    skatteetatenSN:
        'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/arbeid-trygd-og-pensjon/hobby-ekstrainntekt-og-smajobber/lonnsarbeid-i-hjemmet/lonn-betalt-over-60-000/naringsdrivende-oppdragstakere',
    ettersending: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-35.01/ettersendelse',
};

const LenkerNynorsk: Partial<Lenker> = {
    inntektsmelding: 'https://www.nav.no/arbeidsgiver/inntektsmelding',
    medlemskap: 'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Nynorsk/medlemskap-i-folketrygda',
    papirskjemaPrivat: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.05/brev',
    vilkårOmsorgspenger: 'https://www.nav.no/familie/sykdom-i-familien/nn/omsorgspenger',
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
