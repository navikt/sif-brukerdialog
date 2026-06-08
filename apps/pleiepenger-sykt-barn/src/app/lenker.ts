import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

const lenkerBokmål = {
    papirskjemaPrivat:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/brev',
    innsynSIF: `https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn`,
    endringsmelding: 'https://nav.no/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger',
    ettersend:
        'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger/NAV%2009-11.05/ettersendelse',
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
            return { ...sifCommonLenkerBokmål, ...lenkerBokmål };
    }
};

export default getLenker;
