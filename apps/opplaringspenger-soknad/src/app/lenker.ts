import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

const lenkerBokmål = {
    ettersend:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/ettersendelse',
    opplæringspengerNavNo: 'https://www.nav.no/opplaringspenger',
    søknadPåPapir: 'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger#NAV091205',
};

type Lenker = typeof lenkerBokmål;

const getLenker = (locale?: string): Lenker & SifCommonLenker => {
    switch (locale) {
        case 'nn':
            return {
                ...sifCommonLenkerNynorsk,
                ...lenkerBokmål,
            };
        default:
            return {
                ...sifCommonLenkerBokmål,
                ...lenkerBokmål,
            };
    }
};

export default getLenker;
