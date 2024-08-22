import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { attachmentUtils } from '@navikt/sif-common-soknad-ds/src';

/**
 * Lager URL for å lage lenke til vedlegg i frontend.
 * @param responseHeaderVedleggUrl URL mottatt fra backend ved opplasting av fil
 * @returns URL som kan brukes i frontend i a href lenke
 */
export const getAttachmentURLFrontend = (responseHeaderVedleggUrl: string): string => {
    return attachmentUtils.getAttachmentFrontendURL(
        responseHeaderVedleggUrl,
        getEnvironmentVariable('FRONTEND_VEDLEGG_URL'),
    );
};

/**
 * Henter ut vedlegg URL for backend fra frontend URL.
 * @param frontendVedleggUrl URL som er generert for å brukes i frontend (a href link)
 * @returns URL som kan brukes for å finne vedlegg i backend. Samme som er mottatt fra backend ved opplasting.
 */
export const getAttachmentURLBackend = (frontendVedleggUrl: string): string => {
    return attachmentUtils.getAttachmentBackendURL(frontendVedleggUrl, getEnvironmentVariable('VEDLEGG_API_URL'));
};
