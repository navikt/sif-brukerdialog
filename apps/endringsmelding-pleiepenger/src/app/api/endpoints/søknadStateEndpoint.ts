import { Søker } from '@navikt/sif-common-api';
import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/src/utils/persistence/persistence';
import { jsonSort } from '@navikt/sif-common-utils';
import { K9Sak, Søknadsdata, ValgteEndringer } from '@types';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';
import { APP_VERSJON } from '../../constants/APP_VERSJON';
import { StepId } from '../../søknad/config/StepId';
import { getSøknadStepRoute, SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import { ApiEndpointPsb, axiosConfigPsb } from '../api';

export type SøknadStatePersistence = {
    versjon: string;
    barnAktørId: string;
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadHashString: string;
    harArbeidsgivereIkkeISak: boolean;
    valgteEndringer: ValgteEndringer;
    søknadSteps: StepId[];
    metadata: {
        updatedTimestamp: string;
    };
};

interface SøknadStateHashInfo {
    søker: Søker;
    barnAktørId: string;
}

interface SøknadStatePersistenceEndpoint
    extends Omit<PersistenceInterface<SøknadStatePersistence>, 'update' | 'rehydrate'> {
    update: (state: Omit<SøknadStatePersistence, 'søknadHashString'>, søker: Søker) => Promise<AxiosResponse>;
    fetch: () => Promise<SøknadStatePersistence | undefined>;
}

const persistSetup = persistence<SøknadStatePersistence>({
    url: ApiEndpointPsb.mellomlagring,
    requestConfig: { ...axiosConfigPsb, transformRequest: undefined },
});

const createHashString = (info: SøknadStateHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

const persistedSøknadRouteIsAvailable = (søknadState: SøknadStatePersistence): boolean => {
    return (søknadState.søknadSteps || []).some((step) => getSøknadStepRoute(step) === søknadState.søknadRoute);
};

export const isPersistedSøknadStateValid = (
    søknadState: SøknadStatePersistence,
    info: SøknadStateHashInfo,
    k9saker: K9Sak[],
): boolean => {
    return (
        søknadState.versjon === APP_VERSJON &&
        søknadState.søknadHashString === createHashString(info) &&
        k9saker.some((sak) => sak.barn.aktørId === søknadState.barnAktørId) &&
        persistedSøknadRouteIsAvailable(søknadState)
    );
};

export const isPersistedSøknadStateEmpty = (søknadState: SøknadStatePersistence) => {
    return Object.keys(søknadState || {}).length === 0;
};

const søknadStateEndpoint: SøknadStatePersistenceEndpoint = {
    create: persistSetup.create,
    purge: persistSetup.purge,
    update: (
        { søknadsdata, søknadRoute, barnAktørId, valgteEndringer, harArbeidsgivereIkkeISak, søknadSteps },
        søker,
    ) => {
        return persistSetup.update({
            versjon: APP_VERSJON,
            søknadHashString: createHashString({ søker, barnAktørId }),
            barnAktørId,
            søknadsdata,
            søknadRoute,
            valgteEndringer,
            harArbeidsgivereIkkeISak,
            søknadSteps,
            metadata: {
                updatedTimestamp: new Date().toISOString(),
            },
        });
    },
    fetch: async () => {
        const { data } = await persistSetup.rehydrate();
        if (isPersistedSøknadStateEmpty(data)) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(data);
    },
};

export default søknadStateEndpoint;
