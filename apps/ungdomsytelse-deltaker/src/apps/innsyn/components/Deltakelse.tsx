import { Box, Heading, VStack } from '@navikt/ds-react';
import { Deltakelse } from '@navikt/ung-common';
import { getGjeldendeRapporteringsperiode, getTidligereRapporteringsperioder } from '../utils/deltakelseUtils';
import FremhevetInntektsperiode from './fremhevet-inntektsperiode/FremhevetInntektsperiode';
import OppgavePanel from './oppgaver/OppgavePanel';
import Periodeliste from './Periodeliste';
import LøsteOppgaver from './løste-oppgaver/LøsteOppgaver';
import { DeltakelsePeriode } from '@navikt/ung-common/src/types/DeltakelsePeriode';

interface Props {
    deltakelse: DeltakelsePeriode;
}

const Deltakelse = ({ deltakelse }: Props) => {
    const { rapporteringsPerioder, oppgaver, programPeriode } = deltakelse;
    const gjeldendePeriode = getGjeldendeRapporteringsperiode(rapporteringsPerioder || []);
    const tidligerePerioder = getTidligereRapporteringsperioder(rapporteringsPerioder || []);

    const uløsteOppgaver = oppgaver.filter((oppgave) => oppgave.løstDato === undefined);
    const løsteOppgaver = oppgaver.filter((oppgave) => oppgave.løstDato !== undefined);

    return (
        <VStack gap="8">
            {uløsteOppgaver.map((oppgave, index) => (
                <OppgavePanel key={index} oppgave={oppgave} programPeriode={programPeriode} />
            ))}

            {gjeldendePeriode ? <FremhevetInntektsperiode rapporteringsperiode={gjeldendePeriode} /> : null}

            <Box>
                <Heading level="2" size="medium" spacing={true}>
                    Perioder og inntekt
                </Heading>
                <Periodeliste
                    erLåstForEndring={false}
                    perioder={tidligerePerioder || []}
                    programperiodeStartDato={deltakelse.programPeriode.from}
                />
            </Box>
            {løsteOppgaver.length > 0 ? (
                <Box>
                    <Heading level="2" size="medium" spacing={true}>
                        Tidligere oppgaver
                    </Heading>
                    <LøsteOppgaver oppgaver={løsteOppgaver} />
                </Box>
            ) : null}
        </VStack>
    );
};

// const sperrerOppgaveAndreEndringer = (oppgave: Oppgave): boolean => {
//     switch (oppgave.oppgavetype) {
//         case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
//         case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
//             return true;
//         default:
//             return false;
//     }
// };

export default Deltakelse;
