import { FileAccepted, FileObject, FileRejected } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { deleteVedlegg, getVedleggFrontendUrl, uploadVedlegg } from '@navikt/sif-common-api';
import { PersistedFile } from '../../types';
import { mapFileToPersistedFile } from '../../utils/attachmentUtils';
import { getVedleggIdFromResponseHeader } from './vedleggUtils';
import { isAxiosError } from 'axios';

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
            const id = getVedleggIdFromResponseHeader(response.headers.location);
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
            return Promise.resolve();
        } catch (e) {
            const reason = isAxiosError(e) ? e.message : 'uploadError';
            setFiles((prevFiles) => [
                ...prevFiles.map((prevFile) => {
                    if (prevFile.file === file.file) {
                        return { ...prevFile, error: true, reasons: [reason], pending: false };
                    }
                    return prevFile;
                }),
            ]);
            return Promise.reject();
        }
    };

    const onSelect = async (newFiles: FileObject[]) => {
        const filesWithErrors = newFiles
            .filter((file) => file.error)
            .map((file) => ({ ...file, pending: false, uploaded: false }));
        const filesToUpload = newFiles
            .filter((file) => !file.error)
            .map((file) => ({ ...file, pending: true, uploaded: false }));

        setFiles((prevFiles) => [...prevFiles, ...filesToUpload, ...filesWithErrors]);

        Promise.allSettled(filesToUpload.map((file) => uploadFile(file))).finally(() => {
            if (onFilesChanged) {
                onFilesChanged(files);
            }
        });
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
