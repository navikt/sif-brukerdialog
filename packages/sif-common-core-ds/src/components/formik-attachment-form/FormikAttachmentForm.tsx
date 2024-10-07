import { Box, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { validateAll } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { Attachment } from '../../types';
import { hasExceededMaxTotalSizeOfAttachments } from '../../utils/attachmentUtils';
import FormikFileUploader from '../formik-file-uploader/FormikFileUploader';
import AttachmentUploadErrors from './parts/AttachmentUploadErrors';
import { validateAttachments, ValidateAttachmentsErrors } from './validateAttachmentsUtils';
import AttachmentTotalSizeAlert from './parts/AttachmentTotalSizeAlert';
import PictureScanningGuide from '../picture-scanning-guide/PictureScanningGuide';
import FormikAttachmentList from '../formik-attachment-list/FormikAttachmentList';
import { deleteVedlegg } from '@navikt/sif-common';

interface Props {
    fieldName: string;
    includeGuide?: boolean;
    attachments?: Attachment[];
    otherAttachments?: Attachment[];
    labels: {
        addLabel: string;
        noAttachmentsText?: string;
    };
    validation: {
        required: boolean;
    };
    uploadLaterURL?: string;
    onUnauthorizedOrForbiddenUpload: () => void;
    onFilesUploaded?: (antall: number, antallFeilet: number) => void;
}

const FormikAttachmentForm = ({
    fieldName,
    includeGuide,
    attachments = [],
    otherAttachments = [],
    labels,
    uploadLaterURL,
    validation: { required },
    onUnauthorizedOrForbiddenUpload,
    onFilesUploaded,
}: Props) => {
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = useState<File[]>([]);
    const canUploadMore = !hasExceededMaxTotalSizeOfAttachments([...attachments, ...otherAttachments]);

    return (
        <VStack gap="4">
            <Box marginBlock="0 4">{includeGuide && <PictureScanningGuide />}</Box>
            {canUploadMore ? (
                <FormikFileUploader
                    attachments={attachments}
                    name={fieldName}
                    buttonLabel={labels.addLabel}
                    onErrorUploadingAttachments={(att) => {
                        setFilesThatDidntGetUploaded(att);
                    }}
                    onFileInputClick={() => {
                        setFilesThatDidntGetUploaded([]);
                    }}
                    validate={(a: Attachment[] = []) => {
                        return validateAll<ValidateAttachmentsErrors | ValidationError>([
                            () => validateAttachments([...a, ...otherAttachments], required),
                        ]);
                    }}
                    onFilesUploaded={onFilesUploaded}
                    onUnauthorizedOrForbiddenUpload={onUnauthorizedOrForbiddenUpload}
                />
            ) : (
                <AttachmentTotalSizeAlert uploadLaterURL={uploadLaterURL} />
            )}
            <AttachmentUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />

            <FormikAttachmentList
                fieldName={fieldName}
                attachments={attachments}
                showFileSize={true}
                variant="border"
                onDelete={(a: Attachment) => (a.info ? deleteVedlegg(a.info.id) : Promise.resolve())}
                emptyListText={labels.noAttachmentsText}
            />
        </VStack>
    );
};

export default FormikAttachmentForm;
