import { useEffect, useMemo, useRef } from 'react';
import { Attachment } from '../types';
import {
    attachmentIsUploadedAndIsValidFileFormat,
    getTotalSizeOfAttachments,
    hasPendingAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '../utils/attachmentUtils';

export const useAttachmentsHelper = (
    attachments: Attachment[] | undefined = [],
    otherAttachments: Attachment[] | undefined = [],
    onChange?: (attachments: Attachment[]) => void,
) => {
    const memoizedAttachments: Attachment[] = useMemo(() => {
        return attachments || [];
    }, [attachments]);

    const hasPendingUploads: boolean = hasPendingAttachments(attachments);
    const totalSize = getTotalSizeOfAttachments([...attachments, ...otherAttachments]);
    const maxTotalSizeExceeded = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

    const ref = useRef({ memoizedAttachments });
    useEffect(() => {
        if (hasPendingUploads || !onChange) {
            return;
        }
        const uploadedAndValidAttachments = memoizedAttachments.filter(attachmentIsUploadedAndIsValidFileFormat);
        if (
            uploadedAndValidAttachments.length !== ref.current.memoizedAttachments.length ||
            uploadedAndValidAttachments.length !== memoizedAttachments.length
        ) {
            onChange(uploadedAndValidAttachments);
        }
        ref.current = {
            memoizedAttachments,
        };
    }, [memoizedAttachments]);

    return {
        hasPendingUploads,
        totalSize,
        maxTotalSizeExceeded,
    };
};
