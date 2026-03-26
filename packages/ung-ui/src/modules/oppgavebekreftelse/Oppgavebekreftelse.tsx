import { Heading, VStack } from '@navikt/ds-react';
import { BekreftelseOppgave } from '@sif/api/ung-brukerdialog';
import { useMemo, useState } from 'react';

import { OppgaveStatusTag } from '../../components';
import { useUngUiIntl } from '../../i18n';
import { getOppgaveStatusText, getOppgaveTittel } from '../../utils/textUtils';
import { OppgavebekreftelseContext } from './hooks/useOppgavebekreftelse';
import { Besvart, Kvittering, Ubesvart } from './OppgavebekreftelseParts';

interface Props {
    oppgave: BekreftelseOppgave;
    navn: string;
    children: React.ReactNode;
    initialVisKvittering?: boolean;
}

export const Oppgavebekreftelse = ({ oppgave, navn, children, initialVisKvittering = false }: Props) => {
    const UngUiIntl = useUngUiIntl();
    const [visKvittering, setVisKvittering] = useState(initialVisKvittering);

    const contextValue = useMemo(
        () => ({
            oppgave,
            navn,
            visKvittering,
            setVisKvittering,
        }),
        [oppgave, navn, visKvittering, setVisKvittering],
    );

    return (
        <OppgavebekreftelseContext.Provider value={contextValue}>
            <VStack gap="space-24">
                <div>
                    <OppgaveStatusTag
                        oppgaveStatus={oppgave.status}
                        oppgaveStatusTekst={getOppgaveStatusText(oppgave)}
                    />
                </div>
                <Heading level="1" size="large">
                    {getOppgaveTittel(oppgave, UngUiIntl)}
                </Heading>
                {children}
            </VStack>
        </OppgavebekreftelseContext.Provider>
    );
};

Oppgavebekreftelse.Ubesvart = Ubesvart;
Oppgavebekreftelse.Besvart = Besvart;
Oppgavebekreftelse.Kvittering = Kvittering;
