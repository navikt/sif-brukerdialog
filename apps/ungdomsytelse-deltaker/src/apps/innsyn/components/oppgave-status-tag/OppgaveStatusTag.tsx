import { Tag } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { BekreftelseOppgave, Oppgave, OppgaveStatus } from '@navikt/ung-common';

interface Props {
    oppgave: Oppgave | BekreftelseOppgave;
}

const renderDato = (dato?: Date) => {
    return dato ? dateFormatter.compact(dato) : '';
};

const renderDatoOgKlokkeslett = (dato?: Date) => {
    return dato ? dateFormatter.compactWithTime(dato) : '';
};

const OppgaveStatusTag = ({ oppgave }: Props) => {
    switch (oppgave.status) {
        case OppgaveStatus.LØST:
            return (
                <Tag variant="success" size="small">
                    Løst {renderDatoOgKlokkeslett(oppgave.løstDato)}
                </Tag>
            );
        case OppgaveStatus.ULØST:
            return (
                <Tag variant="warning-filled" size="small">
                    Uløst - frist {renderDato(oppgave.svarfrist)}
                </Tag>
            );
        case OppgaveStatus.AVBRUTT:
            return (
                <Tag variant="info" size="small">
                    Avbrutt
                </Tag>
            );
        case OppgaveStatus.LUKKET:
            return (
                <Tag variant="success" size="small">
                    Lukket {renderDatoOgKlokkeslett(oppgave.lukketDato)}
                </Tag>
            );
        case OppgaveStatus.UTLØPT:
            return (
                <Tag variant="info" size="small">
                    Utløpt
                </Tag>
            );

        default:
            return null;
    }
};

export default OppgaveStatusTag;
