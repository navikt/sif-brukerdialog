import { FileUpload, Heading, VStack } from '@navikt/ds-react';
import {
    getVedleggFrontendUrl,
    getVedleggIdFromResponseHeaderLocation,
    lagreVedlegg,
    slettVedlegg,
} from '@sif/api/k9-prosessering';
import { SifFileUpload, UploadedFile, useFileUploader } from '@sif/rhf';
import { PictureScanningGuide } from '@sif/soknad-ui';
import { useCallback, useRef } from 'react';
import { FieldValues, Path } from 'react-hook-form';

import { SifSoknadFormsText, useSifSoknadFormsIntl } from '../../i18n';
import FileUploadSizeProgress from './FileUploadSizeProgress';
import FileUploadTotalSizeAlert from './FileUploadTotalSizeAlert';
import { canRetryFileUpload, getRejectedFileError } from './fileUploadUtils';

const MAX_TOTAL_VEDLEGG_SIZE_MB = 24;
const MAX_TOTAL_VEDLEGG_SIZE_BYTES = MAX_TOTAL_VEDLEGG_SIZE_MB * 1024 * 1024;

const getTotalSize = (files: UploadedFile[]): number =>
    files.reduce((sum, f) => sum + (f.uploaded ? f.file.size : 0), 0);

const getUploadedVedleggIds = (files: UploadedFile[]): string =>
    files
        .filter((f) => f.uploaded && f.info)
        .map((f) => f.info!.id)
        .sort()
        .join(',');

interface VedleggPanelLimits {
    MAX_FILES: number;
    MAX_SIZE_MB: number;
}

interface Props<T extends FieldValues> {
    name: Path<T>;
    validate?: (value: UploadedFile[]) => string | undefined;
    initialFiles?: UploadedFile[];
    otherFiles?: UploadedFile[];
    onVedleggEndret?: () => void;
    limits?: VedleggPanelLimits;
    headingLevel?: '2' | '3' | '4';
    showSizeProgress?: boolean;
    showPictureScanningGuide?: boolean;
    uploadLaterURL?: string;
    retryEnabled?: boolean;
    label?: string;
    description?: string;
}

export function VedleggPanel<T extends FieldValues>({
    name,
    validate,
    initialFiles = [],
    otherFiles = [],
    onVedleggEndret,
    limits = { MAX_FILES: 100, MAX_SIZE_MB: 10 },
    headingLevel = '2',
    showSizeProgress,
    showPictureScanningGuide,
    uploadLaterURL,
    retryEnabled,
    label,
    description,
}: Props<T>) {
    const { text } = useSifSoknadFormsIntl();

    const uploadFile = useCallback(async (file: File): Promise<{ id: string; url: string }> => {
        const response = await lagreVedlegg(file);
        const id = getVedleggIdFromResponseHeaderLocation(response.headers.location);
        return { id, url: getVedleggFrontendUrl(id) };
    }, []);

    const deleteFile = useCallback(async (id: string): Promise<void> => {
        await slettVedlegg(id);
    }, []);

    const previousIds = useRef(getUploadedVedleggIds(initialFiles));

    const handleFilesChanged = useCallback(
        (files: UploadedFile[]) => {
            if (files.some((f) => f.pending)) {
                return;
            }

            const currentIds = getUploadedVedleggIds(files);
            if (currentIds === previousIds.current) {
                return;
            }

            previousIds.current = currentIds;
            onVedleggEndret?.();
        },
        [onVedleggEndret],
    );

    const { onSelect, onRemove, onRetryUpload, acceptedFiles, rejectedFiles } = useFileUploader({
        initialFiles,
        uploadFile,
        deleteFile,
        onFilesChanged: onVedleggEndret ? handleFilesChanged : undefined,
    });

    const totalSize = getTotalSize([...acceptedFiles, ...otherFiles.filter((f) => f.uploaded)]);
    const totalSizeExceedsLimit = totalSize > MAX_TOTAL_VEDLEGG_SIZE_BYTES;

    return (
        <VStack gap="space-16">
            <SifFileUpload<T>
                name={name}
                validate={validate}
                acceptedFiles={acceptedFiles}
                onSelect={onSelect}
                label={label ?? text('@sifSoknadForms.vedlegg.dropzone.label', limits)}
                description={description ?? text('@sifSoknadForms.vedlegg.dropzone.description', limits)}
                maxSizeInBytes={limits.MAX_SIZE_MB * 1024 * 1024}
                accept=".pdf, .png, .jpg, .jpeg"
                fileLimit={{ max: limits.MAX_FILES, current: 0 }}
            />

            {totalSizeExceedsLimit && <FileUploadTotalSizeAlert uploadLaterURL={uploadLaterURL} />}

            {acceptedFiles.length > 0 && (
                <VStack gap="space-8">
                    <Heading level={headingLevel} size="xsmall">
                        <SifSoknadFormsText
                            id="@sifSoknadForms.vedlegg.filerlastetOpp.tittel"
                            values={{ antall: acceptedFiles.filter((f) => f.uploaded).length }}
                        />
                    </Heading>
                    {showSizeProgress && (
                        <FileUploadSizeProgress maxSizeBytes={MAX_TOTAL_VEDLEGG_SIZE_BYTES} usedSizeBytes={totalSize} />
                    )}
                    <VStack as="ul" gap="space-12">
                        {acceptedFiles.map((file, index) => (
                            <FileUpload.Item
                                as="li"
                                key={file.info?.id ?? index}
                                file={file.file}
                                onFileClick={
                                    file.info?.url
                                        ? () => window.open(file.info!.url, '_blank', 'noopener,noreferrer')
                                        : undefined
                                }
                                status={file.pending ? 'uploading' : undefined}
                                button={{ action: 'delete', onClick: () => onRemove(file) }}
                                translations={{
                                    uploading: text('@sifSoknadForms.vedlegg.lasterOpp'),
                                }}
                            />
                        ))}
                    </VStack>
                </VStack>
            )}

            {rejectedFiles.length > 0 && (
                <VStack gap="space-8">
                    <Heading level={headingLevel} size="xsmall">
                        <SifSoknadFormsText id="@sifSoknadForms.vedlegg.filerAvvist.tittel" />
                    </Heading>
                    <VStack as="ul" gap="space-12">
                        {rejectedFiles.map((file, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
                                file={file.file}
                                error={getRejectedFileError(
                                    { text },
                                    file.reasons.length > 0 ? file.reasons[0] : undefined,
                                    limits,
                                )}
                                button={
                                    retryEnabled && canRetryFileUpload(file.reasons[0] ?? '')
                                        ? { action: 'retry', onClick: () => onRetryUpload(file) }
                                        : { action: 'delete', onClick: () => onRemove(file) }
                                }
                            />
                        ))}
                    </VStack>
                </VStack>
            )}

            {showPictureScanningGuide && <PictureScanningGuide headingLevel={headingLevel} />}
        </VStack>
    );
}
