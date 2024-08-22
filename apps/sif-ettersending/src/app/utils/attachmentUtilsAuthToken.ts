import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';

/**
 * Henter ut ID til et opplastet dokument ut fra URL som kommer i response header ved opplasting, eller som er generert fra frontend-url
 * @param url string
 * @returns string
 */
export const getVedleggId = (url: string): string => {
    return url.split('vedlegg/')[1];
};

/**
 * Lager URL for å lage lenke til vedlegg i frontend.
 * @param responseHeaderVedleggUrl URL mottatt fra backend ved opplasting av fil
 * @returns URL som kan brukes i frontend i a href lenke
 */
export const getAttachmentURLFrontend = (responseHeaderVedleggUrl: string): string => {
    const vedleggId = getVedleggId(responseHeaderVedleggUrl);
    return `${getEnvironmentVariable('FRONTEND_VEDLEGG_URL')}/${vedleggId}`;
};

/**
 * Henter ut vedlegg URL for backend fra frontend URL.
 * @param frontendVedleggUrl URL som er generert for å brukes i frontend (a href link)
 * @returns URL som kan brukes for å finne vedlegg i backend. Samme som er mottatt fra backend ved opplasting.
 */
export const getAttachmentURLBackend = (frontendVedleggUrl?: string): string => {
    if (frontendVedleggUrl !== undefined) {
        const vedleggId = getVedleggId(frontendVedleggUrl);
        return `${getEnvironmentVariable('VEDLEGG_API_URL')}/${vedleggId}`;
    }
    return '';
};
