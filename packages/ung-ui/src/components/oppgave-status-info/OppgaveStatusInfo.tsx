import { Alert, BodyLong, Box } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';

import { UngUiText } from '../../i18n';

interface Props {
    oppgaveStatus: OppgaveStatus;
}

export const OppgaveStatusInfo = ({ oppgaveStatus }: Props) => {
    switch (oppgaveStatus) {
        case OppgaveStatus.UTLØPT:
        case OppgaveStatus.AVBRUTT:
            return (
                <Alert variant="info">
                    <Box>
                        <BodyLong>
                            <UngUiText id="@ungUi.oppgaveStatusInfo.utløptEllerAvbrutt" />
                        </BodyLong>
                    </Box>
                </Alert>
            );
        default:
            return null;
    }
};
