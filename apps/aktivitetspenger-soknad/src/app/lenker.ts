import { getRequiredEnv } from '@navikt/sif-common-env';

import { AppEnvKey } from '../../env.schema';

interface Lenker {
    skatteetaten: string;
}

const getLenkerBokmål = (): Lenker => ({
    skatteetaten: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_SKATTEETATEN),
});

const getLenker = (): Lenker => {
    return getLenkerBokmål();
};

export default getLenker;
