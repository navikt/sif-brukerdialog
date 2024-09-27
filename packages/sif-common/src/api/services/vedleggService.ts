import { getAttachmentId } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { axiosMultipartConfig, k9BrukerdialogApiClient } from '../apiClient';

const serviceUrl = '/vedlegg';

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
