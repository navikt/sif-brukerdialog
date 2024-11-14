import { useEffect, useMemo, useRef } from 'react';
import { Vedlegg } from '../types/Vedlegg';
import { MAX_TOTAL_VEDLEGG_SIZE_BYTES } from '../components/formik-file-upload/getVedleggValidator';

const vedleggIsUploaded = (vedlegg: Vedlegg): boolean => vedlegg.uploaded === true;

const hasPendingVedlegg = (vedlegg: Vedlegg[] | undefined): boolean => (vedlegg || [])?.some((v) => v.pending);

const getTotalSizeOfVedlegg = (vedlegg: Vedlegg[]): number =>
    vedlegg
        .filter((v: Vedlegg) => v.uploaded)
        .map((v: Vedlegg) => v.file.size)
        .reduce((prev, curr) => prev + curr, 0);

const removeDuplicates = (vedlegg: Vedlegg[]): Vedlegg[] => {
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

export const useVedleggHelper = (
    vedlegg: Vedlegg[] | undefined = [],
    otherVedlegg: Vedlegg[] | undefined = [],
    onChange?: (vedlegg: Vedlegg[]) => void,
) => {
    const memoizedVedlegg: Vedlegg[] = useMemo(() => {
        return vedlegg || [];
    }, [vedlegg]);

    const hasPendingUploads: boolean = hasPendingVedlegg(vedlegg);
    const totalSize = getTotalSizeOfVedlegg(removeDuplicates([...vedlegg, ...otherVedlegg]));
    const maxTotalSizeExceeded = totalSize > MAX_TOTAL_VEDLEGG_SIZE_BYTES;

    const ref = useRef({ memoizedVedlegg });

    useEffect(() => {
        if (hasPendingUploads || !onChange) {
            return;
        }
        const uploadedVedlegg = memoizedVedlegg.filter(vedleggIsUploaded);
        if (
            uploadedVedlegg.length !== ref.current.memoizedVedlegg.length ||
            uploadedVedlegg.length !== memoizedVedlegg.length
        ) {
            onChange(uploadedVedlegg);
        }
        ref.current = {
            memoizedVedlegg: memoizedVedlegg,
        };
    }, [memoizedVedlegg]);

    return {
        hasPendingUploads,
        totalSize,
        maxTotalSizeExceeded,
    };
};
