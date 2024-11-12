import { FileAccepted, FileObject, FileRejected } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { deleteVedlegg, getVedleggFrontendUrl, uploadVedlegg } from '@navikt/sif-common-api';
import { getAttachmentId, mapFileToPersistedFile } from '../../utils/attachmentUtils';
import { PersistedFile } from '../../types';

export type Vedlegg = (Omit<FileRejected, 'file'> | Omit<FileAccepted, 'file'>) & {
    file: File | PersistedFile;
    pending: boolean;
    uploaded: boolean;
    info?: {
        id: string;
        url: string;
    };
};

interface Props {
    addedFiles: Vedlegg[];
    onFilesChanged?: (files: Vedlegg[]) => void;
}

export const useFileUploader = ({ addedFiles = [], onFilesChanged }: Props) => {
    const [files, setFiles] = useState<Vedlegg[]>(addedFiles);

    useEffect(() => {
        if (onFilesChanged) {
            onFilesChanged(files);
        }
    }, [files, onFilesChanged]);

    const uploadFile = async (file: FileObject) => {
        try {
            const response = await uploadVedlegg(file.file);
            const id = getAttachmentId(response.headers.location);
            const vedlegg: Vedlegg = {
                ...file,
                file: mapFileToPersistedFile(file.file),
                pending: false,
                uploaded: true,
                info: {
                    id,
                    url: getVedleggFrontendUrl(id),
                },
            };
            setFiles((prevFiles) => [
                ...prevFiles.map((prevFile) => (prevFile.file === file.file ? vedlegg : prevFile)),
            ]);
        } catch {
            setFiles((prevFiles) => [
                ...prevFiles.map((prevFile) =>
                    prevFile.file === file.file
                        ? { ...prevFile, error: true, reasons: ['uploadError'], pending: false }
                        : prevFile,
                ),
            ]);
        }
        if (onFilesChanged) {
            onFilesChanged(files);
        }
    };

    const onSelect = (newFiles: FileObject[]) => {
        const filesWithErrors = newFiles
            .filter((file) => file.error)
            .map((file) => ({ ...file, pending: false, uploaded: false }));
        const filesToUpload = newFiles
            .filter((file) => !file.error)
            .map((file) => ({ ...file, pending: true, uploaded: false }));

        setFiles((prevFiles) => [...prevFiles, ...filesToUpload, ...filesWithErrors]);
        filesToUpload.forEach((file) => {
            uploadFile(file);
        });
        if (onFilesChanged) {
            onFilesChanged(files);
        }
    };

    const removeFile = async (fileToRemove: Vedlegg) => {
        if (fileToRemove.info) {
            await deleteVedlegg(fileToRemove.info.id);
        }
        setFiles((prevAcceptedFiles) => prevAcceptedFiles.filter((file) => file !== fileToRemove));
    };

    return {
        onSelect,
        removeFile,
        acceptedFiles: files.filter((file) => !file.error),
        rejectedFiles: files.filter((file) => file.error),
    };
};
