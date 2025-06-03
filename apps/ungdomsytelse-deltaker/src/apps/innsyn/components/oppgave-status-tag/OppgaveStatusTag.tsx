import { BodyShort, Tag } from '@navikt/ds-react';
import { OppgaveBase, OppgaveStatus } from '@navikt/ung-common';
import { getOppgaveStatusText } from '../../utils/getOppgaveStatusText';

interface Props {
    oppgave: OppgaveBase;
    variant?: OppgaveStatusTagVariant;
    size?: 'small' | 'medium';
}

export type OppgaveStatusTagVariant = 'tag' | 'text';

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
        case OppgaveStatus.UTLØPT:
            return (
                <Tag variant="info" size={size}>
                    {text}
                </Tag>
            );
    }
};

export default OppgaveStatusTag;
