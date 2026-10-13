import { BodyLong, Box } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { SifInfoCard } from '@sif/soknad-ui';

import { UngInnsynText } from '../../i18n';

interface Props {
    oppgaveStatus: OppgaveStatus;
}

/** Returnerer informasjon hvis oppgaven er utløpt eller avbrutt */
export const OppgaveStatusInfo = ({ oppgaveStatus }: Props) => {
    switch (oppgaveStatus) {
        case OppgaveStatus.UTLØPT:
        case OppgaveStatus.AVBRUTT:
            return (
                <SifInfoCard variant="info">
                    <Box>
                        <BodyLong>
                            <UngInnsynText id="@ungInnsyn.oppgaveStatusInfo.utløptEllerAvbrutt" />
                        </BodyLong>
                    </Box>
                </SifInfoCard>
            );
        case OppgaveStatus.LØST:
        case OppgaveStatus.ULØST:
            return null;
    }
};
