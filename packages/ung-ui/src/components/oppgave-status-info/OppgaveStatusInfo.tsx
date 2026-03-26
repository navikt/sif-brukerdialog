import { Alert, BodyLong, Box } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';

import { UngUiText } from '@ui/i18n';

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
                        <BodyLong>
                            <UngUiText id="oppgaveStatusInfo.utløptEllerAvbrutt" />
                        </BodyLong>
                    </Box>
                </Alert>
            );
        default:
            return null;
    }
};

export default OppgaveStatusInfo;
