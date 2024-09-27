import { axiosMultipartConfig, k9BrukerdialogApiClient } from '../apiClient';

const serviceUrl = '/vedlegg';

export const vedleggService = {
    post: (file: File) => {
        const formData = new FormData();
        formData.append('vedlegg', file);
        return k9BrukerdialogApiClient.post(serviceUrl, formData, axiosMultipartConfig);
    },
    /**
     *
     * @param attachmentUrlBackend url som mottas fra backend ved opplasting
     * @returns AxiosResponse
     */
    delete: async (attachmentUrlBackend: string) => {
        return k9BrukerdialogApiClient.delete(attachmentUrlBackend);
    },
};
