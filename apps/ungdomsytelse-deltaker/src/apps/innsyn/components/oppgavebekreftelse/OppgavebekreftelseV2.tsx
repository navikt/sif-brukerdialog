import { Heading, VStack } from '@navikt/ds-react';
import { createContext, useContext, useState } from 'react';

import { BekreftelseOppgave } from '../../../../types/Oppgave';
import { getOppgaveStatusText } from '../../utils/textUtils';
import OppgaveStatusTag from '../oppgave-status-tag/OppgaveStatusTag';
import { Besvart, Kvittering, Ubesvart } from './parts/OppgavebekreftelseV2Parts';

interface OppgavebekreftelseV2ContextType {
    oppgave: BekreftelseOppgave;
    deltakerNavn: string;
    visKvittering: boolean;
    setVisKvittering: (vis: boolean) => void;
}

const OppgavebekreftelseV2Context = createContext<OppgavebekreftelseV2ContextType | null>(null);

interface Props {
    oppgave: BekreftelseOppgave;
    deltakerNavn: string;
    oppgavetittel: string;
    children: React.ReactNode;
    initialVisKvittering?: boolean;
}

const OppgavebekreftelseV2 = ({
    oppgave,
    deltakerNavn,
    oppgavetittel,
    children,
    initialVisKvittering = false,
}: Props) => {
    const [visKvittering, setVisKvittering] = useState(initialVisKvittering);

    return (
        <OppgavebekreftelseV2Context.Provider value={{ oppgave, deltakerNavn, visKvittering, setVisKvittering }}>
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
        </OppgavebekreftelseV2Context.Provider>
    );
};

// Hook for å bruke context
const useOppgavebekreftelseV2 = () => {
    const context = useContext(OppgavebekreftelseV2Context);
    if (!context) {
        throw new Error('useOppgavebekreftelseV2 must be used within OppgavebekreftelseV2');
    }
    return context;
};

// Attach compound components
OppgavebekreftelseV2.Ubesvart = Ubesvart;
OppgavebekreftelseV2.Besvart = Besvart;
OppgavebekreftelseV2.Kvittering = Kvittering;

export { OppgavebekreftelseV2, useOppgavebekreftelseV2 };
export default OppgavebekreftelseV2;
