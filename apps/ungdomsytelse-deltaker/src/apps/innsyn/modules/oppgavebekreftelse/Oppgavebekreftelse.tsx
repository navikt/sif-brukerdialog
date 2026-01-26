import OppgaveStatusTag from '@innsyn/atoms/oppgave-status-tag/OppgaveStatusTag';
import { getOppgaveStatusText, getOppgaveTittel } from '@innsyn/utils/textUtils';
import { Heading, VStack } from '@navikt/ds-react';
import { useAppIntl } from '@shared/i18n';
import { BekreftelseOppgave } from '@shared/types/Oppgave';
import { useMemo, useState } from 'react';

import { OppgavebekreftelseContext } from './hooks/useOppgavebekreftelse';
import { Besvart, Kvittering, Ubesvart } from './OppgavebekreftelseParts';

interface Props {
    oppgave: BekreftelseOppgave;
    deltakerNavn: string;
    children: React.ReactNode;
    initialVisKvittering?: boolean;
}

const Oppgavebekreftelse = ({ oppgave, deltakerNavn, children, initialVisKvittering = false }: Props) => {
    const appIntl = useAppIntl();
    const [visKvittering, setVisKvittering] = useState(initialVisKvittering);

    const contextValue = useMemo(
        () => ({
            oppgave,
            deltakerNavn,
            visKvittering,
            setVisKvittering,
        }),
        [oppgave, deltakerNavn, visKvittering, setVisKvittering],
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
                    {getOppgaveTittel(oppgave, appIntl)}
                </Heading>
                {children}
            </VStack>
        </OppgavebekreftelseContext.Provider>
    );
};

Oppgavebekreftelse.Ubesvart = Ubesvart;
Oppgavebekreftelse.Besvart = Besvart;
Oppgavebekreftelse.Kvittering = Kvittering;

export default Oppgavebekreftelse;
