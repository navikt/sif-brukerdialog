import { Alert, BodyLong, BodyShort, Box, Heading } from '@navikt/ds-react';
import { BekreftelseOppgave, Oppgave, OppgaveStatus } from '@navikt/ung-common';

interface Props {
    oppgave: Oppgave | BekreftelseOppgave;
}

const AvbruttOppgaveInfo = ({ oppgave }: Props) => {
    switch (oppgave.status) {
        case OppgaveStatus.UTLØPT:
            return (
                <Alert variant="warning">
                    <Box>
                        <Heading level="3" size="small" spacing>
                            Fristen for oppgaven er utløpt.
                        </Heading>
                        <BodyLong>
                            En oppgave kan blir utløpt vis fristen for å svare passerer. Når oppgaven uløper behandles
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

export default AvbruttOppgaveInfo;
