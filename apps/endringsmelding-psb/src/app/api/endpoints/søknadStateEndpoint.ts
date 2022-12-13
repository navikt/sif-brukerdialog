import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/lib/utils/persistence/persistence';
import { jsonSort } from '@navikt/sif-common-utils/lib';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';
import { APP_VERSJON } from '../../constants/APP_VERSJON';
import { SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import { Søker } from '../../types/Søker';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { ApiEndpointPsb, axiosConfigPsb } from '../api';

export type SøknadStatePersistence = {
    versjon: string;
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadHashString: string;
};

interface SøknadStateHashInfo {
    søker: Søker;
}

interface SøknadStatePersistenceEndpoint
    extends Omit<PersistenceInterface<SøknadStatePersistence>, 'update' | 'rehydrate'> {
    update: (state: Omit<SøknadStatePersistence, 'søknadHashString'>, søker: Søker) => Promise<AxiosResponse>;
    fetch: () => Promise<SøknadStatePersistence>;
}

const persistSetup = persistence<SøknadStatePersistence>({
    url: ApiEndpointPsb.mellomlagring,
    requestConfig: { ...axiosConfigPsb, transformRequest: undefined },
});

const createHashString = (info: SøknadStateHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

export const isPersistedSøknadStateValid = (
    søknadState: SøknadStatePersistence,
    info: SøknadStateHashInfo
): boolean => {
    return søknadState.versjon === APP_VERSJON && søknadState.søknadHashString === createHashString(info);
};

const søknadStateEndpoint: SøknadStatePersistenceEndpoint = {
    create: persistSetup.create,
    purge: persistSetup.purge,
    update: ({ søknadsdata, søknadRoute }, søker) => {
        return persistSetup.update({
            versjon: APP_VERSJON,
            søknadHashString: createHashString({ søker }),
            søknadsdata,
            søknadRoute,
        });
    },
    fetch: async () => {
        const { data } = await persistSetup.rehydrate();
        return Promise.resolve(data);
    },
};

export default søknadStateEndpoint;
