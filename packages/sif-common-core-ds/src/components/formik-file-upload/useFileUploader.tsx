import { FileObject } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { getVedleggFrontendUrl, uploadVedlegg } from '@navikt/sif-common-api';
import { Attachment } from '../../types';
import { getAttachmentId } from '../../utils/attachmentUtils';

export type Vedlegg = FileObject & Attachment;

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

    function removeFile(fileToRemove: FileObject) {
        setFiles((prevAcceptedFiles) => prevAcceptedFiles.filter((file) => file !== fileToRemove));
    }

    return {
        onSelect,
        removeFile,
        uploadedFiles: files.filter((file) => !file.error && !file.pending),
        pendingFiles: files.filter((file) => file.pending),
        rejectedFiles: files.filter((file) => file.error),
    };
};
