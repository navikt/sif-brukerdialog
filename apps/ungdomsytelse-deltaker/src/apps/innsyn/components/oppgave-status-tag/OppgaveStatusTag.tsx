import { BodyShort, Box, Tag } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-common';
import OppgaveStatusIkon from '../oppgave-status-ikon/OppgaveStatusIkon';

interface Props {
    oppgaveStatus: OppgaveStatus;
    oppgaveStatusTekst: string;
    variant?: OppgaveStatusTagVariant;
    size?: 'small' | 'medium';
    iconFill?: boolean;
}

export type OppgaveStatusTagVariant = 'tag' | 'text';

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
    const text = <Box paddingInline="1">{oppgaveStatusTekst}</Box>;
    switch (oppgaveStatus) {
        case OppgaveStatus.LØST:
        case OppgaveStatus.LUKKET:
            return (
                <Tag variant="success" size={size}>
                    <Box marginBlock="1">
                        <OppgaveStatusIkon size="small" oppgavestatus={oppgaveStatus} fill={iconFill} />
                    </Box>
                    {text}
                </Tag>
            );
        case OppgaveStatus.ULØST:
            return (
                <Tag variant="warning" size={size}>
                    <Box marginBlock="1">
                        <OppgaveStatusIkon size="small" oppgavestatus={oppgaveStatus} fill={iconFill} />
                    </Box>
                    {text}
                </Tag>
            );
        case OppgaveStatus.AVBRUTT:
            return (
                <Tag variant="neutral" size={size}>
                    <Box marginBlock="1">
                        <OppgaveStatusIkon size="small" oppgavestatus={oppgaveStatus} fill={iconFill} />
                    </Box>
                    {text}
                </Tag>
            );
        case OppgaveStatus.UTLØPT:
            return (
                <Tag variant="neutral" size={size}>
                    <Box marginBlock="1">
                        <OppgaveStatusIkon size="small" oppgavestatus={oppgaveStatus} fill={iconFill} />
                    </Box>
                    {text}
                </Tag>
            );
    }
};

export default OppgaveStatusTag;
