/// <reference types="react" />
interface Props {
    filesThatDidntGetUploaded: File[];
}
declare const FileUploadErrors: ({ filesThatDidntGetUploaded }: Props) => JSX.Element | null;
export default FileUploadErrors;
