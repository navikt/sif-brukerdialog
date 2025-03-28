import { Heading, Switch, VStack } from '@navikt/ds-react';
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
import { dateRangeToISODateRange, getDateToday, sortDateRange } from '@navikt/sif-common-utils';
import { useState } from 'react';

interface Props {
    deltakelse: DeltakelsePeriode;
}

const DeltakelseContent = ({ deltakelse }: Props) => {
    const [visTest, setVisTest] = useState(false);

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
            <Switch checked={visTest} onChange={(e) => setVisTest(e.target.checked)}>
                Testfunksjonalitet
            </Switch>
            {visTest ? (
                <VStack gap="4" className="border-2 border-dashed border-purple-100 p-6 rounded-lg">
                    <Heading level="2" size="large">
                        Kun for testing
                    </Heading>
                    <VStack gap="2">
                        {rapporteringsPerioder
                            .sort((p1, p2) => sortDateRange(p1.periode, p2.periode))
                            .reverse()
                            .filter((p) => p.harRapportert === false)
                            .map((p) => (
                                <RapporterInntekt key={dateRangeToISODateRange(p.periode)} rapporteringsperiode={p} />
                            ))}
                    </VStack>
                </VStack>
            ) : null}
        </VStack>
    );
};

export default DeltakelseContent;
