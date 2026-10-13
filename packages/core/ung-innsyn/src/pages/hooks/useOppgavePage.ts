import { createContext, useContext } from 'react';

import { OppgaveBesvartMetadata } from '../../analytics/oppgaveAnalytics';

interface OppgavePageContextType {
    onCancel: () => void;
    onSuccess?: (metadata?: OppgaveBesvartMetadata) => void;
}

export const OppgavePageContext = createContext<OppgavePageContextType | null>(null);

export const useOppgavePage = () => {
    const context = useContext(OppgavePageContext);
    if (!context) {
        throw new Error('useOppgavePage must be used within UngOppgavePage');
    }
    return context;
};
