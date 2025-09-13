import { BodyShort, Box, Tag } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import OppgaveStatusIkon from '../oppgave-status-ikon/OppgaveStatusIkon';

interface Props {
    oppgaveStatus: OppgaveStatus;
    oppgaveStatusTekst: string;
    variant?: OppgaveStatusTagVariant;
    size?: 'small' | 'medium';
    iconFill?: boolean;
}

export type OppgaveStatusTagVariant = 'tag' | 'text' | 'tag-uten-ikon';

const OppgaveStatusTag = ({
    oppgaveStatus,
    oppgaveStatusTekst,
    variant,
    size = 'small',
    iconFill,
}: Props): React.ReactNode => {
    if (variant === 'text') {
        return (
            <BodyShort className="text-text-subtle" size={size}>
                {oppgaveStatusTekst}
            </BodyShort>
        );
    }
    const ikon =
        variant !== 'tag-uten-ikon' ? (
            <Box marginBlock="1">
                <OppgaveStatusIkon size="small" oppgavestatus={oppgaveStatus} fill={iconFill} />
            </Box>
        ) : null;

    const text = <Box paddingInline="1">{oppgaveStatusTekst}</Box>;
    switch (oppgaveStatus) {
        case OppgaveStatus.LØST:
        case OppgaveStatus.LUKKET:
            return (
                <Tag variant="success" size={size}>
                    {ikon}
                    {text}
                </Tag>
            );
        case OppgaveStatus.ULØST:
            return (
                <Tag variant="warning" size={size}>
                    {ikon}
                    {text}
                </Tag>
            );
        case OppgaveStatus.AVBRUTT:
        case OppgaveStatus.UTLØPT:
            return (
                <Tag variant="neutral" size={size}>
                    {ikon}
                    {text}
                </Tag>
            );
    }
};

export default OppgaveStatusTag;
