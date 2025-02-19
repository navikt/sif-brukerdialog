import { Alert, Box, Heading, VStack } from '@navikt/ds-react';
import { Deltakelse, Oppgave, Oppgavetype } from '@navikt/ung-common';
import { getGjeldendeRapporteringsperiode, getTidligereRapporteringsperioder } from '../utils/deltakelseUtils';
import FremhevetInntektsperiode from './fremhevet-inntektsperiode/FremhevetInntektsperiode';
import OppgavePanel from './oppgaver/OppgavePanel';
import Periodeliste from './Periodeliste';

interface Props {
    deltakelse: Deltakelse;
}

const Deltakelse = ({ deltakelse }: Props) => {
    const { rapporteringsPerioder, oppgaver, programPeriode } = deltakelse;
    const gjeldendePeriode = getGjeldendeRapporteringsperiode(rapporteringsPerioder || []);
    const tidligerePerioder = getTidligereRapporteringsperioder(rapporteringsPerioder || []);

    const oppgaverSperrerAndreEndringer = oppgaver.some(sperrerOppgaveAndreEndringer);

    return (
        <VStack gap="8">
            {oppgaver.map((oppgave, index) => (
                <OppgavePanel key={index} oppgave={oppgave} programPeriode={programPeriode} />
            ))}

            {oppgaverSperrerAndreEndringer ? (
                <Alert variant="info">Info om at en ikke får gjort noe før en har godkjent endring</Alert>
            ) : null}
            {gjeldendePeriode && oppgaverSperrerAndreEndringer === false ? (
                <FremhevetInntektsperiode rapporteringsperiode={gjeldendePeriode} />
            ) : null}

            <Box>
                <Heading level="2" size="medium" spacing={true}>
                    Tidligere perioder
                </Heading>
                <Periodeliste
                    erLåstForEndring={oppgaverSperrerAndreEndringer}
                    perioder={tidligerePerioder || []}
                    programperiodeStartDato={deltakelse.programPeriode.from}
                />
            </Box>
        </VStack>
    );
};

const sperrerOppgaveAndreEndringer = (oppgave: Oppgave): boolean => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return true;
        default:
            return false;
    }
};

export default Deltakelse;
