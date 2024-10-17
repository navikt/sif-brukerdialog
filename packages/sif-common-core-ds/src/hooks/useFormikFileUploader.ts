import { FileRejection } from 'react-dropzone';
import { getVedleggFrontendUrl, uploadVedlegg } from '@navikt/sif-common';
import { ArrayHelpers } from 'formik';
import { Attachment, PersistedFile } from '../types';
import { isForbidden, isUnauthorized } from '../utils/apiUtils';
import {
    attachmentShouldBeProcessed,
    attachmentShouldBeUploaded,
    attachmentUploadHasFailed,
    getAttachmentFromFile,
    getAttachmentId,
    getPendingAttachmentFromFile,
    isFileObject,
    mapFileToPersistedFile,
} from '../utils/attachmentUtils';

export type FormikFieldArrayReplaceFn = (index: number, value: any) => void;
export type FormikFieldArrayPushFn = (obj: any) => void;
export type FormikFieldArrayRemoveFn = (index: number) => undefined;

interface Props {
    value: Attachment[];
    onUnauthorizedOrForbiddenUpload: () => void;
    onErrorUploadingFiles: (files: File[]) => void;
}
export const useFormikFileUploader = ({ value, onErrorUploadingFiles, onUnauthorizedOrForbiddenUpload }: Props) => {
    async function uploadAttachment(attachment: Attachment) {
        const { file } = attachment;
        if (isFileObject(file)) {
            try {
                const response = await uploadVedlegg(file);
                const location = response.headers.location;
                const id = getAttachmentId(location);
                attachment.pending = false;
                attachment.info = {
                    location,
                    id,
                    url: getVedleggFrontendUrl(id),
                };
                attachment.uploaded = true;
            } catch (error) {
                if (isForbidden(error) || isUnauthorized(error)) {
                    onUnauthorizedOrForbiddenUpload();
                }
                attachment.pending = false;
            }
        }
    }

    async function uploadAttachments(
        allAttachments: Attachment[],
        fileRejections: FileRejection[],
        replaceFn: FormikFieldArrayReplaceFn,
    ) {
        const attachmentsToProcess = findAttachmentsToProcess(allAttachments);
        const attachmentsToUpload = findAttachmentsToUpload(attachmentsToProcess);

        const attachmentsNotToUpload = [
            ...attachmentsToProcess.filter((el) => !attachmentsToUpload.includes(el)),
            ...fileRejections.map((f) => getAttachmentFromFile(f.file)),
        ];

        for (const attachment of attachmentsToUpload) {
            await uploadAttachment(attachment);
            updateAttachmentListElement(allAttachments, attachment, replaceFn);
        }

        const failedAttachments = [...attachmentsNotToUpload, ...attachmentsToUpload.filter(attachmentUploadHasFailed)];
        updateFailedAttachments(failedAttachments);
    }

    function updateFailedAttachments(failedAttachments: Attachment[]) {
        if (failedAttachments.length === 0) {
            return;
        }
        failedAttachments.forEach((attachment) => {
            attachment.pending = false;
        });

        const failedFiles: File[] = failedAttachments
            .map(({ file }) => file)
            .filter((f: File | PersistedFile) => isFileObject(f)) as File[];

        onErrorUploadingFiles(failedFiles);
    }

    function findAttachmentsToProcess(attachments: Attachment[]): Attachment[] {
        return attachments.filter(attachmentShouldBeProcessed);
    }

    function findAttachmentsToUpload(attachments: Attachment[]): Attachment[] {
        return attachments.filter(attachmentShouldBeUploaded);
    }

    function updateAttachmentListElement(
        attachments: Attachment[],
        attachment: Attachment,
        replaceFn: FormikFieldArrayReplaceFn,
    ) {
        replaceFn(attachments.indexOf(attachment), { ...attachment, file: mapFileToPersistedFile(attachment.file) });
    }

    function addPendingAttachmentToFieldArray(file: File, pushFn: FormikFieldArrayPushFn) {
        const attachment = getPendingAttachmentFromFile(file);
        pushFn(attachment);
        return attachment;
    }

    const onFilesSelect = async (files: File[], rejectedFiles: FileRejection[], { push, replace }: ArrayHelpers) => {
        const attachments = files.map((file) => addPendingAttachmentToFieldArray(file, push));
        await uploadAttachments([...value, ...attachments], rejectedFiles, replace);
    };

    return {
        onFilesSelect,
    };
};
