import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

const lenkerBokmål = {
    ettersend:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/ettersendelse',
    søknadPåPapir: 'https://www.nav.no/soknader#pleiepenger-i-livets-sluttfase',
};

type Lenker = typeof lenkerBokmål;

const lenkerNynorsk: Partial<Lenker> = {
    søknadPåPapir: 'https://www.nav.no/soknader/nn#pleiepengar-i-livets-sluttfase',
};

const getLenker = (locale?: string): Lenker & SifCommonLenker => {
    switch (locale) {
        case 'nn':
            return {
                ...sifCommonLenkerNynorsk,
                ...lenkerBokmål,
                ...lenkerNynorsk,
            };
        default:
            return { ...sifCommonLenkerBokmål, ...lenkerBokmål };
    }
};

export default getLenker;
