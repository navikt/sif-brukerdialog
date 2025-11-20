import { getRequiredEnv } from '@navikt/sif-common-env';

import { AppEnvKey } from '../../env.schema';

interface Lenker {
    omUngdomsprogramytelsen: string;
    personvern: string;
    rettOgPlikt: string;
    personopplysninger: string;
    minSide: string;
    skatteetaten: string;
    skattekort: string;
    lovdataInntekt: string;
    endreKontonummer: string;
    skrivtilOss: string;
    dokumentarkiv: string;
}

const getLenkerBokmål = (): Lenker => ({
    omUngdomsprogramytelsen: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN),
    personvern: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONVERN),
    rettOgPlikt: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_RETT_OG_PLIKT),
    personopplysninger: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONOPPLYSNINGER),
    minSide: getRequiredEnv(AppEnvKey.SIF_PUBLIC_MINSIDE_URL),
    skatteetaten: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_SKATTEETATEN),
    lovdataInntekt: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_LOVDATA_INNTEKT),
    endreKontonummer: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_ENDRE_KONTONUMMER),
    skrivtilOss: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_SKRIV_TIL_OSS),
    dokumentarkiv: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_DOKUMENTARKIV),
    skattekort: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_SKATTEKORT),
});

const getLenker = (): Lenker => {
    return getLenkerBokmål();
};

export default getLenker;
