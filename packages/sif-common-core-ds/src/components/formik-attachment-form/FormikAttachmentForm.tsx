import { Box, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { deleteVedlegg } from '@navikt/sif-common';
import { TypedFormInputValidationProps, ValidationError } from '@navikt/sif-common-formik-ds';
import { useFormikContext } from 'formik';
import { Attachment } from '../../types';
import { getUploadedOrPendingAttachments, hasExceededMaxTotalSizeOfAttachments } from '../../utils/attachmentUtils';
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
}: Props) => {
    const { setFieldValue } = useFormikContext();

    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = useState<File[]>([]);
    const allIds = attachments.map((a) => a.info?.id);
    const others = otherAttachments.filter((oa) => !allIds.includes(oa.info?.id));
    const canUploadMore = !hasExceededMaxTotalSizeOfAttachments([...attachments, ...others]);
    const uploadedOrPendingAttachments = getUploadedOrPendingAttachments(attachments);

    return (
        <VStack gap="4">
            <Box marginBlock="0 4">{includeGuide && <PictureScanningGuide />}</Box>
            <FormikFileUploader
                name={fieldName}
                legend={legend}
                attachments={uploadedOrPendingAttachments}
                buttonLabel={labels.addLabel}
                onErrorUploadingFiles={(failedFiles) => {
                    setFilesThatDidntGetUploaded(failedFiles);
                    const validAttachments = attachments.filter((a) => {
                        return !failedFiles.includes(a.file as File);
                    });
                    setFieldValue(fieldName, validAttachments);
                }}
                onFilesSelected={() => {
                    setFilesThatDidntGetUploaded([]);
                }}
                onUnauthorizedOrForbiddenUpload={onUnauthorizedOrForbiddenUpload}
                validate={validate}
            />

            {!canUploadMore && <AttachmentTotalSizeAlert uploadLaterURL={uploadLaterURL} />}

            <AttachmentUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />

            <FormikAttachmentList
                fieldName={fieldName}
                attachments={uploadedOrPendingAttachments}
                showFileSize={true}
                variant="border"
                onDelete={(a: Attachment) => {
                    setFilesThatDidntGetUploaded([]);
                    return a.info ? deleteVedlegg(a.info.id) : Promise.resolve();
                }}
                emptyListText={labels.noAttachmentsText}
            />
        </VStack>
    );
};

export default FormikAttachmentForm;
