import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

const lenkerBokmål = {
    papirskjema: 'https://www.nav.no/start/soknad-ekstra-omsorgsdager-andre-forelder',
};

type Lenker = typeof lenkerBokmål;

const lenkerNynorsk = {
    ...lenkerBokmål,
    papirskjema: 'https://www.nav.no/start/soknad-ekstra-omsorgsdager-andre-forelder/nn',
};

export const getLenker = (locale?: string): Lenker & SifCommonLenker => {
    switch (locale) {
        case 'nn':
            return {
                ...sifCommonLenkerNynorsk,
                ...lenkerNynorsk,
            };
        default:
            return {
                ...sifCommonLenkerBokmål,
                ...lenkerBokmål,
            };
    }
};
