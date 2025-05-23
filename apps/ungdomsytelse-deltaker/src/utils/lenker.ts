import { getRequiredEnv } from '@navikt/sif-common-env';
import { AppEnvKey } from '../../env.schema';

interface Lenker {
    omUngdomsprogramytelsen: string;
    personvern: string;
    rettOgPlikt: string;
    personopplysninger: string;
    minSide: string;
    skatteetaten: string;
    endreKontonummer: string;
    skrivtilOss: string;
}

const getLenkerBokmål = (): Lenker => ({
    omUngdomsprogramytelsen: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN),
    personvern: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONVERN),
    rettOgPlikt: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_RETT_OG_PLIKT),
    personopplysninger: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONOPPLYSNINGER),
    minSide: getRequiredEnv(AppEnvKey.SIF_PUBLIC_MINSIDE_URL),
    skatteetaten: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_SKATTEETATEN),
    endreKontonummer: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_ENDRE_KONTONUMMER),
    skrivtilOss: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_SKRIV_TIL_OSS),
});

const getLenker = (locale: string = 'nb'): Lenker => {
    const bokmål = getLenkerBokmål();
    switch (locale) {
        case 'nn':
            return bokmål;

        default:
            return bokmål;
    }
};

export default getLenker;
