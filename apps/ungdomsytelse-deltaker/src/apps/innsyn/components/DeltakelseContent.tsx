import { VStack } from '@navikt/ds-react';
import { Deltakelse as DeltakelseContent, OppgaveStatus } from '@navikt/ung-common';
import { DeltakelsePeriode } from '@navikt/ung-common/src/types/DeltakelsePeriode';
import RapporterInntekt from './rapporter-inntekt/RapporterInntekt';
import UløsteOppgaverList from './oppgaver/UløsteOppgaverList';
import {
    erDeltakelseAvsluttet,
    erDeltakelseStartet,
    getPeriodeÅpenForInntektsrapportering,
} from '../utils/deltakelseUtils';
import DeltakelseIkkeStartetInfo from './deltakelse-ikke-startet-info/DeltakelseIkkeStartetInfo';
import DeltakelseAvsluttetInfo from './deltakelse-avsluttet-info/DeltakelseAvsluttetInfo';
import RapporterInntektIkkeTilgjengeligInfo from './rapporter-inntekt/RapporterInntektIkkeTilgjengeligInfo';
import { getDateToday } from '@navikt/sif-common-utils';

interface Props {
    deltakelse: DeltakelsePeriode;
}

const DeltakelseContent = ({ deltakelse }: Props) => {
    if (erDeltakelseStartet(deltakelse) === false) {
        return <DeltakelseIkkeStartetInfo />;
    }

    if (erDeltakelseAvsluttet(deltakelse)) {
        return <DeltakelseAvsluttetInfo />;
    }

    const { rapporteringsPerioder, oppgaver, programPeriode, id } = deltakelse;
    const uløsteOppgaver = oppgaver.filter((oppgave) => oppgave.status === OppgaveStatus.ULØST);
    const åpenInntektsperiode = getPeriodeÅpenForInntektsrapportering(rapporteringsPerioder);

    return (
        <VStack gap="8">
            {uløsteOppgaver.length === 0 ? null : (
                <UløsteOppgaverList uløsteOppgaver={uløsteOppgaver} programPeriode={programPeriode} deltakelseId={id} />
            )}
            {åpenInntektsperiode ? (
                <RapporterInntekt rapporteringsperiode={åpenInntektsperiode} />
            ) : (
                <RapporterInntektIkkeTilgjengeligInfo inntektsmåned={getDateToday()} />
            )}
        </VStack>
    );
};

export default DeltakelseContent;
