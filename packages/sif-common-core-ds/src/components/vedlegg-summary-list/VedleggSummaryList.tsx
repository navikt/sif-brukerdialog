import { BodyShort, Box, HStack, Link, List } from '@navikt/ds-react';
import { Attachment } from '@navikt/ds-icons';
import { useCoreIntl } from '../../i18n/common.messages';
import { Vedlegg } from '../../types/Vedlegg';
import { formatFileSize } from '../../utils/formatFileSize';

type Variant = 'plain' | 'border' | 'zebra';

export interface VedleggSummaryListProps {
    vedlegg: Vedlegg[];
    emptyListText?: string;
    variant?: Variant;
    showFileSize?: boolean;
}

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

const VedleggSummaryList = ({
    vedlegg,
    emptyListText,
    variant = 'plain',
    showFileSize = true,
}: VedleggSummaryListProps) => {
    const { text } = useCoreIntl();

    return vedlegg.length === 0 ? (
        <Box marginBlock="2">
            <BodyShort>{emptyListText || text('@core.vedleggSummaryList.ingenVedlegg')}</BodyShort>
        </Box>
    ) : (
        <List as="ul">
            {vedlegg.map((v, index) => {
                const { file, info } = v;
                return (
                    <List.Item
                        style={getVariantStyle(variant, index)}
                        key={file.name + index}
                        icon={<Attachment title="Ikon" aria-hidden />}>
                        <HStack gap="2" wrap={false} align="baseline">
                            <HStack flexGrow="2" gap="0 3" align="baseline">
                                {info ? (
                                    <Link href={info.url} style={{ wordBreak: 'break-word' }} target="_blank">
                                        {file.name}
                                    </Link>
                                ) : (
                                    <BodyShort as="span" style={{ wordBreak: 'break-word' }}>
                                        {file.name}
                                    </BodyShort>
                                )}
                                {showFileSize && file.size ? (
                                    <BodyShort as="span" size="small" style={{ color: 'var(--a-text-subtle)' }}>
                                        ({formatFileSize(file.size)})
                                    </BodyShort>
                                ) : null}
                            </HStack>
                        </HStack>
                    </List.Item>
                );
            })}
        </List>
    );
};

export default VedleggSummaryList;
