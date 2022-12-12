import soknadTempStorage from '../soknad/soknadTempStorage';
import { ApplicationType } from '../types/ApplicationType';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';

const getSoknadTempStorage = async (søknadstype: ApplicationType): Promise<SoknadTempStorageData> => {
    try {
        const { data } = await soknadTempStorage.rehydrate(søknadstype);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default getSoknadTempStorage;
