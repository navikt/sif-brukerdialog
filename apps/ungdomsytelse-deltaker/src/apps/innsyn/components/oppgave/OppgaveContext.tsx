import { createContext, ReactNode, useContext, useState } from 'react';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useSendOppgavebekreftelse } from '../../hooks/api/useSendOppgavebekreftelse';
import { ApiError } from '@navikt/ung-common';

interface OppgaveContextProps {
    visSkjema?: boolean;
    erBesvart?: boolean;
    isPending?: boolean;
    error?: ApiError | null;
    setErBesvart: (visSkjema: boolean) => void;
    setVisSkjema: (visSkjema: boolean) => void;
    sendSvar: (svar: UngdomsytelseOppgavebekreftelse) => Promise<void>;
}

const OppgaveContext = createContext<OppgaveContextProps | undefined>(undefined);

export const OppgaveProvider = ({ children }: { children: ReactNode }) => {
    const [visSkjema, setVisSkjema] = useState<boolean>(false);
    const [erBesvart, setErBesvart] = useState<boolean>(false);

    const { mutateAsync, error, isPending } = useSendOppgavebekreftelse();

    const sendSvar = async (svar: UngdomsytelseOppgavebekreftelse) => {
        try {
            await mutateAsync(svar);
            setErBesvart(true);
        } catch {
            // Håndteres gjennom useSendOppgavebekreftelse
        }
    };

    return (
        <OppgaveContext.Provider
            value={{ visSkjema, setVisSkjema, erBesvart, setErBesvart, isPending, error, sendSvar }}>
            {children}
        </OppgaveContext.Provider>
    );
};

export const useOppgaveContext = () => {
    const context = useContext(OppgaveContext);
    if (!context) {
        throw new Error('useOppgaveContext must be used within an OppgaveProvider');
    }
    return context;
};
