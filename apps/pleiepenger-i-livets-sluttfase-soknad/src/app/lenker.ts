import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

const lenkerBokmål = {
    ettersend: 'https://www.nav.no/start/ettersend-soknad-pleiepenger-sluttfase',
    søknadPåPapir: 'https://www.nav.no/start/soknad-pleiepenger-sluttfase',
};

type Lenker = typeof lenkerBokmål;

const lenkerNynorsk: Partial<Lenker> = {
    søknadPåPapir: 'https://www.nav.no/start/soknad-pleiepenger-sluttfase/nn',
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
