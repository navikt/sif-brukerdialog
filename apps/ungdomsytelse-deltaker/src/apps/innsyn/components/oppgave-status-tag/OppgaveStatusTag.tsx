import { BodyShort, Box, Tag } from '@navikt/ds-react';
import { OppgaveBase, OppgaveStatus } from '@navikt/ung-common';
import { getOppgaveStatusText } from '../../utils/getOppgaveStatusText';
import OppgaveStatusIkon from '../oppgave-status-ikon/OppgaveStatusIkon';

interface Props {
    oppgave: OppgaveBase;
    variant?: OppgaveStatusTagVariant;
    size?: 'small' | 'medium';
    iconFill?: boolean;
}

export type OppgaveStatusTagVariant = 'tag' | 'text';

const OppgaveStatusTag = ({ oppgave, variant, size = 'small', iconFill }: Props): React.ReactNode => {
    if (variant === 'text') {
        return (
            <BodyShort className="text-text-subtle" size={size}>
                {getOppgaveStatusText(oppgave)}
            </BodyShort>
        );
    }
    const text = <Box paddingInline="1">{getOppgaveStatusText(oppgave)}</Box>;
    switch (oppgave.status) {
        case OppgaveStatus.LØST:
        case OppgaveStatus.LUKKET:
            return (
                <Tag variant="success" size={size}>
                    {text}
                </Tag>
            );
        case OppgaveStatus.ULØST:
            return (
                <Tag variant="warning" size={size}>
                    {text}
                </Tag>
            );
        case OppgaveStatus.AVBRUTT:
            return (
                <Tag variant="neutral" size={size}>
                    <Box marginBlock="1">
                        <OppgaveStatusIkon size="small" oppgavestatus={oppgave.status} fill={iconFill} />
                    </Box>
                    {text}
                </Tag>
            );
        case OppgaveStatus.UTLØPT:
            return (
                <Tag variant="neutral" size={size}>
                    <Box marginBlock="1">
                        <OppgaveStatusIkon size="small" oppgavestatus={oppgave.status} fill={iconFill} />
                    </Box>
                    {text}
                </Tag>
            );
    }
};

export default OppgaveStatusTag;
