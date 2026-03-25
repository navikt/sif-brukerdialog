import { Heading, VStack } from '@navikt/ds-react';
import { BekreftelseOppgave } from '@sif/api';
import { useMemo, useState } from 'react';

import { useAppIntl } from '../../../i18n';
import OppgaveStatusTag from '../../components/oppgave-status-tag/OppgaveStatusTag';
import { getOppgaveStatusText, getOppgaveTittel } from '../../utils/textUtils';
import { OppgavebekreftelseContext } from './hooks/useOppgavebekreftelse';
import { Besvart, Kvittering, Ubesvart } from './OppgavebekreftelseParts';

interface Props {
    oppgave: BekreftelseOppgave;
    navn: string;
    children: React.ReactNode;
    initialVisKvittering?: boolean;
}

const Oppgavebekreftelse = ({ oppgave, navn, children, initialVisKvittering = false }: Props) => {
    const appIntl = useAppIntl();
    const [visKvittering, setVisKvittering] = useState(initialVisKvittering);

    const contextValue = useMemo(
        () => ({
            oppgave,
            navn,
            visKvittering,
            setVisKvittering,
        }),
        [oppgave, navn, visKvittering, setVisKvittering],
    );

    return (
        <OppgavebekreftelseContext.Provider value={contextValue}>
            <VStack gap="space-24">
                <div>
                    <OppgaveStatusTag
                        oppgaveStatus={oppgave.status}
                        oppgaveStatusTekst={getOppgaveStatusText(oppgave)}
                    />
                </div>
                <Heading level="1" size="large">
                    {getOppgaveTittel(oppgave, appIntl)}
                </Heading>
                {children}
            </VStack>
        </OppgavebekreftelseContext.Provider>
    );
};

Oppgavebekreftelse.Ubesvart = Ubesvart;
Oppgavebekreftelse.Besvart = Besvart;
Oppgavebekreftelse.Kvittering = Kvittering;

export default Oppgavebekreftelse;
