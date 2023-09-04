import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/lib/utils/persistence/persistence';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';
import { ApiEndpoint } from '../types/ApiEndpoint';
import { Person } from '../types/Person';
import { SoknadFormData } from '../types/SoknadFormData';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import { axiosJsonConfig } from '../api/api';
import { ApplicationType } from '../types/ApplicationType';
import { StepID } from './soknadStepsConfig';
import { jsonSort } from '@navikt/sif-common-utils';

export const STORAGE_VERSION = '2.0';

interface UserHashInfo {
    søker: Person;
}

const createHashString = (info: UserHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

interface SoknadTemporaryStorage
    extends Omit<PersistenceInterface<SoknadTempStorageData>, 'update' | 'create' | 'purge' | 'rehydrate'> {
    update: (
        soknadId: string,
        formData: Partial<SoknadFormData>,
        lastStepID: StepID,
        søkerInfo: UserHashInfo,
        søknadstype: ApplicationType,
    ) => Promise<AxiosResponse>;
    create: (søknadstype: ApplicationType) => Promise<AxiosResponse>;
    purge: (søknadstype: ApplicationType) => Promise<AxiosResponse>;
    rehydrate: (søknadstype: ApplicationType) => Promise<AxiosResponse>;
}

const getMellomlagringApiEndpoint = (søknadstype: ApplicationType) => {
    switch (søknadstype) {
        case ApplicationType.pleiepengerBarn:
            return ApiEndpoint.MELLOMLAGRING_PLEIEPENGER_SYKT_BARN;
        case ApplicationType.pleiepengerLivetsSluttfase:
            return ApiEndpoint.MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE;
        default:
            return ApiEndpoint.MELLOMLAGRING_OMP;
    }
};

const persistSetup = (søknadstype: ApplicationType) =>
    persistence<SoknadTempStorageData>({
        url: getMellomlagringApiEndpoint(søknadstype),
        requestConfig: { ...axiosJsonConfig },
    });

export const isStorageDataValid = (
    data: SoknadTempStorageData,
    userHashInfo: UserHashInfo,
): SoknadTempStorageData | undefined => {
    if (
        data?.metadata?.version === STORAGE_VERSION &&
        data?.metadata.lastStepID !== undefined &&
        data.formData !== undefined &&
        data.metadata.soknadId !== undefined &&
        JSON.stringify(data.formData) !== JSON.stringify({}) &&
        createHashString(userHashInfo) === data.metadata.userHash
    ) {
        return data;
    }
    return undefined;
};

const SøknadTempStorage: SoknadTemporaryStorage = {
    update: (
        soknadId: string,
        formData: SoknadFormData,
        lastStepID: StepID,
        userHashInfo: UserHashInfo,
        søknadstype: ApplicationType,
    ) => {
        return persistSetup(søknadstype).update({
            formData,
            metadata: {
                soknadId,
                lastStepID,
                version: STORAGE_VERSION,
                userHash: createHashString(userHashInfo),
            },
        });
    },
    create: (søknadstype: ApplicationType) => persistSetup(søknadstype).create(),
    purge: (søknadstype: ApplicationType) => persistSetup(søknadstype).purge(),
    rehydrate: (søknadstype: ApplicationType) => persistSetup(søknadstype).rehydrate(),
};

export default SøknadTempStorage;
