import { getCommonEnv } from '@sif/env';
import { VedleggController, zHentVedleggResponse } from '@sif/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../../shared/errorHandlers';

/**
 * Extract vedlegg ID from response location header
 * @param url The location URL returned from the upload response
 * @returns The vedlegg ID
 */
export const getVedleggIdFromResponseHeaderLocation = (url: string | undefined): string => {
    if (!url) {
        throw new Error('Kunne ikke hente vedleggId fordi response header Location mangler');
    }

    const id = url.split('vedlegg/')[1];
    if (!id || id.length === 0) {
        throw new Error('Kunne ikke hente vedleggId fra url');
    }
    return id;
};

export const getVedleggFrontendUrl = (id: string): string => {
    const { K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH } = getCommonEnv();
    return `${K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}/vedlegg/${id}`;
};

export const getVedleggApiUrl = (id: string): string => {
    const { K9_BRUKERDIALOG_PROSESSERING_API_URL } = getCommonEnv();
    return `${K9_BRUKERDIALOG_PROSESSERING_API_URL}/vedlegg/${id}`;
};

/**
 * Lagrer et vedlegg til k9-brukerdialog-prosessering-api
 *
 * @param vedlegg Vedlegget som skal lagres (Blob eller File)
 * @returns Promise med upload response
 * @throws AxiosError uendret – useFileUploader leser code/status for å skille timeout og 400
 */
export const lagreVedlegg = async (vedlegg: Blob | File) => {
    return VedleggController.lagreVedlegg({
        body: {
            vedlegg,
        },
    });
};

/**
 * Sletter et vedlegg fra k9-brukerdialog-prosessering-api
 *
 * @param vedleggId ID-en til vedlegget som skal slettes
 * @returns Promise med sletting response
 * @throws ApiError hvis API-kallet feiler
 */
export const slettVedlegg = async (vedleggId: string) => {
    try {
        const response = await VedleggController.slettVedlegg({
            path: {
                vedleggId,
            },
        });
        return response.data;
    } catch (error) {
        throw handleApiError(error, 'slettVedlegg');
    }
};

/**
 * Henter et spesifikt vedlegg fra k9-brukerdialog-prosessering-api
 *
 * @param vedleggId ID-en til vedlegget som skal hentes
 * @returns Promise med vedleggsdata
 * @throws ApiError hvis API-kallet feiler eller data ikke kan parses
 */
export const hentVedlegg = async (vedleggId: string) => {
    try {
        const response = await VedleggController.hentVedlegg({
            path: {
                vedleggId,
            },
        });
        return zHentVedleggResponse.parse(response.data);
    } catch (error) {
        throw handleApiError(error, 'hentVedlegg');
    }
};
