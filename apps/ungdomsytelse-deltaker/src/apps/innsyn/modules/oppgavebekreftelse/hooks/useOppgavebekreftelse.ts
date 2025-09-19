import { createContext, useContext } from 'react';

import { BekreftelseOppgave } from '../../../../../types/Oppgave';

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
