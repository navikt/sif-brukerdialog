import { useEffect, useMemo, useRef } from 'react';
import { Attachment } from '../types';
import {
    attachmentIsUploadedAndIsValidFileFormat,
    getTotalSizeOfAttachments,
    hasPendingAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '../utils/attachmentUtils';

const useAttachmentsHelper = (
    attachments: Attachment[] | undefined = [],
    otherAttachments: Attachment[] | undefined = [],
    onChange?: (attachments: Attachment[]) => void,
) => {
    const dokumenter: Attachment[] = useMemo(() => {
        return attachments || [];
    }, [attachments]);

    const hasPendingUploads: boolean = hasPendingAttachments(attachments);
    const totalSize = getTotalSizeOfAttachments([...attachments, ...otherAttachments]);
    const maxTotalSizeExceeded = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

    const ref = useRef({ dokumenter });
    useEffect(() => {
        if (hasPendingUploads || !onChange) {
            return;
        }
        const doks = dokumenter.filter(attachmentIsUploadedAndIsValidFileFormat);
        if (doks.length !== ref.current.dokumenter.length || doks.length !== dokumenter.length) {
            onChange(doks);
        }
        ref.current = {
            dokumenter,
        };
    }, [dokumenter]);

    return {
        attachments: dokumenter,
        hasPendingUploads,
        totalSize,
        maxTotalSizeExceeded,
    };
};

export default useAttachmentsHelper;
