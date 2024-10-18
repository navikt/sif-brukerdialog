import { BodyShort, Box, Button, HStack, Link, List, Loader } from '@navikt/ds-react';
import { Attachment as DSAttachment } from '@navikt/ds-icons';
import { CoreText, useCoreIntl } from '../../i18n/common.messages';
import { Attachment } from '../../types';
import { getFrontendUrlFromAttachment } from '../../utils/attachmentUtils';

type Variant = 'plain' | 'border' | 'zebra';
export interface AttachmentListProps {
    attachments: Attachment[];
    emptyListText?: string;
    showDeleteButton?: boolean;
    showFileSize?: boolean;
    variant?: Variant;
    onDelete?: (attachment: Attachment) => void;
}

const formatFileSize = (sizeInBytes: number): string => {
    const sizeInKB = sizeInBytes / 1024;
    const sizeInMB = sizeInBytes / 1048576;
    if (sizeInMB >= 1) {
        return `${sizeInMB.toFixed(2)} MB`;
    } else {
        return `${sizeInKB.toFixed(2)} KB`;
    }
};

const getVariantStyle = (variant: Variant, index: number): React.CSSProperties => {
    switch (variant) {
        case 'border':
            return {
                borderBottom: '1px solid var(--a-border-subtle)',
                borderTop: index === 0 ? '1px solid var(--a-border-subtle)' : 'none',
                paddingBlockEnd: '.5rem',
                paddingBlockStart: '.5rem',
                margin: 0,
            };
        case 'zebra':
            return {
                padding: '.5rem',
                margin: 0,
                backgroundColor: index % 2 === 0 ? 'var(--ac-table-row-zebra,var(--a-surface-subtle))' : 'none',
            };
        default:
            return {
                margin: 0,
                padding: '.25rem 0',
            };
    }
};

const AttachmentList = ({
    attachments,
    showFileSize,
    emptyListText,
    variant = 'plain',
    onDelete,
}: AttachmentListProps) => {
    const { text } = useCoreIntl();

    return attachments.length === 0 ? (
        <Box marginBlock="2">
            <BodyShort>{emptyListText || text('@core.AttachmentList.ingenVedlegg')}</BodyShort>
        </Box>
    ) : (
        <List as="ul">
            {attachments
                // .filter((v) => v.pending || v.uploaded)
                .map((a, index) => {
                    const { file, uploaded, pending } = a;
                    const url = getFrontendUrlFromAttachment(a);
                    return (
                        <List.Item
                            style={getVariantStyle(variant, index)}
                            key={file.name + index}
                            icon={pending ? <Loader size="xsmall" /> : <DSAttachment title="Ikon" aria-hidden />}>
                            <HStack gap="2" wrap={false} align="baseline">
                                <HStack flexGrow="2" gap="0 4" align="baseline">
                                    {uploaded && url ? (
                                        <Link href={url} style={{ wordBreak: 'break-word' }} target="_blank">
                                            {file.name}
                                        </Link>
                                    ) : (
                                        <span style={{ wordBreak: 'break-word' }}>{file.name}</span>
                                    )}
                                    {showFileSize && file.size ? (
                                        <BodyShort as="span" size="small" style={{ color: 'var(--a-text-subtle)' }}>
                                            ({formatFileSize(file.size)})
                                        </BodyShort>
                                    ) : null}
                                </HStack>
                                {onDelete && uploaded ? (
                                    <Box flexGrow="0">
                                        <Button
                                            type="button"
                                            size="small"
                                            variant="tertiary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                onDelete(a);
                                            }}
                                            aria-label={text('@core.AttachmentList.fjernAriaLabel', {
                                                filnavn: file.name,
                                            })}>
                                            <CoreText id="@core.AttachmentList.fjern" />
                                        </Button>
                                    </Box>
                                ) : undefined}
                            </HStack>
                        </List.Item>
                    );
                })}
        </List>
    );
};

export default AttachmentList;
