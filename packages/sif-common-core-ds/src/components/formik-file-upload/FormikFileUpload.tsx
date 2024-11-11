import { FileRejectionReason, FileUpload, Heading, VStack } from '@navikt/ds-react';
import { useFileUploader, Vedlegg } from './useFileUploader';
import { useFormikContext } from 'formik';
import { useCallback } from 'react';

interface Props {
    fieldName: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormikFileUpload = ({ fieldName = 'vedlegg' }: Props) => {
    const { values, setFieldValue } = useFormikContext<any>();

    const updateFiles = useCallback(
        (files: Vedlegg[]) => {
            setFieldValue(fieldName, files, false);
        },
        [setFieldValue, fieldName],
    );

    const { onSelect, removeFile, uploadedFiles, pendingFiles, rejectedFiles } = useFileUploader(
        values[fieldName],
        updateFiles,
    );

    const acceptedFiles = [...uploadedFiles, ...pendingFiles];

    return (
        <VStack gap="6">
            <FileUpload.Dropzone
                label="Last opp filer til søknaden"
                description={`Du kan laste opp JPG-, PNG- og PDF-filer.  Maks størrelse per fil er ${MAX_SIZE_MB} MB.`}
                maxSizeInBytes={MAX_SIZE}
                accept=".pdf, .png, .jpg, .jpeg"
                fileLimit={{ max: MAX_FILES, current: acceptedFiles.length }}
                onSelect={onSelect}
            />

            {acceptedFiles.length > 0 && (
                <VStack gap="2">
                    <Heading level="3" size="xsmall">
                        {`Dokumenter (${acceptedFiles.length})`}
                    </Heading>
                    <VStack as="ul" gap="3">
                        {acceptedFiles.map((file, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
                                file={file.file}
                                status={pendingFiles.includes(file) ? 'uploading' : undefined}
                                button={{
                                    action: 'delete',
                                    onClick: () => removeFile(file),
                                }}
                            />
                        ))}
                    </VStack>
                </VStack>
            )}
            {rejectedFiles.length > 0 && (
                <VStack gap="2">
                    <Heading level="3" size="xsmall">
                        Dokumenter med feil
                    </Heading>
                    <VStack as="ul" gap="3">
                        {rejectedFiles.map((rejected, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
                                file={rejected.file}
                                error={errors[rejected.reasons[0]]}
                                button={{
                                    action: 'delete',
                                    onClick: () => removeFile(rejected),
                                }}
                            />
                        ))}
                    </VStack>
                </VStack>
            )}
        </VStack>
    );
};

const MAX_FILES = 10;
const MAX_SIZE_MB = 9;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

const errors: Record<FileRejectionReason, string> = {
    fileType: 'Filformatet støttes ikke',
    fileSize: `Filen er større enn ${MAX_SIZE_MB} MB`,
};

export default FormikFileUpload;
