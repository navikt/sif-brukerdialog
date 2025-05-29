import { createContext, ReactNode, useContext, useState } from 'react';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useSendOppgavebekreftelse } from '../../hooks/api/useSendOppgavebekreftelse';
import { ApiError } from '@navikt/ung-common';

interface DeprOppgaveContextProps {
    visKvittering?: boolean;
    erBesvart?: boolean;
    isPending?: boolean;
    error?: ApiError | null;
    setErBesvart: (visSkjema: boolean) => void;
    sendSvar: (svar: UngdomsytelseOppgavebekreftelse) => Promise<void>;
}

const DeprOppgaveContext = createContext<DeprOppgaveContextProps | undefined>(undefined);

export const DeprOppgaveProvider = ({ children }: { children: ReactNode }) => {
    const [erBesvart, setErBesvart] = useState<boolean>(false);
    const [visKvittering, setVisKvittering] = useState<boolean>(false);

    const { mutateAsync, error, isPending } = useSendOppgavebekreftelse();

    const sendSvar = async (svar: UngdomsytelseOppgavebekreftelse) => {
        try {
            await mutateAsync(svar);
            setErBesvart(true);
            setVisKvittering(true);
        } catch {
            // Håndteres gjennom useSendOppgavebekreftelse
        }
    };

    return (
        <DeprOppgaveContext.Provider value={{ erBesvart, visKvittering, setErBesvart, isPending, error, sendSvar }}>
            {children}
        </DeprOppgaveContext.Provider>
    );
};

export const useDeprOppgaveContext = () => {
    const context = useContext(DeprOppgaveContext);
    if (!context) {
        throw new Error('useOppgaveContext must be used within an OppgaveProvider');
    }
    return context;
};
