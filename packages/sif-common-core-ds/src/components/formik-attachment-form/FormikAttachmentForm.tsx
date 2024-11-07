import { Box, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { deleteVedlegg } from '@navikt/sif-common-api';
import { TypedFormInputValidationProps, ValidationError } from '@navikt/sif-common-formik-ds';
import { useFormikContext } from 'formik';
import { Attachment } from '../../types';
import { getUploadedOrPendingAttachments, hasExceededMaxTotalSizeOfAttachments } from '../../utils/attachmentUtils';
import FormikAttachmentList from '../formik-attachment-list/FormikAttachmentList';
import FormikFileUploader from '../formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '../picture-scanning-guide/PictureScanningGuide';
import AttachmentTotalSizeAlert from './parts/AttachmentTotalSizeAlert';
import AttachmentUploadErrors from './parts/AttachmentUploadErrors';
import { CoreText } from '../../i18n/common.messages';

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
    showListHeading?: boolean;
    listHeadingLevel?: '1' | '2' | '3' | '4' | '5' | '6';
    onUnauthorizedOrForbiddenUpload: () => void;
}

const FormikAttachmentForm = ({
    fieldName,
    attachments,
    otherAttachments = [],
    labels,
    uploadLaterURL,
    legend = 'Dokumenter',
    listHeadingLevel = '3',
    showListHeading = true,
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
            <Box>
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
                <div role="alert" aria-live="polite" style={{ display: 'inline' }}>
                    {!canUploadMore && (
                        <Box marginBlock="4 0">
                            <AttachmentTotalSizeAlert uploadLaterURL={uploadLaterURL} />
                        </Box>
                    )}
                    {filesThatDidntGetUploaded.length > 0 ? (
                        <Box marginBlock="4 0">
                            <AttachmentUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
                        </Box>
                    ) : null}
                </div>
            </Box>

            <Box marginBlock="4">
                {showListHeading && (
                    <Heading level={listHeadingLevel} size="xsmall" aria-live="polite">
                        <CoreText
                            id="@core.formikAttachmentsList.listHeading"
                            values={{ antallDokumenter: uploadedOrPendingAttachments.length }}
                        />
                    </Heading>
                )}
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
            </Box>
        </VStack>
    );
};

export default FormikAttachmentForm;
