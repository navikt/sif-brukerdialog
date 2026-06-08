import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

import { appEnv } from './utils/appEnv';

const { INNSYN_PP, PLEIEPENGER_SYKT_BARN_URL, ENDRINGSMELDING_PP } = appEnv;

const lenkerBokmål = {
    innsynPleiepenger: INNSYN_PP,
    pleiepengerSyktBarn: PLEIEPENGER_SYKT_BARN_URL,
    endringsmelding: ENDRINGSMELDING_PP,
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
