import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { sortDates } from '@navikt/sif-common-utils';
import { erDeltakelseAvsluttet, erDeltakelseStartet } from '../../utils/deltakelseUtils';
import OppgaverList from '../oppgaver-list/OppgaverList';
import DeltakelseAvsluttetInfo from './parts/DeltakelseAvsluttetInfo';
import DeltakelsePågåendeInfo from './parts/DeltakelsePågåendeInfo';
import DeltakelseIkkeStartetInfo from './parts/DeltakelseIkkeStartetInfo';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { DeltakelsePeriode } from '../../../../types/DeltakelsePeriode';

interface Props {
    deltakelsePeriode: DeltakelsePeriode;
}

const DeltakelseContent = ({ deltakelsePeriode }: Props) => {
    const { oppgaver } = deltakelsePeriode;
    const { programPeriode } = deltakelsePeriode;

    const deltakelseStartet = erDeltakelseStartet(deltakelsePeriode);
    const deltakelseAvsluttet = erDeltakelseAvsluttet(deltakelsePeriode);

    const visInfoOmDeltakelseIkkeStartet = !deltakelseStartet;
    const visInfoOmDeltakelseAvsluttet = deltakelseStartet && deltakelseAvsluttet;
    const visInfoOmInntektsrapportering = deltakelseStartet && !deltakelseAvsluttet;

    const uløsteOppgaver = oppgaver
        .filter((oppgave) => oppgave.status === OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.opprettetDato, o1.opprettetDato));

    const tidligereOppgaver = oppgaver
        .filter((oppgave) => oppgave.status !== OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.løstDato || o2.opprettetDato, o1.løstDato || o1.opprettetDato));

    const medMelding = visInfoOmDeltakelseAvsluttet || visInfoOmInntektsrapportering;
    return (
        <VStack gap="10">
            {visInfoOmDeltakelseIkkeStartet && <DeltakelseIkkeStartetInfo fraOgMed={programPeriode.from} />}
            {visInfoOmInntektsrapportering && <DeltakelsePågåendeInfo />}
            {visInfoOmDeltakelseAvsluttet && programPeriode.to && (
                <DeltakelseAvsluttetInfo fraOgMed={programPeriode.from} tilOgMed={programPeriode.to} />
            )}
            <VStack gap="4" marginBlock={medMelding ? '0' : '6'}>
                <Heading level="2" size="medium">
                    Dine oppgaver
                </Heading>
                {uløsteOppgaver.length > 0 ? (
                    <OppgaverList oppgaver={uløsteOppgaver} />
                ) : (
                    <BodyLong>Du har ingen uløste oppgaver.</BodyLong>
                )}
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Tidligere oppgaver
                </Heading>
                {tidligereOppgaver.length > 0 ? (
                    <OppgaverList oppgaver={tidligereOppgaver} oppgaveStatusTagVariant="text" visBeskrivelse={false} />
                ) : (
                    <BodyLong>Du har ingen tidligere oppgaver.</BodyLong>
                )}
            </VStack>
        </VStack>
    );
};

export default DeltakelseContent;
