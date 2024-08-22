import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';

const SPLIT_KEY = 'vedlegg/';

/**
 * Henter ut ID til et opplastet dokument ut fra URL som kommer i response header ved opplasting, eller som er generert fra frontend-url
 * @param url string
 * @returns string
 */
export const getVedleggId = (url: string): string => {
    const id = url.split(SPLIT_KEY)[1];
    if (!id || id.length === 0) {
        throw new Error('Kunne ikke hente vedleggId fra url');
    }
    return id;
};

/**
 * Lager URL for å lage lenke til vedlegg i frontend.
 * @param responseHeaderVedleggUrl URL mottatt fra backend ved opplasting av fil
 * @returns URL som kan brukes i frontend i a href lenke
 */
export const getAttachmentURLFrontend = (responseHeaderVedleggUrl: string): string => {
    try {
        const vedleggId = getVedleggId(responseHeaderVedleggUrl);
        return `${getEnvironmentVariable('FRONTEND_VEDLEGG_URL')}/${SPLIT_KEY}${vedleggId}`;
    } catch {
        return depr_getAttachmentURLFrontend(responseHeaderVedleggUrl);
    }
};

/**
 * Henter ut vedlegg URL for backend fra frontend URL.
 * @param frontendVedleggUrl URL som er generert for å brukes i frontend (a href link)
 * @returns URL som kan brukes for å finne vedlegg i backend. Samme som er mottatt fra backend ved opplasting.
 */
export const getAttachmentURLBackend = (frontendVedleggUrl: string): string => {
    try {
        const vedleggId = getVedleggId(frontendVedleggUrl);
        return `${getEnvironmentVariable('VEDLEGG_API_URL')}/${SPLIT_KEY}${vedleggId}`;
    } catch {
        return depr_getAttachmentURLBackend(frontendVedleggUrl);
    }
};

const depr_getAttachmentURLFrontend = (url: string): string => {
    return url.replace(getEnvironmentVariable('VEDLEGG_API_URL'), getEnvironmentVariable('FRONTEND_VEDLEGG_URL'));
};

const depr_getAttachmentURLBackend = (url?: string): string => {
    if (url !== undefined) {
        return url.replace(getEnvironmentVariable('FRONTEND_VEDLEGG_URL'), getEnvironmentVariable('VEDLEGG_API_URL'));
    }
    return '';
};
