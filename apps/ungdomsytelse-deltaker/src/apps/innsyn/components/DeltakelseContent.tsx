import { Heading, Switch, VStack } from '@navikt/ds-react';
import { DeltakelsePeriode, OppgaveStatus } from '@navikt/ung-common';
import RapporterInntekt from './rapporter-inntekt/RapporterInntekt';
import UløsteOppgaverList from './oppgaver/UløsteOppgaverList';
import {
    erDeltakelseAvsluttet,
    erDeltakelseStartet,
    getPeriodeÅpenForInntektsrapportering,
} from '../utils/deltakelseUtils';
import DeltakelseIkkeStartetInfo from './deltakelse-ikke-startet-info/DeltakelseIkkeStartetInfo';
import DeltakelseAvsluttetInfo from './deltakelse-avsluttet-info/DeltakelseAvsluttetInfo';
import { dateRangeToISODateRange, sortDateRange, sortDates } from '@navikt/sif-common-utils';
import { useState } from 'react';

interface Props {
    deltakelsePeriode: DeltakelsePeriode;
}

const DeltakelseContent = ({ deltakelsePeriode }: Props) => {
    const [visTest, setVisTest] = useState(true);

    if (erDeltakelseStartet(deltakelsePeriode) === false) {
        return <DeltakelseIkkeStartetInfo />;
    }

    if (erDeltakelseAvsluttet(deltakelsePeriode)) {
        return <DeltakelseAvsluttetInfo />;
    }

    const { rapporteringsPerioder, oppgaver, programPeriode, id } = deltakelsePeriode;
    const uløsteOppgaver = oppgaver
        .filter((oppgave) => oppgave.status === OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.opprettetDato, o1.opprettetDato));

    const åpenInntektsperiode = getPeriodeÅpenForInntektsrapportering(rapporteringsPerioder);

    return (
        <VStack gap="8">
            {uløsteOppgaver.length === 0 ? null : (
                <VStack gap="4" marginBlock="4 0">
                    <Heading level="2" size="medium">
                        Endringer i din sak
                    </Heading>

                    <UløsteOppgaverList
                        uløsteOppgaver={uløsteOppgaver}
                        programPeriode={programPeriode}
                        deltakelseId={id}
                    />
                </VStack>
            )}
            {åpenInntektsperiode ? (
                <VStack gap="4">
                    <Heading level="2" size="medium">
                        Meld fra om inntekt
                    </Heading>
                    <RapporterInntekt linkMode={true} rapporteringsperiode={åpenInntektsperiode} />
                </VStack>
            ) : null}

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
                            .map((p) => (
                                <RapporterInntekt
                                    linkMode={false}
                                    key={dateRangeToISODateRange(p.periode)}
                                    rapporteringsperiode={p}
                                />
                            ))}
                    </VStack>
                </VStack>
            ) : null}
        </VStack>
    );
};

export default DeltakelseContent;
