import { Box, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { deleteVedlegg } from '@navikt/sif-common';
import { TypedFormInputValidationProps, ValidationError } from '@navikt/sif-common-formik-ds';
import { Attachment } from '../../types';
import { hasExceededMaxTotalSizeOfAttachments } from '../../utils/attachmentUtils';
import FormikAttachmentList from '../formik-attachment-list/FormikAttachmentList';
import FormikFileUploader from '../formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '../picture-scanning-guide/PictureScanningGuide';
import AttachmentTotalSizeAlert from './parts/AttachmentTotalSizeAlert';
import AttachmentUploadErrors from './parts/AttachmentUploadErrors';

interface Props extends TypedFormInputValidationProps<string, ValidationError> {
    legend?: string;
    fieldName: string;
    attachments: Attachment[];
    includeGuide?: boolean;
    otherAttachments?: Attachment[];
    labels: {
        addLabel: string;
        noAttachmentsText?: string;
    };
    uploadLaterURL?: string;
    onUnauthorizedOrForbiddenUpload: () => void;
    onFilesUploaded?: (antall: number, antallFeilet: number) => void;
}

const FormikAttachmentForm = ({
    fieldName,
    attachments,
    otherAttachments = [],
    labels,
    uploadLaterURL,
    legend = 'Dokumenter',
    validate,
    includeGuide = true,
    onUnauthorizedOrForbiddenUpload,
    onFilesUploaded,
}: Props) => {
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = useState<File[]>([]);
    const canUploadMore = !hasExceededMaxTotalSizeOfAttachments([...attachments, ...otherAttachments]);

    return (
        <VStack gap="4">
            <Box marginBlock="0 4">{includeGuide && <PictureScanningGuide />}</Box>
            <FormikFileUploader
                legend={legend}
                attachments={attachments}
                name={fieldName}
                buttonLabel={labels.addLabel}
                onErrorUploadingAttachments={(att) => {
                    setFilesThatDidntGetUploaded(att);
                }}
                onFileInputClick={() => {
                    setFilesThatDidntGetUploaded([]);
                }}
                onFilesUploaded={onFilesUploaded}
                onUnauthorizedOrForbiddenUpload={onUnauthorizedOrForbiddenUpload}
                validate={validate}
            />

            {!canUploadMore && <AttachmentTotalSizeAlert uploadLaterURL={uploadLaterURL} />}

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
