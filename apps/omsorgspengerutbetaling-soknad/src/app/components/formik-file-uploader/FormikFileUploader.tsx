import { useFormikFileUploader } from '@navikt/sif-common-core-ds/lib/hooks/useFormikFileUploader';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { VALID_EXTENSIONS } from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { FormikFileInput, TypedFormInputValidationProps, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { ApiEndpoint } from '../../api/api';

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
