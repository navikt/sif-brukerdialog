import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { storageParser } from '../../utils/storageParser';
import { k9BrukerdialogApiClient } from '../apiClient';
import { MellomlagringYtelse } from '../types';

dayjs.extend(customParseFormat);

export interface MellomlagringInterface<StorageFormat> {
    update: (data: StorageFormat) => Promise<AxiosResponse>;
    create: () => Promise<AxiosResponse>;
    fetch: () => Promise<StorageFormat>;
    purge: () => Promise<AxiosResponse>;
}

export function getMellomlagringServiceForYtelse<StorageFormat>(
    ytelse: MellomlagringYtelse,
): MellomlagringInterface<StorageFormat> {
    const url = `/mellomlagring/${ytelse}`;
    return {
        update: (data: StorageFormat) => {
            return k9BrukerdialogApiClient.put(url, data);
        },
        create: (data?: StorageFormat) => {
            return k9BrukerdialogApiClient.post(url, data);
        },
        fetch: async () => {
            return (await k9BrukerdialogApiClient.get(url, { transformResponse: storageParser })).data;
        },
        purge: () => {
            return k9BrukerdialogApiClient.delete(url, { data: {} });
        },
    };
}
