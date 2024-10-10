import {
    FileDropAcceptImagesAndPdf,
    FormikFileDropInput,
    TypedFormInputValidationProps,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { useFormikFileUploader } from '../../hooks/useFormikFileUploader';
import { Attachment } from '../../types/Attachment';

interface Props extends TypedFormInputValidationProps<any, ValidationError> {
    attachments: Attachment[];
    name: string;
    legend?: string;
    buttonLabel: string;
    onFilesUploaded?: (antall: number, antallFeilet: number) => void;
    onFileInputClick?: () => void;
    onErrorUploadingAttachments: (files: File[]) => void;
    onUnauthorizedOrForbiddenUpload: () => void;
}

function FormikFileUploader({
    attachments,
    name,
    legend,
    onFileInputClick,
    onFilesUploaded,
    onErrorUploadingAttachments,
    onUnauthorizedOrForbiddenUpload,
    ...otherProps
}: Props) {
    const { onFilesSelect } = useFormikFileUploader({
        value: attachments,
        onUnauthorizedOrForbiddenUpload,
        onErrorUploadingAttachments,
        onFilesUploaded,
    });

    return (
        <FormikFileDropInput
            name={name}
            legend={legend || 'Dokumenter'}
            accept={FileDropAcceptImagesAndPdf}
            onFilesSelect={onFilesSelect}
            onClick={onFileInputClick}
            {...otherProps}
        />
    );
}

export default FormikFileUploader;
