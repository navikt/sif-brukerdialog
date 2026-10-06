import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

const lenkerBokmål = {
    ettersend: 'https://www.nav.no/start/samarbeidspartner/ettersend-soknad-opplaringspenger',
    opplæringspengerNavNo: 'https://www.nav.no/opplaringspenger',
    søknadPåPapir: 'https://www.nav.no/start/soknad-opplaeringspenger',
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
