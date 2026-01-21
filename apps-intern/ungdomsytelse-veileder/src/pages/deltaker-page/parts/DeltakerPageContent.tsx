import { Alert, Box, HStack, LocalAlert, VStack } from '@navikt/ds-react';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import DeltakelseHistorikk from './DeltakelseHistorikk';
import DeltakelsePeriodeInfo from './DeltakelsePeriodeInfo';
import DeltakerInfo from './DeltakerInfo';
import SlettNyDeltakerInfo from './SlettNyDeltakerInfo';
import { Features } from '../../../types/Features';
import SlettAktivDeltakerInfo from './SlettAktivDeltakerInfo';

interface Props {
    deltaker: Deltaker;
    deltakelser: Deltakelse[];
}

const DeltakerPageContent = ({ deltaker, deltakelser }: Props) => {
    if (deltakelser.length === 0) {
        return (
            <VStack maxWidth="30rem" marginBlock="8 8">
                <Alert variant="info">Deltakelse ikke funnet</Alert>
            </VStack>
        );
    }
    if (deltakelser.length > 1) {
        return (
            <VStack maxWidth="30rem" marginBlock="8 8">
                <Alert variant="info">Deltaker har flere deltakerperioder - dette er ikke støttet enda</Alert>
            </VStack>
        );
    }

    const deltakelse = deltakelser[0];

    return (
        <Box className="pb-8 pt-8">
            <VStack gap="10">
                {deltakelse.søktTidspunkt === undefined ? (
                    <HStack>
                        <Alert variant="warning">Søknad om ungdomsprogramytelse er ikke mottatt fra deltaker</Alert>
                    </HStack>
                ) : null}

                {deltakelse.erSlettet && (
                    <LocalAlert status="warning">
                        <LocalAlert.Header>
                            <LocalAlert.Title>Deltakelsen er slettet</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                )}

                <VStack gap="4">
                    <DeltakerInfo deltaker={deltaker} />
                    {Features.slettAktivDeltakelse && (
                        <SlettAktivDeltakerInfo deltaker={deltaker} deltakelse={deltakelse} />
                    )}
                </VStack>

                {!deltakelse.erSlettet && (
                    <>
                        <DeltakelsePeriodeInfo deltakelse={deltakelse} deltaker={deltaker} />
                        <SlettNyDeltakerInfo deltakelse={deltakelse} deltaker={deltaker} />
                    </>
                )}
                <DeltakelseHistorikk deltakelseId={deltakelse.id} />
            </VStack>
        </Box>
    );
};

export default DeltakerPageContent;
