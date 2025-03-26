import { VStack } from '@navikt/ds-react';
import { Deltakelse as DeltakelseContent, OppgaveStatus } from '@navikt/ung-common';
import { DeltakelsePeriode } from '@navikt/ung-common/src/types/DeltakelsePeriode';
import RapporterInntekt from './rapporter-inntekt/RapporterInntekt';
import UløsteOppgaverList from './oppgaver/UløsteOppgaverList';
import { getPeriodeÅpenForInntektsrapportering } from '../utils/deltakelseUtils';

interface Props {
    deltakelse: DeltakelsePeriode;
}

const DeltakelseContent = ({ deltakelse }: Props) => {
    const { rapporteringsPerioder, oppgaver, programPeriode, id } = deltakelse;
    const uløsteOppgaver = oppgaver.filter((oppgave) => oppgave.status === OppgaveStatus.ULØST);
    const åpenInntektsperiode = getPeriodeÅpenForInntektsrapportering(rapporteringsPerioder);

    return (
        <VStack gap="8">
            {uløsteOppgaver.length === 0 ? null : (
                <UløsteOppgaverList uløsteOppgaver={uløsteOppgaver} programPeriode={programPeriode} deltakelseId={id} />
            )}
            {åpenInntektsperiode ? <RapporterInntekt rapporteringsperiode={åpenInntektsperiode} /> : null}
        </VStack>
    );
};

export default DeltakelseContent;
