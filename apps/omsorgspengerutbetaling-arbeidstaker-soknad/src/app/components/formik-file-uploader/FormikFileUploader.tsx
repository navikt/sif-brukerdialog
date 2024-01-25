import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { VALID_EXTENSIONS } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { FormikFileInput, TypedFormInputValidationProps, ValidationError } from '@navikt/sif-common-formik-ds/src';
import { ApiEndpoint } from '../../api/api';
import { useFormikFileUploader } from './useFormikFileUploader';

interface Props extends TypedFormInputValidationProps<any, ValidationError> {
    attachments: Attachment[];
    name: string;
    legend?: string;
    buttonLabel: string;
    apiEndpoint: ApiEndpoint;

    onFileInputClick?: () => void;
    onErrorUploadingAttachments: (files: File[]) => void;
    onUnauthorizedOrForbiddenUpload: () => void;
}

function FormikFileUploader({
    attachments,
    name,
    legend,
    apiEndpoint,
    onFileInputClick,
    onErrorUploadingAttachments,
    onUnauthorizedOrForbiddenUpload,

    ...otherProps
}: Props) {
    const { onFilesSelect } = useFormikFileUploader({
        apiEndpoint,
        onUnauthorizedOrForbiddenUpload,
        onErrorUploadingAttachments,
        value: attachments,
    });

    return (
        <FormikFileInput
            name={name}
            legend={legend || 'Dokumenter'}
            accept={VALID_EXTENSIONS.join(', ')}
            onFilesSelect={onFilesSelect}
            onClick={onFileInputClick}
            {...otherProps}
        />
    );
}

export default FormikFileUploader;
