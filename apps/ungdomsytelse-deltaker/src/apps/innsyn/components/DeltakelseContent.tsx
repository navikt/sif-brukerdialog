import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { sortDates } from '@navikt/sif-common-utils';
import { DeltakelsePeriode, OppgaveStatus } from '@navikt/ung-common';
import DeltakelseAvsluttetInfo from './deltakelse-avsluttet-info/DeltakelseAvsluttetInfo';
import HuskelappInntekt from './huskelapp-inntekt/HuskelappInntekt';
import OppgaverList from './oppgaver/OppgaverList';
import SøknadMottattOppgavePanel from './oppgaver/søknad-mottatt-oppgave/SøknadMottattOppgavePanel';

interface Props {
    deltakelsePeriode: DeltakelsePeriode;
    visInfoOmDeltakelseAvsluttet?: boolean;
    visInfoOmInntektsrapportering?: boolean;
}

const DeltakelseContent = ({
    deltakelsePeriode,
    visInfoOmDeltakelseAvsluttet,
    visInfoOmInntektsrapportering,
}: Props) => {
    const { oppgaver, programPeriode, id } = deltakelsePeriode;

    const uløsteOppgaver = oppgaver
        .filter((oppgave) => oppgave.status === OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.opprettetDato, o1.opprettetDato));

    const tidligereOppgaver = oppgaver
        .filter((oppgave) => oppgave.status !== OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.opprettetDato, o1.opprettetDato));

    const medMelding = visInfoOmDeltakelseAvsluttet || visInfoOmInntektsrapportering;
    return (
        <VStack gap="10">
            {visInfoOmDeltakelseAvsluttet && <DeltakelseAvsluttetInfo />}
            {visInfoOmInntektsrapportering && <HuskelappInntekt />}
            <VStack gap="4" marginBlock={medMelding ? '0' : '6'}>
                <Heading level="2" size="large">
                    Dine oppgaver
                </Heading>
                {uløsteOppgaver.length > 0 ? (
                    <OppgaverList oppgaver={uløsteOppgaver} programPeriode={programPeriode} deltakelseId={id} />
                ) : (
                    <BodyLong>Du har ingen uløste oppgaver</BodyLong>
                )}
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="large">
                    Tidligere oppgaver
                </Heading>
                {tidligereOppgaver.length > 0 && (
                    <OppgaverList oppgaver={tidligereOppgaver} programPeriode={programPeriode} deltakelseId={id} />
                )}
                <SøknadMottattOppgavePanel mottatt={deltakelsePeriode.søktTidspunkt!} />
            </VStack>
        </VStack>
    );
};

export default DeltakelseContent;
