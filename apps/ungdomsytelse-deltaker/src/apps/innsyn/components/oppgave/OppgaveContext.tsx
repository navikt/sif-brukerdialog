import { ReactNode, useContext, useState, createContext } from 'react';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { deltakerApiService } from '../../../../api/deltakerApiService';

interface OppgaveContextProps {
    visSkjema?: boolean;
    erBesvart?: boolean;
    pending?: boolean;
    error?: string | null;
    setErBesvart: (visSkjema: boolean) => void;
    setVisSkjema: (visSkjema: boolean) => void;
    sendSvar: (svar: UngdomsytelseOppgavebekreftelse) => Promise<void>;
}

const OppgaveContext = createContext<OppgaveContextProps | undefined>(undefined);

export const OppgaveProvider = ({ children }: { children: ReactNode }) => {
    const [visSkjema, setVisSkjema] = useState<boolean>(false);
    const [erBesvart, setErBesvart] = useState<boolean>(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendSvar = (svar: UngdomsytelseOppgavebekreftelse) => {
        setPending(true);
        return deltakerApiService
            .sendOppgavebekreftelse(svar)
            .then(() => {
                setErBesvart(true);
            })
            .catch((error) => {
                setError('Besvar endret oppgave feiler');
                console.log(error);
            })
            .finally(() => {
                setPending(false);
            });
    };

    return (
        <OppgaveContext.Provider value={{ visSkjema, setVisSkjema, erBesvart, setErBesvart, pending, error, sendSvar }}>
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
