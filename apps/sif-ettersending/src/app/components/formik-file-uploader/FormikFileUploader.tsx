import * as React from 'react';
import { Attachment, PersistedFile } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import {
    attachmentShouldBeProcessed,
    attachmentShouldBeUploaded,
    attachmentUploadHasFailed,
    getPendingAttachmentFromFile,
    isFileObject,
    VALID_EXTENSIONS,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { TypedFormInputValidationProps } from '@navikt/sif-common-formik-ds/lib';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { ArrayHelpers } from 'formik';
import api from '../../api/api';
import SoknadFormComponents from '../../soknad/SoknadFormComponents';
import { SoknadFormField } from '../../types/SoknadFormData';
import appSentryLogger from '../../utils/appSentryLogger';
import { getAttachmentURLFrontend } from '../../utils/attachmentUtilsAuthToken';
import { ApiEndpoint } from '../../types/ApiEndpoint';

export type FieldArrayReplaceFn = (index: number, value: any) => void;
export type FieldArrayPushFn = (obj: any) => void;
export type FieldArrayRemoveFn = (index: number) => undefined;

interface FormikFileUploader extends TypedFormInputValidationProps<SoknadFormField, ValidationError> {
    name: SoknadFormField;
    buttonLabel: string;
    onFileInputClick?: () => void;
    onErrorUploadingAttachments: (files: File[]) => void;
    onUnauthorizedOrForbiddenUpload: () => void;
    listOfAttachments: Attachment[];
}

type Props = FormikFileUploader;

const FormikFileUploader = ({
    name,
    onFileInputClick,
    onErrorUploadingAttachments,
    onUnauthorizedOrForbiddenUpload,
    listOfAttachments,
    ...otherProps
}: Props) => {
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
                const response = await api.uploadFile(ApiEndpoint.VEDLEGG, file);
                attachment = setAttachmentPendingToFalse(attachment);
                attachment.url = getAttachmentURLFrontend(response.headers.location);

                attachment.uploaded = true;
            } catch (error) {
                if (isForbidden(error) || isUnauthorized(error)) {
                    onUnauthorizedOrForbiddenUpload();
                } else {
                    appSentryLogger.logApiError(error);
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
        <SoknadFormComponents.FileInput
            name={name}
            legend="Dokumenter"
            accept={VALID_EXTENSIONS.join(', ')}
            onFilesSelect={async (files: File[], { push, replace }: ArrayHelpers) => {
                const attachments: Attachment[] = files.map((file) => addPendingAttachmentToFieldArray(file, push));
                await uploadAttachments([...listOfAttachments, ...attachments], replace);
            }}
            onClick={onFileInputClick}
            {...otherProps}
        />
    );
};

export default FormikFileUploader;
