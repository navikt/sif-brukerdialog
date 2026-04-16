import { getRequiredEnv } from '@navikt/sif-common-env';

import { AppEnvKey } from '../../env.schema';

interface Lenker {
    skatteetaten: string;
    personopplysninger: string;
    endreKontonummer: string;
}

const getLenkerBokmål = (): Lenker => ({
    skatteetaten: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_SKATTEETATEN),
    personopplysninger: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONOPPLYSNINGER),
    endreKontonummer: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_ENDRE_KONTONUMMER),
});

const getLenker = (): Lenker => {
    return getLenkerBokmål();
};

export default getLenker;
