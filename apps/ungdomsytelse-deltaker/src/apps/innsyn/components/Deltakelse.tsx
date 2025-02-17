import { Deltakelse } from '../../../api/types';
import { Alert, VStack } from '@navikt/ds-react';
import { getGjeldendeRapporteringsperiode, getTidligereRapporteringsperioder } from '../utils/deltakelseUtils';
import FremhevetInntektsperiode from './fremhevet-inntektsperiode/FremhevetInntektsperiode';
import TidligerePerioder from './TidligerePerioder';
import Oppgaver from './oppgaver/Oppgaver';

interface Props {
    deltakelse: Deltakelse;
}

const Deltakelse = ({ deltakelse }: Props) => {
    const { rapporteringsPerioder, oppgaver, programPeriode } = deltakelse;
    const gjeldendePeriode = getGjeldendeRapporteringsperiode(rapporteringsPerioder || []);
    const tidligerePerioder = getTidligereRapporteringsperioder(rapporteringsPerioder || []);

    const harOppgave = oppgaver.length === 1;

    return (
        <VStack gap="8">
            {harOppgave ? (
                <VStack gap="8">
                    <Oppgaver oppgaver={oppgaver} programPeriode={programPeriode} />
                    <Alert variant="info">Info om at en ikke får gjort noe før en har godkjent endring</Alert>
                </VStack>
            ) : (
                <>
                    {gjeldendePeriode ? <FremhevetInntektsperiode rapporteringsperiode={gjeldendePeriode} /> : null}
                    <TidligerePerioder
                        perioder={tidligerePerioder || []}
                        programperiodeStartDato={deltakelse.programPeriode.from}
                    />
                </>
            )}
        </VStack>
    );
};

export default Deltakelse;
