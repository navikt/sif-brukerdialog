import { Deltakelse } from '@navikt/ung-common';
import SectionContainer from '../../../components/section-container/SectionContainer';
import OppgaveTabell from '../../../components/oppgave-tabell/OppgaveTabell';

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
