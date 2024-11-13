import { AxiosResponse } from 'axios';
import { axiosMultipartConfig, k9BrukerdialogApiClient } from '../apiClient';
import { getCommonEnv } from '@navikt/sif-common-env';

const servicePath = '/vedlegg';

export const uploadVedlegg = async (file: File): Promise<AxiosResponse<any, any>> => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    try {
        return k9BrukerdialogApiClient.post(servicePath, formData, { ...axiosMultipartConfig, timeout: 2500 });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw e;
    }
};

/**
 *
 * @param id id til vedlegg som skal slettes - referanse til backend
 * @returns axios promise
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
    return `${getCommonEnv().K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}${servicePath}/${id}`;
};

/**
 *
 * @param url url som mottas fra backend ved opplasting. URL settes som location i response.headers
 * @returns vedlegg-id
 */

export const getVedleggIdFromResponseHeaderLocation = (url: string) => {
    const id = url.split('vedlegg/')[1];
    if (!id || id.length === 0) {
        throw new Error('Kunne ikke hente vedleggId fra url');
    }
    return id;
};
