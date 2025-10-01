import { BekreftelseOppgave } from '@shared/types/Oppgave';
import { createContext, useContext, useMemo, useState } from 'react';

interface OppgavebekreftelseContextType {
    oppgave: BekreftelseOppgave;
    deltakerNavn: string;
    visKvittering: boolean;
    setVisKvittering: (vis: boolean) => void;
}

export const OppgavebekreftelseContext = createContext<OppgavebekreftelseContextType | null>(null);

export const useOppgavebekreftelse = () => {
    const context = useContext(OppgavebekreftelseContext);
    if (!context) {
        throw new Error('useOppgavebekreftelse must be used within Oppgavebekreftelse');
    }
    return context;
};

export const useOppgavebekreftelseState = (
    oppgave: BekreftelseOppgave,
    deltakerNavn: string,
    initialVisKvittering = false,
) => {
    const [visKvittering, setVisKvittering] = useState(initialVisKvittering);

    const contextValue = useMemo(
        () => ({ oppgave, deltakerNavn, visKvittering, setVisKvittering }),
        [oppgave, deltakerNavn, visKvittering, setVisKvittering],
    );

    return contextValue;
};
