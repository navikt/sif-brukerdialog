import { FileObject } from '@navikt/ds-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { canRetryFileUpload, getFileUploadErrorReason } from './fileUploadErrorUtils';
import { mapFileToPersistedFile, UploadedFile } from './types';

interface UseFileUploaderProps {
    initialFiles?: UploadedFile[];
    uploadFile: (file: File) => Promise<{ id: string; url: string }>;
    deleteFile: (id: string) => Promise<void>;
    onFilesChanged?: (files: UploadedFile[]) => void;
}

let fileIdCounter = 0;

export const useFileUploader = ({
    initialFiles = [],
    uploadFile,
    deleteFile,
    onFilesChanged,
}: UseFileUploaderProps) => {
    const [files, setFiles] = useState<UploadedFile[]>(initialFiles);

    const onFilesChangedRef = useRef(onFilesChanged);
    onFilesChangedRef.current = onFilesChanged;

    useEffect(() => {
        onFilesChangedRef.current?.(files);
    }, [files]);

    const upload = useCallback(
        async (file: File) => {
            try {
                const { id, url } = await uploadFile(file);
                setFiles((prev) =>
                    prev.map((f) =>
                        f.file === file
                            ? {
                                  ...f,
                                  file: mapFileToPersistedFile(file),
                                  pending: false,
                                  uploaded: true,
                                  info: { id, url },
                              }
                            : f,
                    ),
                );
            } catch (e) {
                const reason = getFileUploadErrorReason(e);
                setFiles((prev) =>
                    prev.map((f) =>
                        f.file === file
                            ? {
                                  ...f,
                                  pending: false,
                                  uploaded: false,
                                  error: true,
                                  reasons: [reason],
                                  canRetry: canRetryFileUpload(reason),
                              }
                            : f,
                    ),
                );
            }
        },
        [uploadFile],
    );

    const onSelect = useCallback(
        async (selectedFiles: FileObject[]) => {
            const withError: UploadedFile[] = selectedFiles
                .filter((f) => f.error)
                .map((f) => ({
                    clientId: `file-${++fileIdCounter}`,
                    file: f.file,
                    pending: false,
                    uploaded: false,
                    error: true,
                    reasons: (f as any).reasons ?? [],
                    canRetry: false,
                }));
            const toUpload: UploadedFile[] = selectedFiles
                .filter((f) => !f.error)
                .map((f) => ({
                    clientId: `file-${++fileIdCounter}`,
                    file: f.file,
                    pending: true,
                    uploaded: false,
                    error: false,
                    reasons: [],
                    canRetry: false,
                }));
            setFiles((prev) => [...prev, ...toUpload, ...withError]);
            await Promise.all(toUpload.map((f) => upload(f.file as File)));
        },
        [upload],
    );

    const onRemove = useCallback(
        async (fileToRemove: UploadedFile) => {
            if (fileToRemove.info) {
                await deleteFile(fileToRemove.info.id);
            }
            setFiles((prev) => prev.filter((f) => f !== fileToRemove));
        },
        [deleteFile],
    );

    const onRetryUpload = useCallback(
        async (fileToRetry: UploadedFile) => {
            setFiles((prev) =>
                prev.map((f) =>
                    f.file === fileToRetry.file
                        ? { ...f, pending: true, uploaded: false, error: false, reasons: [], canRetry: false }
                        : f,
                ),
            );
            await upload(fileToRetry.file as File);
        },
        [upload],
    );

    const acceptedFiles = useMemo(() => files.filter((f) => !f.error), [files]);
    const rejectedFiles = useMemo(() => files.filter((f) => f.error), [files]);

    return { onSelect, onRemove, onRetryUpload, acceptedFiles, rejectedFiles };
};
