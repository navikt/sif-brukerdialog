import api, { ApiEndpointPsb } from '../api';

type PleietrengendeDTO = {
    isValid: boolean;
};

const pleietrengendeEndpoint = {
    isValid: async (): Promise<boolean> => {
        const response = await api.psb.get<PleietrengendeDTO>(ApiEndpointPsb.pleietrengende);
        if (response && response.data) {
            const { data } = response;
            if (data.isValid === true || data.isValid === false) {
                return Promise.resolve(data.isValid);
            }
            return Promise.reject('Invalid pleietrengende response');
        }
        return Promise.reject();
    },
};

export default pleietrengendeEndpoint;
