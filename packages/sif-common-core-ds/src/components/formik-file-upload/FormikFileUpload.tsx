import { FileRejectionReason, FileUpload, Heading, VStack } from '@navikt/ds-react';
import { useFormikFileUpload } from './useFormikFileUpload';

interface Props {
    fieldName: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormikFileUpload = ({ fieldName }: Props) => {
    const { onSelect, removeFile, acceptedFiles, pendingFiles, rejectedFiles } = useFormikFileUpload();

    const filesAcceptedOrPending = [...acceptedFiles, ...pendingFiles];

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

            {filesAcceptedOrPending.length > 0 && (
                <VStack gap="2">
                    <Heading level="3" size="xsmall">
                        {`Dokumenter (${filesAcceptedOrPending.length})`}
                    </Heading>
                    <VStack as="ul" gap="3">
                        {filesAcceptedOrPending.map((file, index) => (
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

// const filePdf = new File(['abc'.repeat(100000)], 'document.pdf');
// const fileJpg = new File(['abc'.repeat(500000)], 'picture.jpg');
// const exampleFiles: FileObject[] = [
//     { file: filePdf, error: false },
//     { file: fileJpg, error: true, reasons: ['fileType'] },
// ];

export default FormikFileUpload;
