import OppgaverList from '@innsyn/components/oppgaver-list/OppgaverList';
import { erDeltakelseAvsluttet, erDeltakelseStartet } from '@innsyn/utils/deltakelseUtils';
import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { sortDates } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { AppText } from '@shared/i18n';
import { DeltakelsePeriode } from '@shared/types/DeltakelsePeriode';

import DeltakelseAvsluttetInfo from './parts/DeltakelseAvsluttetInfo';
import DeltakelseIkkeStartetInfo from './parts/DeltakelseIkkeStartetInfo';
import DeltakelsePågåendeInfo from './parts/DeltakelsePågåendeInfo';

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
                    <AppText id="deltakelseContent.header" />
                </Heading>
                {uløsteOppgaver.length > 0 ? (
                    <OppgaverList oppgaver={uløsteOppgaver} />
                ) : (
                    <BodyLong>
                        <AppText id="deltakelseContent.ingenUløsteOppgaver" />
                    </BodyLong>
                )}
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    <AppText id="deltakelseContent.tidligereOppgaver" />
                </Heading>
                {tidligereOppgaver.length > 0 ? (
                    <OppgaverList oppgaver={tidligereOppgaver} oppgaveStatusTagVariant="text" visBeskrivelse={false} />
                ) : (
                    <BodyLong>
                        <AppText id="deltakelseContent.ingenTidligereOppgaver" />
                    </BodyLong>
                )}
            </VStack>
        </VStack>
    );
};

export default DeltakelseContent;
