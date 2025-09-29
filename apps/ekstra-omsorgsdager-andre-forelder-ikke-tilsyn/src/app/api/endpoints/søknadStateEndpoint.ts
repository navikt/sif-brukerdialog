import { Søker } from '@navikt/sif-common-api';
import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/src/utils/persistence/persistence';
import { jsonSort } from '@navikt/sif-common-utils';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';

import { MELLOMLAGRING_VERSJON } from '../../constants/MELLOMLAGRING_VERSJON';
import { SøknadContextState } from '../../types/SøknadContextState';
import { isValidSøknadRoute } from '../../utils/søknadRoutesUtils';
import { ApiEndpoint, axiosConfig } from '../api';

export type SøknadStatePersistence = Omit<SøknadContextState, 'søker'> & {
    søknadHashString: string;
};

interface SøknadStateHashInfo {
    søker: Søker;
}

interface SøknadStatePersistenceEndpoint
    extends Omit<PersistenceInterface<SøknadStatePersistence>, 'update' | 'rehydrate'> {
    update: (state: SøknadContextState) => Promise<AxiosResponse>;
    fetch: () => Promise<SøknadStatePersistence>;
}

const persistSetup = persistence<SøknadStatePersistence>({
    url: ApiEndpoint.mellomlagring,
    requestConfig: { ...axiosConfig, transformResponse: axiosConfig.transformResponse },
});

const createHashString = (info: SøknadStateHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

export const isPersistedSøknadStateValid = (
    søknadState: SøknadStatePersistence,
    info: SøknadStateHashInfo,
): boolean => {
    return (
        søknadState.versjon === MELLOMLAGRING_VERSJON &&
        søknadState.søknadsdata?.velkommen?.harForståttRettigheterOgPlikter === true &&
        søknadState.søknadHashString === createHashString(info) &&
        isValidSøknadRoute(søknadState.søknadRoute)
    );
};

const søknadStateEndpoint: SøknadStatePersistenceEndpoint = {
    create: persistSetup.create,
    purge: persistSetup.purge,
    update: ({ søker, søknadsdata, søknadRoute, søknadSendt, registrerteBarn }: SøknadContextState) => {
        return persistSetup.update({
            søknadHashString: createHashString({ søker }),
            søknadsdata,
            søknadRoute,
            søknadSendt,
            registrerteBarn,
            versjon: MELLOMLAGRING_VERSJON,
        });
    },
    fetch: async () => {
        const { data } = await persistSetup.rehydrate();
        return Promise.resolve(data);
    },
};

export default søknadStateEndpoint;
