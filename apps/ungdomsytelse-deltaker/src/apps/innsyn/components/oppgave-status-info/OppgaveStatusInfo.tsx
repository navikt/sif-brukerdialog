import { Alert, BodyLong, Box } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

interface Props {
    oppgaveStatus: OppgaveStatus;
}

const OppgaveStatusInfo = ({ oppgaveStatus }: Props) => {
    switch (oppgaveStatus) {
        case OppgaveStatus.UTLØPT:
        case OppgaveStatus.AVBRUTT:
            return (
                <Alert variant="info">
                    <Box>
                        <BodyLong>Denne oppgaven gjelder ikke lenger, du trenger ikke gjør noe.</BodyLong>
                    </Box>
                </Alert>
            );
        default:
            return null;
    }
};

export default OppgaveStatusInfo;
