import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import {
    FileDropAcceptImagesAndPdf,
    TypedFormInputValidationProps,
    ValidationError,
} from '@navikt/sif-common-formik-ds/lib';
import FormikFileDropInput from '@navikt/sif-common-formik-ds/lib/components/formik-file-drop-input/FormikFileDropInput';
import api, { ApiEndpoint } from '../../api/api';
import { getAttachmentURLFrontend } from '../../utils/attachmentUtilsAuthToken';
import { useFormikFileUploader } from './useFormikFileUploader';

interface Props extends TypedFormInputValidationProps<any, ValidationError> {
    attachments: Attachment[];
    name: string;
    legend?: string;
    buttonLabel: string;
    apiEndpoint: ApiEndpoint;
    onFilesUploaded?: (antall: number, antallFeilet: number) => void;
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
    onFilesUploaded,
    onErrorUploadingAttachments,
    onUnauthorizedOrForbiddenUpload,

    ...otherProps
}: Props) {
    const { onFilesSelect } = useFormikFileUploader({
        value: attachments,
        getAttachmentURLFrontend,
        uploadFile: (file: File) => api.uploadFile(apiEndpoint, file),
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
