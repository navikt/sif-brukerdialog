import { BodyShort, Tag } from '@navikt/ds-react';
import { OppgaveBase, OppgaveStatus } from '@navikt/ung-common';
import { getOppgaveStatusText } from '../../utils/getOppgaveStatusText';

interface Props {
    oppgave: OppgaveBase;
    variant?: 'tag' | 'text';
    size?: 'small' | 'medium';
}

const OppgaveStatusTag = ({ oppgave, variant, size = 'small' }: Props): React.ReactNode => {
    const text = getOppgaveStatusText(oppgave);
    if (variant === 'text') {
        return (
            <BodyShort className="text-text-subtle" size={size}>
                {text}
            </BodyShort>
        );
    }
    switch (oppgave.status) {
        case OppgaveStatus.LØST:
        case OppgaveStatus.LUKKET:
            return (
                <Tag variant="success" size="small">
                    {text}
                </Tag>
            );
        case OppgaveStatus.ULØST:
            return (
                <Tag variant="warning-filled" size="small">
                    {text}
                </Tag>
            );
        case OppgaveStatus.AVBRUTT:
        case OppgaveStatus.UTLØPT:
            return (
                <Tag variant="info" size="small">
                    {text}
                </Tag>
            );
    }
};

export default OppgaveStatusTag;
