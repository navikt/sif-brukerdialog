import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/lib/utils/persistence/persistence';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';
import { axiosJsonConfig } from '../api/api';
import { ApiEndpoint } from '../types/ApiEndpoint';
import { Person } from '../types/Person';
import { Barn, SoknadFormData } from '../types/SoknadFormData';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import { StepID } from './soknadStepsConfig';

export const STORAGE_VERSION = '2.1';

interface UserHashInfo {
    søker: Person;
    barn: Barn[];
}

interface SoknadTemporaryStorage extends Omit<PersistenceInterface<SoknadTempStorageData>, 'update'> {
    update: (
        soknadId: string,
        formData: Partial<SoknadFormData>,
        lastStepID: StepID,
        søkerInfo: UserHashInfo
    ) => Promise<AxiosResponse>;
}

const persistSetup = persistence<SoknadTempStorageData>({
    url: ApiEndpoint.mellomlagring,
    requestConfig: { ...axiosJsonConfig },
});

export const isStorageDataValid = (
    data: SoknadTempStorageData,
    userHashInfo: UserHashInfo
): SoknadTempStorageData | undefined => {
    if (
        data?.metadata?.version === STORAGE_VERSION &&
        data?.metadata.lastStepID !== undefined &&
        data.formData !== undefined &&
        data.metadata.soknadId !== undefined &&
        JSON.stringify(data.formData) !== JSON.stringify({}) &&
        hash(userHashInfo) === data.metadata.userHash
    ) {
        return data;
    }
    return undefined;
};

const soknadTempStorage: SoknadTemporaryStorage = {
    create: () => {
        return persistSetup.create();
    },
    update: (soknadId: string, formData: SoknadFormData, lastStepID: StepID, userHashInfo: UserHashInfo) => {
        return persistSetup.update({
            formData,
            metadata: { soknadId, lastStepID, version: STORAGE_VERSION, userHash: hash(userHashInfo) },
        });
    },
    purge: () => {
        return persistSetup.purge();
    },
    rehydrate: persistSetup.rehydrate,
};

export default soknadTempStorage;
