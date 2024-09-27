import { axiosMultipartConfig, k9BrukerdialogApiClient } from '../apiClient';

const serviceUrl = '/vedlegg';

export const vedleggService = {
    get: (vedleggId: string) => {
        return k9BrukerdialogApiClient.get(`${serviceUrl}/${vedleggId}`);
    },
    post: (file: File) => {
        const formData = new FormData();
        formData.append('vedlegg', file);
        return k9BrukerdialogApiClient.post(serviceUrl, formData, axiosMultipartConfig);
    },
    delete: async (vedleggId: string) => {
        return k9BrukerdialogApiClient.delete(`${serviceUrl}/${vedleggId}`);
    },
};
