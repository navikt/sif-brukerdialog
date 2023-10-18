import soknadTempStorage from '../soknad/soknadTempStorage';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import { Søknadstype } from '../types/Søknadstype';

const getSoknadTempStorage = async (søknadstype: Søknadstype): Promise<SoknadTempStorageData> => {
    try {
        const { data } = await soknadTempStorage.rehydrate(søknadstype);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default getSoknadTempStorage;
