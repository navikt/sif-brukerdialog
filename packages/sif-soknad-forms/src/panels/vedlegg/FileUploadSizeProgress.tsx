import { BodyShort, ProgressBar, VStack } from '@navikt/ds-react';
import { useMemo } from 'react';

import { useSifSoknadFormsIntl } from '../../i18n';

const BYTES_PER_MB = 1024 * 1024;

interface Props {
    maxSizeBytes: number;
    usedSizeBytes: number;
}

const FileUploadSizeProgress = ({ maxSizeBytes, usedSizeBytes }: Props) => {
    const { text } = useSifSoknadFormsIntl();
    const id = useMemo(() => `size-progress-${Math.random().toString(36).slice(2)}`, []);
    const usedMB = (usedSizeBytes / BYTES_PER_MB).toFixed(2);
    const maxMB = Math.floor(maxSizeBytes / BYTES_PER_MB);

    return (
        <VStack gap="space-8">
            <ProgressBar value={usedSizeBytes} valueMax={maxSizeBytes} size="small" aria-labelledby={id} />
            <BodyShort size="small" id={id}>
                {text('@sifSoknadForms.vedlegg.sizeProgress.label', { usedMB, maxMB })}
            </BodyShort>
        </VStack>
    );
};

export default FileUploadSizeProgress;
