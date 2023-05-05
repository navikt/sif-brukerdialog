interface Lenker {
    navno: string;
    personvern: string;
    rettOgPlikt: string;
    saksbehandlingstider: string;
    merOmFastBostedOgSamvær: string;
    aleneMedBarn: string;
    skrivTilOss: string;
}

const LenkerBokmål: Lenker = {
    navno: 'https://www.nav.no/',
    personvern:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten',
    rettOgPlikt: 'https://nav.no/rettOgPlikt',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',
    merOmFastBostedOgSamvær: `https://www.regjeringen.no/no/tema/familie-og-barn/innsiktsartikler/bosted-og-samvar/samvar/id749587/`,
    aleneMedBarn: 'https://www.nav.no/familie/alene-med-barn',
    skrivTilOss: 'https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss',
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
