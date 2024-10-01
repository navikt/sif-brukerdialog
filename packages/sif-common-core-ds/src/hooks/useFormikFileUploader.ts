import { FileRejection } from 'react-dropzone';
import { AxiosResponse } from 'axios';
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

export const useFormikFileUploader = ({
    value,
    uploadFile,
    onFilesUploaded,
    onErrorUploadingAttachments,
    onUnauthorizedOrForbiddenUpload,
    getAttachmentURLFrontend,
}: {
    value: Attachment[];
    uploadFile: (file: File) => Promise<AxiosResponse<any, any>>;
    onFilesUploaded?: (antall: number, antallFeilet: number) => void;
    onUnauthorizedOrForbiddenUpload: () => void;
    onErrorUploadingAttachments: (files: File[]) => void;
    getAttachmentURLFrontend: (url: string) => string;
}) => {
    async function uploadAttachment(attachment: Attachment) {
        const { file } = attachment;
        if (isFileObject(file)) {
            try {
                const response = await uploadFile(file);
                attachment = setAttachmentPendingToFalse(attachment);
                attachment.id = getAttachmentId(response.headers.location);
                attachment.url = getAttachmentURLFrontend(response.headers.location);
                attachment.uploaded = true;
            } catch (error) {
                if (isForbidden(error) || isUnauthorized(error)) {
                    onUnauthorizedOrForbiddenUpload();
                }
                setAttachmentPendingToFalse(attachment);
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
        updateFailedAttachments(allAttachments, failedAttachments, replaceFn);
        if (onFilesUploaded) {
            onFilesUploaded(attachmentsToUpload.length, failedAttachments.length);
        }
    }

    function updateFailedAttachments(
        allAttachments: Attachment[],
        failedAttachments: Attachment[],
        replaceFn: FormikFieldArrayReplaceFn,
    ) {
        failedAttachments.forEach((attachment) => {
            attachment = setAttachmentPendingToFalse(attachment);
            updateAttachmentListElement(allAttachments, attachment, replaceFn);
        });
        const failedFiles: File[] = failedAttachments
            .map(({ file }) => file)
            .filter((f: File | PersistedFile) => isFileObject(f)) as File[];

        onErrorUploadingAttachments(failedFiles);
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

    function setAttachmentPendingToFalse(attachment: Attachment) {
        attachment.pending = false;
        return attachment;
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
