import { Alert, BodyLong, Box } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

import { AppText } from '../../../../i18n';

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
                            <AppText id="oppgaveStatusInfo.utløptEllerAvbrutt" />
                        </BodyLong>
                    </Box>
                </Alert>
            );
        default:
            return null;
    }
};

export default OppgaveStatusInfo;
