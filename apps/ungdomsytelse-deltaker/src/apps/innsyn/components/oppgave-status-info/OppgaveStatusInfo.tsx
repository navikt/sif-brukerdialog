import { Alert, BodyLong, Box } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-common';

interface Props {
    oppgaveStatus: OppgaveStatus;
}

const OppgaveStatusInfo = ({ oppgaveStatus }: Props) => {
    switch (oppgaveStatus) {
        case OppgaveStatus.UTLØPT:
            return (
                <Alert variant="warning">
                    <Box>
                        <BodyLong>Denne oppgaven er utløpt og er behandlet automatisk.</BodyLong>
                    </Box>
                </Alert>
            );
        case OppgaveStatus.AVBRUTT:
            return (
                <Alert variant="warning">
                    <Box>
                        <BodyLong>Denne oppgaven er erstattet med en ny oppgave og er derfor avbrutt.</BodyLong>
                    </Box>
                </Alert>
            );
        case OppgaveStatus.LUKKET:
            return (
                <Alert variant="warning">
                    <Box>
                        <BodyLong>Oppgaven ble lukket uten at det medførte noen endring i saken din.</BodyLong>
                    </Box>
                </Alert>
            );
        default:
            return null;
    }
};

export default OppgaveStatusInfo;
