import { BodyShort, ProgressBar, VStack } from '@navikt/ds-react';
import { guid } from '@navikt/sif-common-utils';
import { useMemo } from 'react';

interface Props {
    maxSize: number;
    usedSize: number;
}

const formatFileSize = (sizeInBytes: number) => {
    const sizeInMB = sizeInBytes / 1048576;
    const sizeText = sizeInMB % 1 === 0 ? Math.floor(sizeInMB) : sizeInMB.toFixed(2);
    return <span style={{ whiteSpace: 'nowrap' }}>{sizeText} MB</span>;
};

const FileUploadSizeProgress = ({ maxSize, usedSize }: Props) => {
    const id = useMemo(() => guid(), []);
    return (
        <VStack gap="2">
            <ProgressBar value={usedSize} valueMax={maxSize} size="small" aria-labelledby={id} />
            <BodyShort size="small" id={id}>
                Samlet størrelse for filene som er lastet opp er {formatFileSize(usedSize)}. Du kan laste opp maks{' '}
                {formatFileSize(maxSize)}.
            </BodyShort>
        </VStack>
    );
};

export default FileUploadSizeProgress;
