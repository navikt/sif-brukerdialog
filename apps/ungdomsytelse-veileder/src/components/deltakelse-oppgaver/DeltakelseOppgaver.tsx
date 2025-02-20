import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { Oppgave } from '@navikt/ung-common';
import OppgaveTabell from '../oppgave-tabell/OppgaveTabell';

interface Props {
    oppgaver: Oppgave[];
}

const DeltakelseOppgaver = ({ oppgaver }: Props) => {
    return (
        <VStack gap="4">
            <Heading level="3" size="small">
                Oppgaver til deltaker
            </Heading>
            <BodyShort>Her vises oppgaver som er sendt til bruker, og som bruker må respondere på.</BodyShort>
            <OppgaveTabell oppgaver={oppgaver} />
        </VStack>
    );
};

export default DeltakelseOppgaver;
