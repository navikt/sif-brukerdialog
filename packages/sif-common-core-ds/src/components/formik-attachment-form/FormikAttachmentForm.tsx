import { Box, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { deleteVedlegg } from '@navikt/sif-common';
import { useFormikContext } from 'formik';
import { Attachment } from '../../types';
import { hasExceededMaxTotalSizeOfAttachments } from '../../utils/attachmentUtils';
import FormikAttachmentList from '../formik-attachment-list/FormikAttachmentList';
import FormikFileUploader from '../formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '../picture-scanning-guide/PictureScanningGuide';
import getAttachmentsValidator, { AttachmentsValidator, AttachmentsValidatorOptions } from './getAttachmentsValidator';
import AttachmentTotalSizeAlert from './parts/AttachmentTotalSizeAlert';
import AttachmentUploadErrors from './parts/AttachmentUploadErrors';

interface Props {
    legend?: string;
    fieldName: string;
    includeGuide?: boolean;
    otherAttachments?: Attachment[];
    labels: {
        addLabel: string;
        noAttachmentsText?: string;
    };
    validation?: AttachmentsValidationProp;
    uploadLaterURL?: string;
    onUnauthorizedOrForbiddenUpload: () => void;
    onFilesUploaded?: (antall: number, antallFeilet: number) => void;
}

type AttachmentsValidationProp = AttachmentsValidator | AttachmentsValidatorOptions;

// Type guard for AttachmentsValidatorOptions
function isAttachmentsValidatorOptions(obj: any): obj is AttachmentsValidatorOptions {
    return 'required' in obj || 'maxTotalSize' in obj;
}

// Type guard for AttachmentsValidator
function isAttachmentsValidator(obj: any): obj is AttachmentsValidator {
    return 'validate' in obj && typeof obj.validate === 'function';
}

const getValidatorToUse = (validation: AttachmentsValidationProp): AttachmentsValidator | undefined => {
    if (isAttachmentsValidatorOptions(validation)) {
        return getAttachmentsValidator(validation);
    }
    if (isAttachmentsValidator(validation)) {
        return validation;
    }
    return undefined;
};

const FormikAttachmentForm = ({
    fieldName,
    includeGuide = true,
    otherAttachments = [],
    labels,
    uploadLaterURL,
    validation,
    legend = 'Dokumenter',
    onUnauthorizedOrForbiddenUpload,
    onFilesUploaded,
}: Props) => {
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = useState<File[]>([]);
    const attachments = (useFormikContext<any>().values[fieldName] as Attachment[]) || [];
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
                validate={validation ? getValidatorToUse(validation) : undefined}
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
