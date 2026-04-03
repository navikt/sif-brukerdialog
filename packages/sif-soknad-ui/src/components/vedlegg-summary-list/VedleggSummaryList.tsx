import { PaperclipIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Link, List } from '@navikt/ds-react';

export interface SummaryVedlegg {
    id: string;
    name: string;
    url?: string;
    size?: number;
}

interface VedleggSummaryListProps {
    vedlegg: SummaryVedlegg[];
    showFileSize?: boolean;
}

const formatFileSize = (fileSizeInBytes?: number): string | null => {
    if (!fileSizeInBytes) {
        return null;
    }
    const megaBytes = fileSizeInBytes / (1024 * 1024);
    return formatter.format(megaBytes);
};

const formatter = new Intl.NumberFormat('nb-NO', {
    style: 'unit',
    unit: 'megabyte',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    // @ts-ignore
    roundingMode: 'ceil',
});

export const VedleggSummaryList = ({ vedlegg, showFileSize = true }: VedleggSummaryListProps) => {
    return (
        <List as="ul">
            {vedlegg.map((fil) => {
                const formattedSize = formatFileSize(fil.size);
                return (
                    <List.Item
                        key={fil.id}
                        icon={<PaperclipIcon title="Ikon" aria-hidden />}
                        style={{ margin: 0, padding: '.25rem 0' }}>
                        <HStack gap="space-8" wrap={false} align="baseline">
                            <HStack flexGrow="2" gap="space-0 space-12" align="baseline">
                                {fil.url ? (
                                    <Link
                                        href={fil.url}
                                        style={{ wordBreak: 'break-word' }}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {fil.name}
                                    </Link>
                                ) : (
                                    <BodyShort as="span" style={{ wordBreak: 'break-word' }}>
                                        {fil.name}
                                    </BodyShort>
                                )}
                                {showFileSize && formattedSize ? (
                                    <BodyShort
                                        as="span"
                                        size="small"
                                        style={{ color: 'var(--ax-text-neutral-subtle)' }}>
                                        ({formattedSize})
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
