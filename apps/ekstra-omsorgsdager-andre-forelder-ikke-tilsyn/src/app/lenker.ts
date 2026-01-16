interface Lenker {
    navno: string;
    personvern: string;
    rettOgPlikt: string;
    saksbehandlingstider: string;
    merOmFastBostedOgSamvær: string;
    soknadRegnetSomAleneBrev: string;
    papirskjema: string;
}

const LenkerBokmål: Lenker = {
    navno: 'https://www.nav.no/',
    personvern: 'https://www.nav.no/personvernerklaering',
    rettOgPlikt: 'https://nav.no/rettOgPlikt',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',
    merOmFastBostedOgSamvær: `https://www.regjeringen.no/no/tema/familie-og-barn/innsiktsartikler/bosted-og-samvar/samvar/id749587/`,
    soknadRegnetSomAleneBrev: `https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.07/brev`,
    papirskjema: 'https://www.nav.no/start/soknad-ekstra-omsorgsdager-andre-forelder',
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
