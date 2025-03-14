import { Heading, VStack } from '@navikt/ds-react';
import { Deltakelse } from '@navikt/ung-common';
import OppgaveTabell from '../../oppgave-tabell/OppgaveTabell';

interface Props {
    deltakelse: Deltakelse;
}
const DeltakelseEndringerOgVarsler = ({ deltakelse }: Props) => {
    return (
        <VStack gap="4">
            <Heading level="3" size="medium">
                Historikk
            </Heading>
            <VStack className="bg-gray-50 p-5 rounded-md" gap="2">
                <OppgaveTabell oppgaver={deltakelse.oppgaver} />
            </VStack>
        </VStack>
    );
};

export default DeltakelseEndringerOgVarsler;
