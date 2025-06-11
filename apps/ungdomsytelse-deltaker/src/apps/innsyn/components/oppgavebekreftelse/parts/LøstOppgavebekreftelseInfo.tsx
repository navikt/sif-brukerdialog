import { Alert, BodyLong, BodyShort, Box, Heading } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-common';

interface Props {
    oppgaveStatus: OppgaveStatus;
}

const LøstOppgavebekreftelseInfo = ({ oppgaveStatus }: Props) => {
    switch (oppgaveStatus) {
        case OppgaveStatus.UTLØPT:
            return (
                <Alert variant="warning">
                    <Box>
                        <Heading level="3" size="small" spacing>
                            Fristen for oppgaven er utløpt
                        </Heading>
                        <BodyLong>
                            En oppgave kan blir utløpt når fristen for å svare er passert. Når oppgaven uløper behandles
                            den automatisk.
                        </BodyLong>
                    </Box>
                </Alert>
            );
        case OppgaveStatus.AVBRUTT:
            return (
                <Alert variant="warning">
                    <Box>
                        <Heading level="3" size="small" spacing>
                            Oppgaven er avbrutt
                        </Heading>
                        <BodyShort>
                            En oppgave blir avbrutt hvis informasjonen i oppgaven ikke lenger er gyldig eller relevant.
                            Dette kan for eksempel skje hvis oppgaven erstattes av en ny oppgave.
                        </BodyShort>
                    </Box>
                </Alert>
            );
        case OppgaveStatus.LUKKET:
            return (
                <Alert variant="warning">
                    <Box>
                        <Heading level="3" size="small" spacing>
                            Oppgaven er lukket
                        </Heading>
                        <BodyShort>Oppgaven ble lukket uten at det medførte noen endring i saken din.</BodyShort>
                    </Box>
                </Alert>
            );
        default:
            return null;
    }
};

export default LøstOppgavebekreftelseInfo;
