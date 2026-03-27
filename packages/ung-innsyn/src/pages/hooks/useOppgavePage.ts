import { createContext, useContext } from 'react';

interface OppgavePageContextType {
    onCancel: () => void;
    onSuccess?: () => void;
}

export const OppgavePageContext = createContext<OppgavePageContextType | null>(null);

export const useOppgavePage = () => {
    const context = useContext(OppgavePageContext);
    if (!context) {
        throw new Error('useOppgavePage must be used within UngOppgavePage');
    }
    return context;
};
