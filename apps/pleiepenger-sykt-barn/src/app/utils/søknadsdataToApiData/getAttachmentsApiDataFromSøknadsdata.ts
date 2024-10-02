import { getAttachmentURLBackend } from '@navikt/sif-common';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { attachmentUploadHasFailed } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';

export const getAttachmentsApiDataFromSøknadsdata = (attachments: Attachment[]): string[] => {
    const apiData: string[] = [];
    attachments
        .filter((attachment) => !attachmentUploadHasFailed(attachment))
        .forEach((a) => {
            if (a.url) {
                const attachmentUrl = getAttachmentURLBackend(a.url);
                apiData.push(attachmentUrl);
            }
        });
    return apiData;
};
