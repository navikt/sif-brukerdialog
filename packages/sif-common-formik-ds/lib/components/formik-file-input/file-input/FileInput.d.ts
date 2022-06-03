import React from 'react';
import { FormError } from '../../../types';
import './fileInput.scss';
interface FileInputProps {
    id: string;
    legend: string;
    description?: React.ReactNode;
    buttonLabel: string;
    name: string;
    onFilesSelect: (files: File[]) => void;
    multiple?: boolean;
    accept: string;
    error?: FormError;
    onClick?: () => void;
}
export default class FileInput extends React.Component<FileInputProps> {
    constructor(props: FileInputProps);
    fileSelectHandler(fileList: FileList): void;
    onFileDragOverHandler(e: React.DragEvent<HTMLLabelElement>): void;
    onFileDropHandler(e: React.DragEvent<HTMLLabelElement>): void;
    onFileSelect(e: React.ChangeEvent<HTMLInputElement>): void;
    onKeyPress(e: React.KeyboardEvent<HTMLLabelElement>): void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=FileInput.d.ts.map