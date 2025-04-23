import { Deltakelse } from '@navikt/ung-common';
import SectionContainer from '../../../components/section-container/SectionContainer';
import OppgaveTabell from '../../../components/oppgave-tabell/OppgaveTabell';
import ToDo from '../../../dev-components/ToDo';
import { ToDoKeys } from '../../../dev-components/ToDos';
import { VStack } from '@navikt/ds-react';

interface Props {
    deltakelse: Deltakelse;
}
const DeltakelseEndringerOgVarsler = ({ deltakelse }: Props) => {
    return (
        <SectionContainer header="Historikk">
            <VStack gap="4">
                <OppgaveTabell oppgaver={deltakelse.oppgaver} />
                <ToDo id={ToDoKeys.historikk} />
            </VStack>
        </SectionContainer>
    );
};

export default DeltakelseEndringerOgVarsler;
