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
    legend: string;
    buttonLabel: string;
    onFilesSelected?: () => void;
    onErrorUploadingFiles: (files: File[]) => void;
    onUnauthorizedOrForbiddenUpload: () => void;
}

function FormikFileUploader({
    attachments,
    name,
    legend,
    onFilesSelected,
    onErrorUploadingFiles,
    onUnauthorizedOrForbiddenUpload,

    ...otherProps
}: Props) {
    const { onFilesSelect } = useFormikFileUploader({
        value: attachments,
        onUnauthorizedOrForbiddenUpload,
        onErrorUploadingFiles,
    });

    return (
        <FormikFileDropInput
            name={name}
            legend={legend}
            accept={FileDropAcceptImagesAndPdf}
            onFilesSelect={(...args) => {
                if (onFilesSelected) {
                    onFilesSelected();
                }
                onFilesSelect(...args);
            }}
            {...otherProps}
        />
    );
}

export default FormikFileUploader;
