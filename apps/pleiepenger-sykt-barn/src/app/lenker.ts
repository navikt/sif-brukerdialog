import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

const lenkerBokmål = {
    papirskjemaPrivat: 'https://www.nav.no/start/soknad-pleiepenger',
    innsynSIF: `https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn`,
    endringsmelding: 'https://nav.no/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger',
    ettersend: 'https://www.nav.no/start/ettersend-soknad-pleiepenger',
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
