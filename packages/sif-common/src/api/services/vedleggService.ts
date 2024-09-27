import { axiosMultipartConfig, k9BrukerdialogApiClient } from '../apiClient';

const serviceUrl = '/vedlegg';

const VEDLEGG_ID_SPLIT_KEY = 'vedlegg/';

export const getAttachmentId = (url: string): string => {
    const id = url.split(VEDLEGG_ID_SPLIT_KEY)[1];
    if (!id || id.length === 0) {
        throw new Error('Kunne ikke hente vedleggId fra url');
    }
    return id;
};

export const vedleggService = {
    post: async (file: File) => {
        const formData = new FormData();
        formData.append('vedlegg', file);
        const response = await k9BrukerdialogApiClient.post(serviceUrl, formData, axiosMultipartConfig);
        response.headers.vedleggId = getAttachmentId(response.headers.location);
        return response;
    },
    /**
     *
     * @param attachmentUrlBackend url som mottas fra backend ved opplasting
     * @returns AxiosResponse
     */
    delete: async (id: string) => {
        return k9BrukerdialogApiClient.delete(`${serviceUrl}/${id}`);
    },
};
