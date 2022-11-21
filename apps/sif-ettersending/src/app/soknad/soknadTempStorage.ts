import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/lib/utils/persistence/persistence';
import { StepID } from '../config/stepConfig';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';
import { ApiEndpoint } from '../types/ApiEndpoint';
import { Person } from '../types/Person';
import { SoknadFormData } from '../types/SoknadFormData';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import { axiosJsonConfig } from '../api/api';

export const STORAGE_VERSION = '2.0';

interface UserHashInfo {
    søker: Person;
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
    url: ApiEndpoint.MELLOMLAGRING,
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

const SøknadTempStorage: SoknadTemporaryStorage = {
    update: (soknadId: string, formData: SoknadFormData, lastStepID: StepID, userHashInfo: UserHashInfo) => {
        return persistSetup.update({
            formData,
            metadata: { soknadId, lastStepID, version: STORAGE_VERSION, userHash: hash(userHashInfo) },
        });
    },
    create: persistSetup.create,
    purge: persistSetup.purge,
    rehydrate: persistSetup.rehydrate,
};

export default SøknadTempStorage;
