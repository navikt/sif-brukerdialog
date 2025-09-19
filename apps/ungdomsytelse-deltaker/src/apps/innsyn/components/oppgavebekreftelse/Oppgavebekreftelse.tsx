import { Heading, VStack } from '@navikt/ds-react';
import { useMemo, useState } from 'react';

import { BekreftelseOppgave } from '../../../../types/Oppgave';
import { getOppgaveStatusText } from '../../utils/textUtils';
import OppgaveStatusTag from '../oppgave-status-tag/OppgaveStatusTag';
import { OppgavebekreftelseContext, useOppgavebekreftelse } from './hooks/useOppgavebekreftelse';
import { Besvart, Kvittering, Ubesvart } from './OppgavebekreftelseParts';

interface Props {
    oppgave: BekreftelseOppgave;
    deltakerNavn: string;
    oppgavetittel: string;
    children: React.ReactNode;
    initialVisKvittering?: boolean;
}

const Oppgavebekreftelse = ({
    oppgave,
    deltakerNavn,
    oppgavetittel,
    children,
    initialVisKvittering = false,
}: Props) => {
    const [visKvittering, setVisKvittering] = useState(initialVisKvittering);

    const contextValue = useMemo(
        () => ({ oppgave, deltakerNavn, visKvittering, setVisKvittering }),
        [oppgave, deltakerNavn, visKvittering, setVisKvittering],
    );

    return (
        <OppgavebekreftelseContext.Provider value={contextValue}>
            <VStack gap="6">
                <div>
                    <OppgaveStatusTag
                        oppgaveStatus={oppgave.status}
                        oppgaveStatusTekst={getOppgaveStatusText(oppgave)}
                    />
                </div>
                <Heading level="1" size="large">
                    {oppgavetittel}
                </Heading>
                {children}
            </VStack>
        </OppgavebekreftelseContext.Provider>
    );
};

Oppgavebekreftelse.Ubesvart = Ubesvart;
Oppgavebekreftelse.Besvart = Besvart;
Oppgavebekreftelse.Kvittering = Kvittering;

export { Oppgavebekreftelse, useOppgavebekreftelse };
export default Oppgavebekreftelse;
