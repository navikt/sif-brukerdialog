import { Heading, HStack, LinkPanel, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker, Oppgavetype } from '@navikt/ung-common';
import { useState } from 'react';
import EndreStartdatoModal from '../../endre-startdato-modal/EndreStartdatoModal';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const DeltakelseHandlinger = ({ deltakelse, deltaker }: Props) => {
    const [visOppgaveDialog, setVisOppgaveDialog] = useState<Oppgavetype | null>(Oppgavetype.BEKREFT_ENDRET_STARTDATO);

    return (
        <VStack gap="4">
            <Heading level="3" size="small">
                Handlinger
            </Heading>
            <HStack className="bg-gray-50 p-5 rounded-md" gap="4">
                <LinkPanel
                    className="rounded-md"
                    href="#"
                    onClick={() => setVisOppgaveDialog(Oppgavetype.BEKREFT_ENDRET_STARTDATO)}>
                    <LinkPanel.Title className="text-large">Endre startdato</LinkPanel.Title>
                </LinkPanel>
                <LinkPanel
                    className="rounded-md"
                    href="#"
                    onClick={() => setVisOppgaveDialog(Oppgavetype.BEKREFT_ENDRET_SLUTTDATO)}>
                    <LinkPanel.Title className="text-large">Endre sluttdato</LinkPanel.Title>
                </LinkPanel>
            </HStack>
            {visOppgaveDialog === Oppgavetype.BEKREFT_ENDRET_STARTDATO ? (
                <EndreStartdatoModal
                    deltaker={deltaker}
                    deltakelse={deltakelse}
                    onClose={() => setVisOppgaveDialog(null)}
                />
            ) : null}
            {visOppgaveDialog === Oppgavetype.BEKREFT_ENDRET_SLUTTDATO ? (
                <EndreStartdatoModal
                    deltaker={deltaker}
                    deltakelse={deltakelse}
                    onClose={() => setVisOppgaveDialog(null)}
                />
            ) : null}
        </VStack>
    );
};

export default DeltakelseHandlinger;
