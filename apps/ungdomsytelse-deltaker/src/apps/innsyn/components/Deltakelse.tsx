import { Deltakelse } from '../../../api/types';
import { Alert, Box, Heading, VStack } from '@navikt/ds-react';
import { getGjeldendeRapporteringsperiode, getTidligereRapporteringsperioder } from '../utils/deltakelseUtils';
import FremhevetInntektsperiode from './fremhevet-inntektsperiode/FremhevetInntektsperiode';
import Periodeliste from './Periodeliste';
import OppgavePanel from './oppgaver/OppgavePanel';
import { Oppgave } from '../../../api/schemas/oppgaveSchema';
import { Oppgavetype } from '../../../types/Oppgavetype';

interface Props {
    deltakelse: Deltakelse;
}

const Deltakelse = ({ deltakelse }: Props) => {
    const { rapporteringsPerioder, oppgaver, programPeriode } = deltakelse;
    const gjeldendePeriode = getGjeldendeRapporteringsperiode(rapporteringsPerioder || []);
    const tidligerePerioder = getTidligereRapporteringsperioder(rapporteringsPerioder || []);

    const oppgave = oppgaver.length === 1 ? oppgaver[0] : null;
    const oppgaveSperrerAndreEndringer = !!oppgave && sperrerOppgaveAndreEndringer(oppgave);

    return (
        <VStack gap="8">
            {oppgave ? <OppgavePanel oppgave={oppgave} programPeriode={programPeriode} /> : null}

            {oppgaveSperrerAndreEndringer ? (
                <Alert variant="info">Info om at en ikke får gjort noe før en har godkjent endring</Alert>
            ) : null}
            {gjeldendePeriode && oppgaveSperrerAndreEndringer === false ? (
                <FremhevetInntektsperiode rapporteringsperiode={gjeldendePeriode} />
            ) : null}

            <Box>
                <Heading level="2" size="medium" spacing={true}>
                    Tidligere perioder
                </Heading>
                <Periodeliste
                    erLåstForEndring={oppgaveSperrerAndreEndringer}
                    perioder={tidligerePerioder || []}
                    programperiodeStartDato={deltakelse.programPeriode.from}
                />
            </Box>
        </VStack>
    );
};

const sperrerOppgaveAndreEndringer = (oppgave: Oppgave): boolean => {
    switch (oppgave.type) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return true;
        default:
            return false;
    }
};

export default Deltakelse;
