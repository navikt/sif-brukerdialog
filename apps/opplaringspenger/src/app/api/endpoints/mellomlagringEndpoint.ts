import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/lib/utils/persistence/persistence';
import { jsonSort } from '@navikt/sif-common-utils/lib';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { Søker } from '../../types/Søker';
import { SøknadContextState } from '../../types/SøknadContextState';
import { ApiEndpointPsb, axiosConfigPsb } from '../api';

export const MELLOMLAGRING_VERSION = '0.0.1';
export interface SøknadHashInfo {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
}

export type SøknadMellomlagring = Omit<SøknadContextState, 'søker' | 'registrerteBarn'> & {
    søknadHashString: string;
};
interface MellomlagringEndpoint extends Omit<PersistenceInterface<SøknadMellomlagring>, 'update' | 'rehydrate'> {
    update: (state: SøknadContextState) => Promise<AxiosResponse>;
    fetch: () => Promise<SøknadMellomlagring>;
}

const persistSetup = persistence<SøknadMellomlagring>({
    url: ApiEndpointPsb.mellomlagring,
    requestConfig: { ...axiosConfigPsb },
});

const createSøknadHashInfoString = (info: SøknadHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

export const isMellomlagringValid = (mellomlagring: SøknadMellomlagring, info: SøknadHashInfo): boolean => {
    return (
        mellomlagring.versjon === MELLOMLAGRING_VERSION &&
            mellomlagring.søknadsdata?.harForståttRettigheterOgPlikter === true,
        mellomlagring.søknadHashString === createSøknadHashInfoString(info)
    );
};

const mellomlagringEndpoint: MellomlagringEndpoint = {
    create: persistSetup.create,
    purge: persistSetup.purge,
    update: ({ registrerteBarn, søker, søknadsdata, søknadRoute, søknadSendt }: SøknadContextState) => {
        return persistSetup.update({
            søknadHashString: createSøknadHashInfoString({ registrerteBarn, søker }),
            søknadsdata,
            søknadRoute,
            søknadSendt,
            versjon: MELLOMLAGRING_VERSION,
        });
    },
    fetch: async () => {
        const { data } = await persistSetup.rehydrate();
        return Promise.resolve(data);
    },
};

export const lagreSøknadState = (state: SøknadContextState) => {
    return mellomlagringEndpoint.update(state);
};

export default mellomlagringEndpoint;
