import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { sortDates } from '@navikt/sif-common-utils';
import { DeltakelsePeriode, OppgaveStatus } from '@navikt/ung-common';
import {
    erDeltakelseAvsluttet,
    erDeltakelseStartet,
    visHuskelappOmInntektsrapportering,
} from '../utils/deltakelseUtils';
import DeltakelseAvsluttetInfo from './deltakelse-avsluttet-info/DeltakelseAvsluttetInfo';
import HuskelappInntekt from './huskelapp-inntekt/HuskelappInntekt';
import OppgaverList from './oppgaver-list/OppgaverList';
// import DeltakelseIkkeStartetInfo from './deltakelse-ikke-startet-info/DeltakelseIkkeStartetInfo';

interface Props {
    deltakelsePeriode: DeltakelsePeriode;
}

const DeltakelseContent = ({ deltakelsePeriode }: Props) => {
    const { oppgaver } = deltakelsePeriode;

    const deltakelseStartet = erDeltakelseStartet(deltakelsePeriode);
    const deltakelseAvsluttet = erDeltakelseAvsluttet(deltakelsePeriode);

    const visInfoOmDeltakelseAvsluttet = deltakelseStartet && deltakelseAvsluttet;

    const visInfoOmInntektsrapportering =
        deltakelseStartet && visHuskelappOmInntektsrapportering() && !deltakelseAvsluttet;

    // const visInfoOmDeltakelseIkkeStartet = !deltakelseStartet;

    const uløsteOppgaver = oppgaver
        .filter((oppgave) => oppgave.status === OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.opprettetDato, o1.opprettetDato));

    const tidligereOppgaver = oppgaver
        .filter((oppgave) => oppgave.status !== OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.løstDato || o2.opprettetDato, o1.løstDato || o1.opprettetDato));

    const medMelding = visInfoOmDeltakelseAvsluttet || visInfoOmInntektsrapportering;
    return (
        <VStack gap="10">
            {/* {visInfoOmDeltakelseIkkeStartet && <DeltakelseIkkeStartetInfo fraOgMed={programPeriode.from} />} */}
            {visInfoOmDeltakelseAvsluttet && <DeltakelseAvsluttetInfo />}
            {visInfoOmInntektsrapportering && <HuskelappInntekt />}
            <VStack gap="4" marginBlock={medMelding ? '0' : '6'}>
                <Heading level="2" size="medium">
                    Dine oppgaver
                </Heading>
                {uløsteOppgaver.length > 0 ? (
                    <OppgaverList oppgaver={uløsteOppgaver} />
                ) : (
                    <BodyLong>Du har ingen uløste oppgaver</BodyLong>
                )}
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Tidligere oppgaver
                </Heading>
                {tidligereOppgaver.length > 0 ? (
                    <OppgaverList oppgaver={tidligereOppgaver} oppgaveStatusTagVariant="text" visBeskrivelse={false} />
                ) : (
                    <BodyLong>Du har ingen tidligere oppgaver</BodyLong>
                )}
            </VStack>
        </VStack>
    );
};

export default DeltakelseContent;
