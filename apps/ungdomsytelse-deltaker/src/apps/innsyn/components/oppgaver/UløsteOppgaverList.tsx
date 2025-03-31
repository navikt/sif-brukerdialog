import { VStack } from '@navikt/ds-react';
import { OpenDateRange } from '@navikt/sif-common-utils';
import { Oppgave } from '@navikt/ung-common';
import OppgavePanel from './OppgavePanel';

interface Props {
    uløsteOppgaver: Oppgave[];
    programPeriode: OpenDateRange;
    deltakelseId: string;
}

const UløsteOppgaverList = ({ deltakelseId, uløsteOppgaver, programPeriode }: Props) => {
    return (
        <VStack gap="8">
            {uløsteOppgaver.map((oppgave, index) => (
                <OppgavePanel
                    key={index}
                    oppgave={oppgave}
                    deltakelseId={deltakelseId}
                    programPeriode={programPeriode}
                />
            ))}
        </VStack>
    );
};

export default UløsteOppgaverList;
