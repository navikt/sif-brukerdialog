import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { attachmentURLUtils } from '@navikt/sif-common-soknad-ds/src';

/**
 * Lager URL for å lage lenke til vedlegg i frontend.
 * @param responseHeaderVedleggUrl URL mottatt fra backend ved opplasting av fil
 * @returns URL som kan brukes i frontend i a href lenke
 */
export const getAttachmentURLFrontend = (responseHeaderVedleggUrl: string): string => {
    return attachmentURLUtils.getAttachmentFrontendURL(
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
    return attachmentURLUtils.getAttachmentBackendURL(frontendVedleggUrl, getEnvironmentVariable('VEDLEGG_API_URL'));
};

export const fixAttachmentURL = (a: Attachment) => {
    return {
        ...a,
        url: a.url
            ? attachmentURLUtils.fixInvalidPathInFrontendURL(a.url, getEnvironmentVariable('FRONTEND_VEDLEGG_URL'))
            : undefined,
    };
};
