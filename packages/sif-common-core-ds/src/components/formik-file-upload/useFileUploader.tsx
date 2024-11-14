import { FileObject } from '@navikt/ds-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    deleteVedlegg,
    getVedleggFrontendUrl,
    getVedleggIdFromResponseHeaderLocation,
    uploadVedlegg,
} from '@navikt/sif-common-api';
import { Vedlegg } from '../../types/Vedlegg';
import { mapFileToPersistedFile } from '../../utils/attachmentUtils';
import { canRetryFileUpload, getFileUploadErrorReason } from './fileUploadUtils';

interface Props {
    initialFiles: Vedlegg[];
    onFilesChanged?: (files: Vedlegg[]) => void;
}

export const useFileUploader = ({ initialFiles = [], onFilesChanged }: Props) => {
    const [files, setFiles] = useState<Vedlegg[]>(initialFiles);

    useEffect(() => {
        if (onFilesChanged) {
            onFilesChanged(files);
        }
    }, [files, onFilesChanged]);

    const uploadFile = async (file: FileObject) => {
        try {
            const response = await uploadVedlegg(file.file);
            const id = getVedleggIdFromResponseHeaderLocation(response.headers.location);
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
            const reason = getFileUploadErrorReason(e);
            setFiles((prevFiles) => [
                ...prevFiles.map((prevFile) => {
                    if (prevFile.file === file.file) {
                        return {
                            ...prevFile,
                            error: true,
                            reasons: [reason],
                            canRetry: canRetryFileUpload(reason),
                            pending: false,
                        };
                    }
                    return prevFile;
                }),
            ]);
            return Promise.reject();
        }
    };

    const onSelect = useCallback(
        async (selectedFiles: FileObject[]) => {
            const filesWithError = selectedFiles
                .filter((file) => file.error)
                .map((file) => ({ ...file, pending: false, uploaded: false }));
            const filesToUpload = selectedFiles
                .filter((file) => !file.error)
                .map((file) => ({ ...file, pending: true, uploaded: false }));
            setFiles((prevFiles) => [...prevFiles, ...filesToUpload, ...filesWithError]);
            await filesToUpload.map((file) => uploadFile(file));
        },
        [files],
    );

    const onRemove = useCallback(
        async (fileToRemove: Vedlegg) => {
            if (fileToRemove.info) {
                await deleteVedlegg(fileToRemove.info.id);
            }
            setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
        },
        [files],
    );

    const onRetryUpload = useCallback(
        async (fileToRetry: Vedlegg) => {
            setFiles(
                files.map((file) =>
                    file.file === fileToRetry.file
                        ? { ...file, pending: true, uploaded: false, error: false, reasons: [], canRetry: false }
                        : file,
                ),
            );
            await uploadFile(fileToRetry as FileObject);
        },
        [files],
    );

    const acceptedFiles = useMemo(() => files.filter((file) => !file.error), [files]);
    const rejectedFiles = useMemo(() => files.filter((file) => file.error), [files]);

    return {
        onSelect,
        onRemove,
        onRetryUpload,
        acceptedFiles,
        rejectedFiles,
    };
};
