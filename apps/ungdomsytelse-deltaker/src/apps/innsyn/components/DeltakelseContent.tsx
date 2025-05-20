import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { DeltakelsePeriode, OppgaveStatus } from '@navikt/ung-common';
import OppgaverList from './oppgaver/OppgaverList';
import { erDeltakelseAvsluttet, erDeltakelseStartet } from '../utils/deltakelseUtils';
import DeltakelseIkkeStartetInfo from './deltakelse-ikke-startet-info/DeltakelseIkkeStartetInfo';
import DeltakelseAvsluttetInfo from './deltakelse-avsluttet-info/DeltakelseAvsluttetInfo';
import { sortDates } from '@navikt/sif-common-utils';

interface Props {
    deltakelsePeriode: DeltakelsePeriode;
}

const DeltakelseContent = ({ deltakelsePeriode }: Props) => {
    if (erDeltakelseStartet(deltakelsePeriode) === false) {
        return <DeltakelseIkkeStartetInfo />;
    }

    if (erDeltakelseAvsluttet(deltakelsePeriode)) {
        return <DeltakelseAvsluttetInfo />;
    }

    const { oppgaver, programPeriode, id } = deltakelsePeriode;
    const uløsteOppgaver = oppgaver
        .filter((oppgave) => oppgave.status === OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.opprettetDato, o1.opprettetDato));

    const tidligereOppgaver = oppgaver
        .filter((oppgave) => oppgave.status !== OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.opprettetDato, o1.opprettetDato));

    return (
        <VStack gap="10">
            <VStack gap="4">
                <Heading level="2" size="large" style={{ fontWeight: '600' }}>
                    Dine oppgaver
                </Heading>
                {uløsteOppgaver.length > 0 ? (
                    <OppgaverList oppgaver={uløsteOppgaver} programPeriode={programPeriode} deltakelseId={id} />
                ) : (
                    <BodyShort>Du har ingen oppgaver du må gjøre</BodyShort>
                )}
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="large" style={{ fontWeight: '600' }}>
                    Tidligere oppgaver
                </Heading>
                {tidligereOppgaver.length > 0 ? (
                    <OppgaverList oppgaver={tidligereOppgaver} programPeriode={programPeriode} deltakelseId={id} />
                ) : (
                    <>
                        <BodyShort>Du har ingen tidligere oppgaver</BodyShort>
                    </>
                )}
            </VStack>
        </VStack>
    );
};

export default DeltakelseContent;
