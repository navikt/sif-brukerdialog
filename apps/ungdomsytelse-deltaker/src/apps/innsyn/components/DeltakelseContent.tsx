import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { sortDates } from '@navikt/sif-common-utils';
import { DeltakelsePeriode, OppgaveStatus } from '@navikt/ung-common';
import { erDeltakelseAvsluttet, erDeltakelseStartet } from '../utils/deltakelseUtils';
import DeltakelseAvsluttetInfo from './deltakelse-avsluttet-info/DeltakelseAvsluttetInfo';
import DeltakelseIkkeStartetInfo from './deltakelse-ikke-startet-info/DeltakelseIkkeStartetInfo';
import HuskelappInntekt from './huskelapp-inntekt/HuskelappInntekt';
import OppgaveLinkPanel from './oppgaver/OppgaveLinkPanel';
import OppgaverList from './oppgaver/OppgaverList';

interface Props {
    deltakelsePeriode: DeltakelsePeriode;
    visInfoOmInntektsrapportering?: boolean;
}

const DeltakelseContent = ({ deltakelsePeriode, visInfoOmInntektsrapportering }: Props) => {
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
        <VStack gap="10" marginBlock={visInfoOmInntektsrapportering ? '0 10' : '6 10'}>
            {visInfoOmInntektsrapportering && <HuskelappInntekt />}
            <VStack gap="4">
                <Heading level="2" size="large" style={{ fontWeight: '600' }}>
                    Dine oppgaver
                </Heading>
                {uløsteOppgaver.length > 0 ? (
                    <OppgaverList oppgaver={uløsteOppgaver} programPeriode={programPeriode} deltakelseId={id} />
                ) : (
                    <BodyLong>Du har ingen uløste oppgaver</BodyLong>
                )}
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="large" style={{ fontWeight: '600' }}>
                    Tidligere oppgaver
                </Heading>
                {tidligereOppgaver.length > 0 && (
                    <OppgaverList oppgaver={tidligereOppgaver} programPeriode={programPeriode} deltakelseId={id} />
                )}
                <OppgaveLinkPanel
                    tittel="Søknad for ungdomprogramytelsen"
                    status={OppgaveStatus.LØST}
                    løstDato={deltakelsePeriode.søktTidspunkt!}
                    onClick={() => {}}
                />
            </VStack>
        </VStack>
    );
};

export default DeltakelseContent;
