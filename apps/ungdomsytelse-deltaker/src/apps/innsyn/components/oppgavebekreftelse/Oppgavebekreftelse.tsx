import { Heading, VStack } from '@navikt/ds-react';
import { createContext, useContext, useState } from 'react';

import { BekreftelseOppgave } from '../../../../types/Oppgave';
import { getOppgaveStatusText } from '../../utils/textUtils';
import OppgaveStatusTag from '../oppgave-status-tag/OppgaveStatusTag';
import { Besvart, Kvittering, Ubesvart } from './parts/OppgavebekreftelseParts';

interface OppgavebekreftelseContextType {
    oppgave: BekreftelseOppgave;
    deltakerNavn: string;
    visKvittering: boolean;
    setVisKvittering: (vis: boolean) => void;
}

const OppgavebekreftelseContext = createContext<OppgavebekreftelseContextType | null>(null);

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

    return (
        <OppgavebekreftelseContext.Provider value={{ oppgave, deltakerNavn, visKvittering, setVisKvittering }}>
            <VStack gap="6">
                {/* Status tag - alltid til stede */}
                <div>
                    <OppgaveStatusTag
                        oppgaveStatus={oppgave.status}
                        oppgaveStatusTekst={getOppgaveStatusText(oppgave)}
                    />
                </div>

                {/* Tittel - alltid til stede */}
                <Heading level="1" size="large">
                    {oppgavetittel}
                </Heading>

                {/* Resten av innholdet */}
                {children}
            </VStack>
        </OppgavebekreftelseContext.Provider>
    );
};

// Hook for å bruke context
const useOppgavebekreftelse = () => {
    const context = useContext(OppgavebekreftelseContext);
    if (!context) {
        throw new Error('useOppgavebekreftelse must be used within Oppgavebekreftelse');
    }
    return context;
};

// Attach compound components
Oppgavebekreftelse.Ubesvart = Ubesvart;
Oppgavebekreftelse.Besvart = Besvart;
Oppgavebekreftelse.Kvittering = Kvittering;

export { Oppgavebekreftelse, useOppgavebekreftelse };
export default Oppgavebekreftelse;
