import { Attachment, PersistedFile } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import {
    attachmentShouldBeProcessed,
    attachmentShouldBeUploaded,
    attachmentUploadHasFailed,
    getPendingAttachmentFromFile,
    isFileObject,
    VALID_EXTENSIONS,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { FormikFileInput, TypedFormInputValidationProps } from '@navikt/sif-common-formik-ds';
import { ArrayHelpers, connect, useFormikContext } from 'formik';
import { uploadFile } from '../../api/api';
import { SøknadFormField, SøknadFormValues } from '../../types/SøknadFormValues';
import apiUtils from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import appSentryLogger from '../../utils/appSentryLogger';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { getAttachmentURLFrontend } from '../../utils/attachmentUtilsAuthToken';

export type FieldArrayReplaceFn = (index: number, value: any) => void;
export type FieldArrayPushFn = (obj: any) => void;
export type FieldArrayRemoveFn = (index: number) => undefined;

interface FormikFileUploader extends TypedFormInputValidationProps<SøknadFormField, ValidationError> {
    name: SøknadFormField;
    label: string;
    legend: string;
    onFileUploadComplete?: () => void;
    onFileInputClick?: () => void;
    onErrorUploadingAttachments: (files: File[]) => void;
    onUnauthorizedOrForbiddenUpload: () => void;
}

type Props = FormikFileUploader;

const FormikFileUploader = ({
    name,
    label,
    legend,
    onFileInputClick,
    onFileUploadComplete,
    onErrorUploadingAttachments,
    onUnauthorizedOrForbiddenUpload,
    ...otherProps
}: Props) => {
    const { values } = useFormikContext<SøknadFormValues>();

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

    function findAttachmentsToProcess(attachments: Attachment[]): Attachment[] {
        return attachments.filter(attachmentShouldBeProcessed);
    }

    function findAttachmentsToUpload(attachments: Attachment[]): Attachment[] {
        return attachments.filter(attachmentShouldBeUploaded);
    }

    function addPendingAttachmentToFieldArray(file: File, pushFn: FieldArrayPushFn) {
        const attachment = getPendingAttachmentFromFile(file);
        pushFn(attachment);
        return attachment;
    }

    async function uploadAttachment(attachment: Attachment) {
        const { file } = attachment;
        if (isFileObject(file)) {
            try {
                const response = await uploadFile(file);
                attachment = setAttachmentPendingToFalse(attachment);
                attachment.url = getAttachmentURLFrontend(response.headers.location);
                attachment.uploaded = true;
            } catch (error: any) {
                if (apiUtils.isUnauthorized(error)) {
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
        if (onFileUploadComplete) {
            onFileUploadComplete();
        }
    }
    return (
        <FormikFileInput<SøknadFormField, ValidationError>
            name={name}
            legend={legend}
            hideLabel={true}
            buttonLabel={label}
            accept={VALID_EXTENSIONS.join(', ')}
            onFilesSelect={async (files: File[], { push, replace }: ArrayHelpers) => {
                const attachments = files.map((file) => addPendingAttachmentToFieldArray(file, push));
                await uploadAttachments([...(values as any)[name], ...attachments], replace);
                if (onFileUploadComplete) {
                    onFileUploadComplete();
                }
            }}
            onClick={onFileInputClick}
            {...otherProps}
        />
    );
};

export default connect<FormikFileUploader, SøknadFormField>(FormikFileUploader);
