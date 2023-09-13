import React from 'react';
import { FileRejection } from 'react-dropzone';
import { Attachment, PersistedFile } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import {
    attachmentShouldBeProcessed,
    attachmentShouldBeUploaded,
    attachmentUploadHasFailed,
    getAttachmentFromFile,
    getPendingAttachmentFromFile,
    isFileObject,
    mapFileToPersistedFile,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { FileDropAcceptImagesAndPdf } from '@navikt/sif-common-formik-ds';
import { TypedFormInputValidationProps } from '@navikt/sif-common-formik-ds/lib';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { ArrayHelpers, useFormikContext } from 'formik';
import api from '../../api/api';
import SoknadFormComponents from '../../soknad/SoknadFormComponents';
import { ApiEndpoint } from '../../types/ApiEndpoint';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { getAttachmentURLFrontend } from '../../utils/attachmentUtilsAuthToken';

export type FieldArrayReplaceFn = (index: number, value: any) => void;
export type FieldArrayPushFn = (obj: any) => void;
export type FieldArrayRemoveFn = (index: number) => undefined;

interface FormikFileUploader extends TypedFormInputValidationProps<SoknadFormField, ValidationError> {
    name: SoknadFormField;
    buttonLabel: string;
    onFilesUploaded?: (antall: number, antallFeilet: number) => void;
    onFileInputClick?: () => void;
    onErrorUploadingAttachments: (files: File[]) => void;
    onUnauthorizedOrForbiddenUpload: () => void;
}

type Props = FormikFileUploader;

const FormikFileUploader: React.FunctionComponent<Props> = ({
    name,
    onFilesUploaded,
    onFileInputClick,
    onErrorUploadingAttachments,
    onUnauthorizedOrForbiddenUpload,
    ...otherProps
}) => {
    const { values } = useFormikContext<SoknadFormData>();
    async function uploadAttachment(attachment: Attachment) {
        const { file } = attachment;
        if (isFileObject(file)) {
            try {
                const response = await api.uploadFile(ApiEndpoint.VEDLEGG, file);
                attachment = setAttachmentPendingToFalse(attachment);
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
        replaceFn: FieldArrayReplaceFn,
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
        replaceFn: FieldArrayReplaceFn,
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
        replaceFn: FieldArrayReplaceFn,
    ) {
        replaceFn(attachments.indexOf(attachment), { ...attachment, file: mapFileToPersistedFile(attachment.file) });
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

    return (
        <SoknadFormComponents.FileDropInput
            name={name}
            legend="Dokumenter"
            accept={FileDropAcceptImagesAndPdf}
            onFilesSelect={async (files: File[], rejectedFiles: FileRejection[], { push, replace }: ArrayHelpers) => {
                const attachments = files.map((file) => addPendingAttachmentToFieldArray(file, push));
                await uploadAttachments([...(values as any)[name], ...attachments], rejectedFiles, replace);
            }}
            onClick={onFileInputClick}
            {...otherProps}
        />
    );
};

export default FormikFileUploader;
