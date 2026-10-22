import { getCommonEnv } from '@sif/env';
import { AxiosResponse } from 'axios';

import { axiosMultipartConfig, k9BrukerdialogApiClient } from '../apiClient';
import { vedleggEksistensResponseSchema } from '../schemas/vedleggSchema';

const servicePath = '/vedlegg';

export const uploadVedlegg = async (file: File): Promise<AxiosResponse<any, any>> => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    return k9BrukerdialogApiClient.post(servicePath, formData, axiosMultipartConfig);
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
 * Henter ID-ene til vedlegg som ikke finnes i backend, f.eks. når søknaden er hentet fra mellomlagring.
 * Endepunktet tar maks 20 ID-er per kall. Det er ok, siden søknadene i praksis ikke har flere vedlegg enn det.
 *
 * @param vedleggIder ID-ene til vedleggene som skal sjekkes
 * @returns ID-ene til vedlegg som mangler i backend
 */
export const fetchManglendeVedleggIder = async (vedleggIder: string[]): Promise<string[]> => {
    if (vedleggIder.length === 0) {
        return [];
    }
    const response = await k9BrukerdialogApiClient.post(`${servicePath}/eksisterer`, { vedleggIder });
    return vedleggEksistensResponseSchema
        .parse(response.data)
        .filter((v) => !v.finnes)
        .map((v) => v.vedleggId);
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
