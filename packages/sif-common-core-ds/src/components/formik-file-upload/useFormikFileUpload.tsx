import { FileObject } from '@navikt/ds-react';
import { useState } from 'react';
import { uploadVedlegg } from '@navikt/sif-common-api';

// export type Vedlegg = FileObject & {
//     id: string;
//     url: string;
//     pending: boolean;
//     uploaded: boolean;
// };

export const useFormikFileUpload = () => {
    const [pendingFiles, setPendingFiles] = useState<FileObject[]>([]);
    const [files, setFiles] = useState<FileObject[]>([]);

    const uploadFile = async (file: FileObject) => {
        try {
            await uploadVedlegg(file.file);
            setFiles((prevAcceptedFiles) => [...prevAcceptedFiles, file]);
        } catch {
            setFiles((prevAcceptedFiles) => [...prevAcceptedFiles, { ...file, error: true, reasons: ['uploadError'] }]);
        }
        setPendingFiles((prevPendingFiles) => prevPendingFiles.filter((pendingFile) => pendingFile !== file));
    };

    const onSelect = (newFiles: FileObject[]) => {
        const filesWithErrors = newFiles.filter((file) => file.error);
        const filesToUpload = newFiles.filter((file) => !file.error);
        setFiles((prevAcceptedFiles) => [...prevAcceptedFiles, ...filesWithErrors]);
        setPendingFiles((prevPendingFiles) => [...prevPendingFiles, ...filesToUpload]);
        filesToUpload.forEach((file) => {
            uploadFile(file);
        });
    };

    function removeFile(fileToRemove: FileObject) {
        setFiles((prevAcceptedFiles) => prevAcceptedFiles.filter((file) => file !== fileToRemove));
    }

    return {
        onSelect,
        removeFile,
        acceptedFiles: files.filter((file) => !file.error),
        pendingFiles,
        rejectedFiles: files.filter((file) => file.error),
    };
};
