import { BodyShort, Box, Button, HStack, Link, List, Loader } from '@navikt/ds-react';
import { Attachment as DSAttachment } from '@navikt/ds-icons';
import { CoreText, useCoreIntl } from '../../i18n/common.messages';
import { Attachment } from '../../types';

enum Variant {
    'plain' = 'plain',
    'border' = 'border',
    'zebra' = 'zebra',
}
export interface AttachmentListV2Props {
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
        case Variant.border:
            return {
                borderBottom: '1px solid var(--a-border-subtle)',
                borderTop: index === 0 ? '1px solid var(--a-border-subtle)' : 'none',
                paddingBlockEnd: '.5rem',
                paddingBlockStart: '.5rem',
                margin: 0,
            };
        case Variant.zebra:
            return {
                padding: '.5rem',
                margin: 0,
                backgroundColor: index % 2 === 0 ? 'var(--ac-table-row-zebra,var(--a-surface-subtle))' : 'none',
            };
        default:
            return {
                margin: 0,
                padding: '.25rem',
            };
    }
};

const AttachmentListV2 = ({
    attachments,
    showFileSize,
    emptyListText,
    onDelete,
    variant = Variant.plain,
}: AttachmentListV2Props) => {
    const { text } = useCoreIntl();

    return attachments.length === 0 ? (
        <Box marginBlock="2">
            <BodyShort>{emptyListText || text('@core.AttachmentListV2.ingenVedlegg')}</BodyShort>
        </Box>
    ) : (
        <List as="ul">
            {attachments
                .filter((v) => v.pending || v.uploaded)
                .map((v, index) => {
                    const { file, uploaded, pending, url } = v;
                    return (
                        <List.Item
                            style={getVariantStyle(variant, index)}
                            key={file.name + index}
                            icon={
                                pending && 1 / 1 === 2 ? (
                                    <Loader size="xsmall" />
                                ) : (
                                    <DSAttachment title="Ikon" aria-hidden />
                                )
                            }>
                            <HStack gap="2" wrap={false} align="baseline">
                                <HStack flexGrow="2" gap="0 4" align="baseline">
                                    {uploaded && url ? <Link href={url}>{file.name}</Link> : <>{file.name}</>}
                                    {showFileSize && file.size ? (
                                        <BodyShort as="span" size="small" style={{ color: 'var(--a-text-subtle)' }}>
                                            ({formatFileSize(file.size)})
                                        </BodyShort>
                                    ) : null}
                                </HStack>
                                {onDelete && uploaded ? (
                                    <Button
                                        type="button"
                                        size="small"
                                        variant="tertiary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onDelete(v);
                                        }}
                                        aria-label={text('@core.AttachmentListV2.fjernAriaLabel', {
                                            filnavn: file.name,
                                        })}>
                                        <CoreText id="@core.AttachmentListV2.fjern" />
                                    </Button>
                                ) : undefined}
                            </HStack>
                        </List.Item>
                    );
                })}
        </List>
    );
};

export default AttachmentListV2;
