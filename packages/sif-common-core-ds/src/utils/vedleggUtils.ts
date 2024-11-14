import { getCommonEnv } from '@navikt/sif-common-env';
import { Vedlegg } from '../types/Vedlegg';

const VEDLEGG_ID_SPLIT_KEY = 'vedlegg/';

export const vedleggIsUploadedAndValid = (vedlegg: Vedlegg): boolean =>
    vedlegg.pending === false &&
    vedlegg.uploaded === true &&
    vedlegg.info !== undefined &&
    (vedlegg as Vedlegg).error !== true;

export const getUploadedVedlegg = (vedlegg: Vedlegg[]): Vedlegg[] => vedlegg.filter(vedleggIsUploadedAndValid);

export const getHasPendingUploads = (vedlegg: Vedlegg[]): boolean => vedlegg.some((v) => v.pending === true);

export const removeDuplicateVedlegg = (vedlegg: Vedlegg[]): Vedlegg[] => {
    const uniqueVedlegg: Vedlegg[] = [];
    vedlegg.forEach((v) => {
        if (v.info) {
            if (!uniqueVedlegg.some((ua) => ua.info?.id === v.info?.id)) {
                uniqueVedlegg.push(v);
            }
        }
    });
    return uniqueVedlegg;
};

export const getTotalSizeOfVedlegg = (vedlegg: Vedlegg[]): number =>
    vedlegg
        .filter((v: Vedlegg) => v.uploaded)
        .map((v: Vedlegg) => v.file.size)
        .reduce((prev, curr) => prev + curr, 0);

export const getVedleggApiData = (vedlegg: Vedlegg[] = []): string[] => {
    const apiData: string[] = [];
    vedlegg.forEach((v) => {
        const location = v.info ? getBackendLocationFromVedleggId(v.info.id) : undefined;
        if (location) {
            apiData.push(location);
        }
    });
    return apiData;
};

export const getBackendLocationFromVedleggId = (id: string): string | undefined => {
    return `${getCommonEnv().K9_BRUKERDIALOG_PROSESSERING_API_URL}/${VEDLEGG_ID_SPLIT_KEY}${id}`;
};

export const getVedleggInLocationArray = ({
    locations,
    vedlegg,
}: {
    locations: string[] | undefined;
    vedlegg: Vedlegg[] | undefined;
}) => {
    if (!vedlegg || !locations) {
        return [];
    }
    return (vedlegg || []).filter((v) => {
        const id = v.info?.id;
        return id ? locations.some((l) => l.indexOf(id) >= 0) : false;
    });
};
