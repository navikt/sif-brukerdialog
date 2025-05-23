interface Lenker {
    medlemskap: string;
    deltFastBosted: string;
    papirskjemaPrivat: string;
    vilkårOmsorgspenger: string;
    personvern: string;
    rettOgPlikt: string;
    saksbehandlingstider: string;
    ettersending: string;
}

const LenkerBokmål: Lenker = {
    deltFastBosted:
        'https://www.skatteetaten.no/person/folkeregister/fodsel-og-navnevalg/delt-fast-bosted-for-felles-barn',
    medlemskap:
        'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden',
    papirskjemaPrivat: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.05/brev',
    vilkårOmsorgspenger: 'https://www.nav.no/familie/sykdom-i-familien/nb/omsorgspenger',
    personvern: 'https://www.nav.no/personvernerklaering',
    rettOgPlikt: 'https://nav.no/rettOgPlikt',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',
    ettersending: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-35.01/ettersendelse',
};

const LenkerNynorsk: Partial<Lenker> = {
    medlemskap: 'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Nynorsk/medlemskap-i-folketrygda',
    papirskjemaPrivat: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.05/brev',
    vilkårOmsorgspenger: 'https://www.nav.no/familie/sykdom-i-familien/nn/omsorgspenger',
    rettOgPlikt:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Nynorsk/du-har-plikt-til-%C3%A5-gje-nav-riktige-opplysningar',
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
