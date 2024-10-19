import { AxiosResponse } from 'axios';
import { axiosMultipartConfig, k9BrukerdialogApiClient } from '../apiClient';
import { commonEnv } from '@navikt/sif-common-env';

const servicePath = '/vedlegg';

export const uploadVedlegg = async (file: File): Promise<AxiosResponse<any, any>> => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    try {
        return k9BrukerdialogApiClient.post(servicePath, formData, axiosMultipartConfig);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw e;
    }
};

/**
 *
 * @param attachmentUrlBackend url som mottas fra backend ved opplasting
 * @returns AxiosResponse
 */
export const deleteVedlegg = async (id: string): Promise<AxiosResponse<any, any>> => {
    const url = `${servicePath}/${id}`;
    return k9BrukerdialogApiClient.delete(url);
};

/**
 *
 * @param id vedlegg-id
 * @returns url til frontend for å hente vedlegg
 */
export const getVedleggFrontendUrl = (id: string): string => {
    return `${commonEnv.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}${servicePath}/${id}`;
};
