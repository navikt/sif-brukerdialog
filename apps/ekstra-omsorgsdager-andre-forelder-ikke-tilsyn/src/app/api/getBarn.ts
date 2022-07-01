import { failure, RemoteData, success } from '@devexperts/remote-data-ts';
import { AxiosError } from 'axios';
import api from './api';
import { Barn } from '../types/SoknadFormData';
import { ApiEndpoint } from './api';
import { getApiUrl } from '../utils/apiUtils';

export type BarnRemoteData = RemoteData<AxiosError, Barn[]>;

interface BarnResultType {
    barn: Barn[];
}
const getBarnRemoteData = async (): Promise<BarnRemoteData> => {
    try {
        const { data } = await api.get<BarnResultType>(getApiUrl(ApiEndpoint.barn));
        return Promise.resolve(success(data.barn));
    } catch (error) {
        return Promise.reject(failure(error));
    }
};

export default getBarnRemoteData;
