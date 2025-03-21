import { Deltakelse } from '@navikt/ung-common';
import OppgaveTabell from '../../oppgave-tabell/OppgaveTabell';
import SectionContainer from '../../section-container/SectionContainer';

interface Props {
    deltakelse: Deltakelse;
}
const DeltakelseEndringerOgVarsler = ({ deltakelse }: Props) => {
    return (
        <SectionContainer header="Historikk">
            <OppgaveTabell oppgaver={deltakelse.oppgaver} />
        </SectionContainer>
    );
};

export default DeltakelseEndringerOgVarsler;
