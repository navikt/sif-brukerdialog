import { getAttachmentId } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { axiosMultipartConfig, k9BrukerdialogApiClient } from '../apiClient';
import { Attachment } from '@navikt/sif-common-core-ds/src/types';

const serviceUrl = '/vedlegg';

export const uploadVedlegg = async (file: File) => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    const response = await k9BrukerdialogApiClient.post(serviceUrl, formData, axiosMultipartConfig);
    response.headers.vedleggId = response.headers.location ? getAttachmentId(response.headers.location) : undefined;
    return response;
};

/**
 *
 * @param attachmentUrlBackend url som mottas fra backend ved opplasting
 * @returns AxiosResponse
 */
export const deleteVedlegg = async (attachment: Attachment | string) => {
    const id =
        typeof attachment === 'string'
            ? getAttachmentId(attachment)
            : attachment.id || (attachment.url !== undefined && getAttachmentId(attachment.url));
    if (id) {
        const url = `${serviceUrl}/${id}`;
        return k9BrukerdialogApiClient.delete(url);
    }
    throw new Error('Attachment has no id or url');
};
