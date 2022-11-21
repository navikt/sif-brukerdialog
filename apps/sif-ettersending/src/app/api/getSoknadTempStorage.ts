import { failure, RemoteData, success } from '@devexperts/remote-data-ts';
import soknadTempStorage from '../soknad/soknadTempStorage';
import { AxiosError } from 'axios';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';

type SoknadTempStorageRemoteData = RemoteData<AxiosError<any>, SoknadTempStorageData>;

const getSoknadTempStorage = async (): Promise<SoknadTempStorageRemoteData> => {
    try {
        const { data } = await soknadTempStorage.rehydrate();
        return Promise.resolve(success(data));
    } catch (error) {
        return Promise.reject(failure(error));
    }
};

export default getSoknadTempStorage;
