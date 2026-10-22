import { PaperclipIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, HStack, InlineMessage, Link, List } from '@navikt/ds-react';

import { useSifSoknadUiIntl } from '../../i18n';

export interface SummaryVedlegg {
    id: string;
    name: string;
    url?: string;
    size?: number;
}

interface VedleggSummaryListProps {
    vedlegg: SummaryVedlegg[];
    emptyListText?: string;
    showFileSize?: boolean;
    manglendeVedleggIder?: string[];
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

export const VedleggSummaryList = ({
    vedlegg,
    emptyListText,
    showFileSize = true,
    manglendeVedleggIder = [],
}: VedleggSummaryListProps) => {
    const { text } = useSifSoknadUiIntl();

    if (vedlegg.length === 0) {
        return (
            <Box marginBlock="space-8">
                <BodyShort>{emptyListText || text('@sifSoknadUi.vedleggSummaryList.ingenVedlegg')}</BodyShort>
            </Box>
        );
    }

    return (
        <List as="ul">
            {vedlegg.map((fil) => {
                const formattedSize = formatFileSize(fil.size);
                const filManglerBackend = manglendeVedleggIder.includes(fil.id);
                return (
                    <List.Item
                        key={fil.id}
                        icon={<PaperclipIcon title="Ikon" aria-hidden />}
                        style={{ margin: 0, padding: '.25rem 0' }}>
                        <HStack gap="space-8" wrap={false} align="baseline">
                            <HStack flexGrow="2" gap="space-0 space-12" align="baseline">
                                {fil.url && !filManglerBackend ? (
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
                        {filManglerBackend ? (
                            <Box marginBlock="space-0 space-8">
                                <InlineMessage status="error" size="small">
                                    {text('@sifSoknadUi.vedleggSummaryList.mangler')}
                                </InlineMessage>
                            </Box>
                        ) : null}
                    </List.Item>
                );
            })}
        </List>
    );
};
