import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/lib/utils/persistence/persistence';
import { jsonSort } from '@navikt/sif-common-utils';
import { EndringType, K9Sak, Søker, Søknadsdata } from '@types';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';
import { APP_VERSJON } from '../../constants/APP_VERSJON';
import { getSøknadStepRoute, SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import { getSøknadSteps } from '../../søknad/config/søknadStepConfig';
import { ApiEndpointPsb, axiosConfigPsb } from '../api';

export type SøknadStatePersistence = {
    versjon: string;
    barnAktørId: string;
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadHashString: string;
    harUkjentArbeidsforhold: boolean;
    hvaSkalEndres: EndringType[];
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
    const søknadRoute = søknadState.søknadRoute;
    const availableSteps = getSøknadSteps(
        søknadState.hvaSkalEndres,
        søknadState.søknadsdata,
        søknadState.harUkjentArbeidsforhold
    );
    return availableSteps.some((step) => getSøknadStepRoute(step) === søknadRoute);
};

export const isPersistedSøknadStateValid = (
    søknadState: SøknadStatePersistence,
    info: SøknadStateHashInfo,
    k9saker: K9Sak[]
): boolean => {
    return (
        søknadState.versjon === APP_VERSJON &&
        søknadState.søknadHashString === createHashString(info) &&
        k9saker.some((sak) => sak.barn.aktørId === søknadState.barnAktørId) &&
        søknadState.hvaSkalEndres.length > 0 &&
        persistedSøknadRouteIsAvailable(søknadState)
    );
};

export const isPersistedSøknadStateEmpty = (søknadState: SøknadStatePersistence) => {
    return Object.keys(søknadState || {}).length === 0;
};

const søknadStateEndpoint: SøknadStatePersistenceEndpoint = {
    create: persistSetup.create,
    purge: persistSetup.purge,
    update: ({ søknadsdata, søknadRoute, barnAktørId, hvaSkalEndres, harUkjentArbeidsforhold }, søker) => {
        return persistSetup.update({
            versjon: APP_VERSJON,
            søknadHashString: createHashString({ søker, barnAktørId }),
            barnAktørId,
            søknadsdata,
            søknadRoute,
            hvaSkalEndres,
            harUkjentArbeidsforhold,
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
