import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { OpenDateRange } from '@navikt/sif-common-utils';
import { Oppgave } from '@navikt/ung-common';
import OppgaverList from '../oppgaver/OppgaverList';

interface Props {
    oppgaver: Oppgave[];
    programPeriode: OpenDateRange;
    deltakelseId: string;
}

const UløsteOppgaver = ({ oppgaver, programPeriode, deltakelseId }: Props) => (
    <VStack gap="4">
        <Heading level="2" size="large" style={{ fontWeight: '600' }}>
            Dine oppgaver
        </Heading>
        {oppgaver.length > 0 ? (
            <OppgaverList oppgaver={oppgaver} programPeriode={programPeriode} deltakelseId={deltakelseId} />
        ) : (
            <BodyLong>Du har ingen uløste oppgaver</BodyLong>
        )}
    </VStack>
);

export default UløsteOppgaver;
