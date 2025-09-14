import soknadTempStorage from '../soknad/soknadTempStorage';
import { Søknadstype } from '../types/Søknadstype';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';

const getSoknadTempStorage = async (søknadstype: Søknadstype): Promise<SoknadTempStorageData> => {
    try {
        const { data } = await soknadTempStorage.rehydrate(søknadstype);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default getSoknadTempStorage;
