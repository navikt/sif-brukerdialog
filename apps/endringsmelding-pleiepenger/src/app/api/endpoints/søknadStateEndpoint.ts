import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/lib/utils/persistence/persistence';
import { jsonSort } from '@navikt/sif-common-utils/lib';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';
import { APP_VERSJON } from '../../constants/APP_VERSJON';
import { SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import { K9Sak } from '../../types/K9Sak';
import { Søker } from '../../types/Søker';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { ApiEndpointPsb, axiosConfigPsb } from '../api';

export type SøknadStatePersistence = {
    versjon: string;
    barnAktørId: string;
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadHashString: string;
    updatedTimestamp: Date;
};

interface SøknadStateHashInfo {
    søker: Søker;
    barnAktørId: string;
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
    info: SøknadStateHashInfo,
    k9saker: K9Sak[]
): boolean => {
    return (
        søknadState.versjon === APP_VERSJON &&
        søknadState.søknadHashString === createHashString(info) &&
        k9saker.some((sak) => sak.barn.aktørId === søknadState.barnAktørId)
    );
};

const søknadStateEndpoint: SøknadStatePersistenceEndpoint = {
    create: persistSetup.create,
    purge: persistSetup.purge,
    update: ({ søknadsdata, søknadRoute, barnAktørId }, søker) => {
        return persistSetup.update({
            versjon: APP_VERSJON,
            søknadHashString: createHashString({ søker, barnAktørId }),
            barnAktørId,
            søknadsdata,
            søknadRoute,
            updatedTimestamp: new Date(),
        });
    },
    fetch: async () => {
        const { data } = await persistSetup.rehydrate();
        return Promise.resolve(data);
    },
};

export default søknadStateEndpoint;
