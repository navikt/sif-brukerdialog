import { Box, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { validateAll } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { AxiosResponse } from 'axios';
import { Attachment } from '../../types';
import { hasExceededMaxTotalSizeOfAttachments } from '../../utils/attachmentUtils';
import FormikFileUploader from '../formik-file-uploader/FormikFileUploader';
import AttachmentUploadErrors from './parts/AttachmentUploadErrors';
import { validateAttachments, ValidateAttachmentsErrors } from './validateAttachmentsUtils';
import FormikUploadedAttachments from './parts/FormikUploadedAttachments';
import AttachmentTotalSizeAlert from './parts/AttachmentTotalSizeAlert';
import PictureScanningGuide from '../picture-scanning-guide/PictureScanningGuide';

interface Props {
    fieldName: string;
    includeGuide?: boolean;
    attachments?: Attachment[];
    otherAttachments?: Attachment[];
    labels: {
        addLabel: string;
        noAttachmentsText?: string;
    };
    uploadLaterURL: string;
    fixAttachmentURL: (a: Attachment) => Attachment;
    getAttachmentURLFrontend: (url: string) => string;
    uploadFile: (file: File) => Promise<AxiosResponse<any, any>>;
    deleteFile: (url: string) => Promise<AxiosResponse<any, any>>;
    onUnauthorizedOrForbiddenUpload: () => void;
}

const FormikAttachmentForm = ({
    fieldName,
    includeGuide,
    attachments = [],
    otherAttachments = [],
    labels,
    uploadLaterURL,
    uploadFile,
    deleteFile,
    fixAttachmentURL,
    getAttachmentURLFrontend,
    onUnauthorizedOrForbiddenUpload,
}: Props) => {
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = useState<File[]>([]);

    const canUploadMore = !hasExceededMaxTotalSizeOfAttachments([...attachments, ...otherAttachments]);
    return (
        <VStack gap="2">
            <Box marginBlock="0 4">{includeGuide && <PictureScanningGuide />}</Box>
            {canUploadMore ? (
                <FormikFileUploader
                    attachments={attachments}
                    name={fieldName}
                    buttonLabel={labels.addLabel}
                    uploadFile={uploadFile}
                    getAttachmentURLFrontend={getAttachmentURLFrontend}
                    onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                    onFileInputClick={() => {
                        setFilesThatDidntGetUploaded([]);
                    }}
                    validate={(a: Attachment[] = []) => {
                        return validateAll<ValidateAttachmentsErrors | ValidationError>([
                            () => validateAttachments([...a, ...otherAttachments]),
                        ]);
                    }}
                    onUnauthorizedOrForbiddenUpload={onUnauthorizedOrForbiddenUpload}
                />
            ) : (
                <AttachmentTotalSizeAlert uploadLaterURL={uploadLaterURL} />
            )}

            <AttachmentUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />

            <FormikUploadedAttachments
                showFileSize={true}
                fixAttachmentURL={fixAttachmentURL}
                deleteFile={deleteFile}
                attachments={attachments}
                fieldName={fieldName}
                noAttachmentsText={labels.noAttachmentsText}
                includeDeletionFunctionality={true}
            />
        </VStack>
    );
};

export default FormikAttachmentForm;
