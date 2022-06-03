/// <reference types="react" />
import { TypedFormInputValidationProps } from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { AxiosError, AxiosResponse } from 'axios';
import { Attachment } from '../../types/Attachment';
export declare type FieldArrayReplaceFn = (index: number, value: any) => void;
export declare type FieldArrayPushFn = (obj: any) => void;
export declare type FieldArrayRemoveFn = (index: number) => undefined;
interface FormikFileUploader<FieldName> extends TypedFormInputValidationProps<FieldName, ValidationError> {
    name: string;
    buttonLabel: string;
    value?: Attachment[];
    uploadFile: (file: File) => Promise<AxiosResponse<any, any>>;
    onFileInputClick?: () => void;
    onApiError: (error: AxiosError) => void;
    onErrorUploadingAttachments: (files: File[]) => void;
    onUnauthorizedOrForbiddenUpload: () => void;
}
declare const FileUploader: ({ name, buttonLabel, value, uploadFile, onFileInputClick, onApiError, onErrorUploadingAttachments, onUnauthorizedOrForbiddenUpload, }: FormikFileUploader<string>) => JSX.Element;
export default FileUploader;
