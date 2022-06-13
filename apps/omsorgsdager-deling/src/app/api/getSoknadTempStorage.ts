import { failure, RemoteData, success } from '@devexperts/remote-data-ts';
import { AxiosError } from 'axios';
import { ApiEndpoint } from '../types/ApiEndpoint';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import api from './api';

type SoknadTempStorageRemoteData = RemoteData<AxiosError<any>, SoknadTempStorageData>;

const getSoknadTempStorage = async (): Promise<SoknadTempStorageRemoteData> => {
    try {
        const { data } = await api.get<SoknadTempStorageData>(ApiEndpoint.mellomlagring);
        return Promise.resolve(success(data));
    } catch (error) {
        return Promise.reject(failure(error));
    }
};

export default getSoknadTempStorage;
