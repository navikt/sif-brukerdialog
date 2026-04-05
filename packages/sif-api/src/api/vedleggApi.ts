import { VedleggController, zHentVedleggResponse } from '@navikt/k9-brukerdialog-prosessering-api';
import { getCommonEnv } from '@navikt/sif-common-env';

/**
 * Extract vedlegg ID from response location header
 * @param url The location URL returned from the upload response
 * @returns The vedlegg ID
 */
export const getVedleggIdFromResponseHeaderLocation = (url: string): string => {
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
 * @throws Error hvis API-kallet feiler
 */
export const lagreVedlegg = async (vedlegg: Blob | File) => {
    const response = await VedleggController.lagreVedlegg({
        body: {
            vedlegg,
        },
    });
    return response;
};

/**
 * Sletter et vedlegg fra k9-brukerdialog-prosessering-api
 *
 * @param vedleggId ID-en til vedlegget som skal slettes
 * @returns Promise med sletting response
 * @throws Error hvis API-kallet feiler
 */
export const slettVedlegg = async (vedleggId: string) => {
    const response = await VedleggController.slettVedlegg({
        path: {
            vedleggId,
        },
    });
    return response.data;
};

/**
 * Henter et spesifikt vedlegg fra k9-brukerdialog-prosessering-api
 *
 * @param vedleggId ID-en til vedlegget som skal hentes
 * @returns Promise med vedleggsdata
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentVedlegg = async (vedleggId: string) => {
    const response = await VedleggController.hentVedlegg({
        path: {
            vedleggId,
        },
    });
    return zHentVedleggResponse.parse(response.data);
};
