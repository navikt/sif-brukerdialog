import { Box, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { deleteVedlegg } from '@navikt/sif-common';
import { Attachment } from '../../types';
import { hasExceededMaxTotalSizeOfAttachments } from '../../utils/attachmentUtils';
import FormikAttachmentList from '../formik-attachment-list/FormikAttachmentList';
import FormikFileUploader from '../formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '../picture-scanning-guide/PictureScanningGuide';
import getAttachmentsValidator, { AttachmentsValidator } from './getAttachmentsValidator';
import AttachmentTotalSizeAlert from './parts/AttachmentTotalSizeAlert';
import AttachmentUploadErrors from './parts/AttachmentUploadErrors';

interface Props {
    legend?: string;
    fieldName: string;
    includeGuide?: boolean;
    attachments?: Attachment[];
    otherAttachments?: Attachment[];
    labels: {
        addLabel: string;
        noAttachmentsText?: string;
    };
    validation?: AttachmentsValidatorProp;
    uploadLaterURL?: string;
    onUnauthorizedOrForbiddenUpload: () => void;
    onFilesUploaded?: (antall: number, antallFeilet: number) => void;
}

type AttachmentsValidatorProp = {
    validator?: AttachmentsValidator;
    options?: {
        required?: boolean;
    };
};

const getValidateProp = (validation: AttachmentsValidatorProp): AttachmentsValidator | undefined => {
    if (validation.validator) {
        return validation.validator;
    }
    if (validation.options) {
        return getAttachmentsValidator({ required: validation.options.required });
    }
    return undefined;
};

const FormikAttachmentForm = ({
    fieldName,
    includeGuide,
    attachments = [],
    otherAttachments = [],
    labels,
    uploadLaterURL,
    validation,
    legend = 'Dokumenter',
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
                    validate={validation ? getValidateProp(validation) : undefined}
                />
            ) : (
                <AttachmentTotalSizeAlert uploadLaterURL={uploadLaterURL} />
            )}
            <AttachmentUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            {/* <FormikInputGroup
                name={`${fieldName}_group`}
                hideLegend={true}
                legend={legend}
                validate={validation ? getValidateProp(validation) : undefined}> */}
            <FormikAttachmentList
                fieldName={fieldName}
                attachments={attachments}
                showFileSize={true}
                variant="border"
                onDelete={(a: Attachment) => (a.info ? deleteVedlegg(a.info.id) : Promise.resolve())}
                emptyListText={labels.noAttachmentsText}
            />
            {/* </FormikInputGroup> */}
        </VStack>
    );
};

export default FormikAttachmentForm;
