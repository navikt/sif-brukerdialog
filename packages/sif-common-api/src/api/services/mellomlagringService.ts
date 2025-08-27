import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { storageParser } from '../../utils/storageParser';
import { getK9BrukerdialogApiClient } from '../k9BrukerdialogApiClient';
import { MellomlagringYtelse } from '../types';

dayjs.extend(customParseFormat);

export interface MellomlagringInterface<StorageFormat> {
    update: (data: StorageFormat) => Promise<AxiosResponse>;
    create: () => Promise<AxiosResponse>;
    fetch: () => Promise<StorageFormat>;
    purge: () => Promise<AxiosResponse>;
}

export function getMellomlagringService<StorageFormat>(
    ytelse: MellomlagringYtelse,
): MellomlagringInterface<StorageFormat> {
    const url = `/mellomlagring/${ytelse}`;
    return {
        update: (data: StorageFormat) => {
            return getK9BrukerdialogApiClient().put(url, data);
        },
        create: (data?: StorageFormat) => {
            return getK9BrukerdialogApiClient().post(url, data);
        },
        fetch: async () => {
            return (await getK9BrukerdialogApiClient().get(url, { transformResponse: storageParser })).data;
        },
        purge: () => {
            return getK9BrukerdialogApiClient().delete(url, { data: {} });
        },
    };
}
