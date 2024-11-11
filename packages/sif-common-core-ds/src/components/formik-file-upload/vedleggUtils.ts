const VEDLEGG_ID_SPLIT_KEY = 'vedlegg/';

export const getVedleggIdFromLocation = (url: string) => {
    const id = url.split(VEDLEGG_ID_SPLIT_KEY)[1];
    if (!id || id.length === 0) {
        throw new Error('Kunne ikke hente vedleggId fra url');
    }
    return id;
};
