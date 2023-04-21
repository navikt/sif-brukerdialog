import React from 'react';
import { FormikFileInput, TypedFormInputValidationProps } from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { AxiosError, AxiosResponse } from 'axios';
import { ArrayHelpers } from 'formik';
import { Attachment, PersistedFile } from '../../types/Attachment';
import { isForbidden, isUnauthorized } from '../../utils/apiUtils';
import {
    attachmentShouldBeProcessed,
    attachmentShouldBeUploaded,
    attachmentUploadHasFailed,
    getPendingAttachmentFromFile,
    isFileObject,
    VALID_EXTENSIONS,
} from '../../utils/attachmentUtils';

export type FieldArrayReplaceFn = (index: number, value: any) => void;
export type FieldArrayPushFn = (obj: any) => void;
export type FieldArrayRemoveFn = (index: number) => undefined;

interface FormikFileUploader<FieldName> extends TypedFormInputValidationProps<FieldName, ValidationError> {
    name: string;
    buttonLabel: string;
    value?: Attachment[];
    uploadFile: (file: File) => Promise<AxiosResponse<any>>;
    onFileInputClick?: () => void;
    onApiError: (error: AxiosError) => void;
    onErrorUploadingAttachments: (files: File[]) => void;
    onUnauthorizedOrForbiddenUpload: () => void;
}

const FileUploader = ({
    name,
    buttonLabel,
    value = [],
    uploadFile,
    onFileInputClick,
    onApiError,
    onErrorUploadingAttachments,
    onUnauthorizedOrForbiddenUpload,
}: FormikFileUploader<string>) => {
    function findAttachmentsToProcess(attachments: Attachment[]): Attachment[] {
        return attachments.filter(attachmentShouldBeProcessed);
    }

    function findAttachmentsToUpload(attachments: Attachment[]): Attachment[] {
        return attachments.filter(attachmentShouldBeUploaded);
    }

    function updateAttachmentListElement(
        attachments: Attachment[],
        attachment: Attachment,
        replaceFn: FieldArrayReplaceFn
    ) {
        replaceFn(attachments.indexOf(attachment), attachment);
    }

    function setAttachmentPendingToFalse(attachment: Attachment) {
        attachment.pending = false;
        return attachment;
    }

    function addPendingAttachmentToFieldArray(file: File, pushFn: FieldArrayPushFn) {
        const attachment = getPendingAttachmentFromFile(file);
        pushFn(attachment);
        return attachment;
    }
    function updateFailedAttachments(
        allAttachments: Attachment[],
        failedAttachments: Attachment[],
        replaceFn: FieldArrayReplaceFn
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

    async function uploadAttachment(attachment: Attachment) {
        const { file } = attachment;
        if (isFileObject(file)) {
            try {
                const response = await uploadFile(file);
                attachment = setAttachmentPendingToFalse(attachment);
                attachment.url = response.headers.location;
                attachment.uploaded = true;
            } catch (error: any) {
                if (isForbidden(error) || isUnauthorized(error)) {
                    onUnauthorizedOrForbiddenUpload();
                } else {
                    onApiError(error);
                }
                setAttachmentPendingToFalse(attachment);
            }
        }
    }

    async function uploadAttachments(allAttachments: Attachment[], replaceFn: FieldArrayReplaceFn) {
        const attachmentsToProcess = findAttachmentsToProcess(allAttachments);
        const attachmentsToUpload = findAttachmentsToUpload(attachmentsToProcess);
        const attachmentsNotToUpload = attachmentsToProcess.filter((el) => !attachmentsToUpload.includes(el));

        for (const attachment of attachmentsToUpload) {
            await uploadAttachment(attachment);
            updateAttachmentListElement(allAttachments, attachment, replaceFn);
        }

        const failedAttachments = [...attachmentsNotToUpload, ...attachmentsToUpload.filter(attachmentUploadHasFailed)];
        updateFailedAttachments(allAttachments, failedAttachments, replaceFn);
    }

    return (
        <FormikFileInput
            name={name}
            buttonLabel={buttonLabel}
            legend="Dokumenter"
            accept={VALID_EXTENSIONS.join(', ')}
            onFilesSelect={async (files: File[], { push, replace }: ArrayHelpers) => {
                const selectedFiles: Attachment[] = files.map((file) => addPendingAttachmentToFieldArray(file, push));
                await uploadAttachments([...value, ...selectedFiles], replace);
            }}
            onClick={onFileInputClick}
        />
    );
};

export default FileUploader;
