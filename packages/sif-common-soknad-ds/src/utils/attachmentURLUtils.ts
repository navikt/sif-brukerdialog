const VEDLEGG_ID_SPLIT_KEY = 'vedlegg/';

/**
 * Henter ut ID til et opplastet dokument ut fra URL som kommer i response header ved opplasting, eller som er generert fra frontend-url
 * @param url string
 * @returns string
 */
export const getAttachmentId = (url: string = ''): string => {
    const id = url.split(VEDLEGG_ID_SPLIT_KEY)[1];
    if (!id || id.length === 0) {
        throw new Error('Kunne ikke hente vedleggId fra url');
    }
    return id;
};

// /**
//  * Lager URL for å lage lenke til vedlegg i frontend.
//  * @param url URL mottatt fra backend ved opplasting av fil
//  * @param frontendAttachmentURL URL path som brukes som base for å lage lenke til vedlegg i frontend
//  * @returns URL som kan brukes i frontend i a href lenke
//  */
// export const getAttachmentFrontendURL = (url: string, frontendAttachmentURL: string): string => {
//     try {
//         const vedleggId = getAttachmentId(url);
//         return `${frontendAttachmentURL}/${VEDLEGG_ID_SPLIT_KEY}${vedleggId}`;
//     } catch {
//         return url;
//     }
// };

// /**
//  * Henter ut vedlegg URL for backend fra frontend URL.
//  * @param url URL som er generert for å brukes i frontend (a href link)
//  * @param backendAttachmentURL URL path som brukes som base for å lage url som sendes til backend
//  * @returns URL som kan brukes for å finne vedlegg i backend. Samme som er mottatt fra backend ved opplasting.
//  */
// export const getAttachmentBackendURL = (url: string, backendAttachmentURL: string): string => {
//     try {
//         const vedleggId = getAttachmentId(url);
//         return `${backendAttachmentURL}/${VEDLEGG_ID_SPLIT_KEY}${vedleggId}`;
//     } catch {
//         return url;
//     }
// };

// /**
//  * Midlertidig funksjon for å fikse ugyldig frontend URL når URL ikke inneholder hele path for at lenke til dokumentet er riktig
//  * @param url URL som skal fikses
//  * @param frontendAttachmentURL URL path som brukes som base for å lage lenke til vedlegg i frontend
//  * @returns URL som kan brukes i frontend i a href lenke
//  */
// const fixInvalidPathInFrontendURL = (url: string, frontendAttachmentURL: string) => {
//     if (url.indexOf(frontendAttachmentURL) === -1) {
//         return getAttachmentFrontendURL(url, frontendAttachmentURL);
//     }
//     return url;
// };

// export const attachmentURLUtils = {
//     getAttachmentId,
//     getAttachmentFrontendURL,
//     getAttachmentBackendURL,
//     fixInvalidPathInFrontendURL,
// };
