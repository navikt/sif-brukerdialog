import { getRequiredEnv } from '@navikt/sif-common-env';
import { AppEnvKey } from '../env.schema';

interface Lenker {
    omUngdomsprogramytelsen: string;
    personvern: string;
    rettOgPlikt: string;
    personopplysninger: string;
}

const LenkerBokmål: Lenker = {
    omUngdomsprogramytelsen: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN),
    personvern: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONVERN),
    rettOgPlikt: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_RETT_OG_PLIKT),
    personopplysninger: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONOPPLYSNINGER),
};

const getLenker = (locale: string = 'nb'): Lenker => {
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
