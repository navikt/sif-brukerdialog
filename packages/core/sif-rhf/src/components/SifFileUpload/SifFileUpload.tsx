import { FileObject, FilesPartitioned, FileUpload, FileUploadDropzoneProps } from '@navikt/ds-react';
import { useEffect, useMemo } from 'react';
import { FieldValues, Path, useController, useFormContext } from 'react-hook-form';

import { UploadedFile } from './types';

type Props<T extends FieldValues> = Omit<FileUploadDropzoneProps, 'onSelect' | 'error'> & {
    name: Path<T>;
    validate?: (value: UploadedFile[]) => string | undefined;
    acceptedFiles: UploadedFile[];
    onSelect: (files: FileObject[], partitionedFiles: FilesPartitioned) => void;
};

export function SifFileUpload<T extends FieldValues>({
    name,
    validate,
    acceptedFiles,
    onSelect,
    fileLimit,
    ...rest
}: Props<T>) {
    const { control } = useFormContext<T>();
    const {
        field: { onChange },
        fieldState,
    } = useController({
        name,
        control,
        rules: { validate: validate ? (v) => validate(v) ?? true : undefined },
    });
    const syncedFiles = useMemo(() => acceptedFiles.filter((f) => f.uploaded || f.pending), [acceptedFiles]);

    useEffect(() => {
        onChange(syncedFiles);
    }, [onChange, syncedFiles]);

    return (
        <FileUpload.Dropzone
            {...rest}
            id={fieldState.error ? name : undefined}
            onSelect={onSelect}
            fileLimit={{ max: fileLimit?.max ?? 100, current: acceptedFiles.length }}
            error={fieldState.error?.message}
        />
    );
}
