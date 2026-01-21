import { Alert, Box, HStack, VStack } from '@navikt/ds-react';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import DeltakelseHistorikk from './DeltakelseHistorikk';
import DeltakelsePeriodeInfo from './DeltakelsePeriodeInfo';
import DeltakerInfo from './DeltakerInfo';
import SlettDeltakerInfo from './SlettDeltakerInfo';

interface Props {
    deltaker: Deltaker;
    deltakelser: Deltakelse[];
}

const DeltakerPageContent = ({ deltaker, deltakelser }: Props) => {
    if (deltakelser.length === 0) {
        return (
            <VStack maxWidth="30rem" marginBlock="space-32 space-32">
                <Alert variant="info">Deltakelse ikke funnet</Alert>
            </VStack>
        );
    }
    if (deltakelser.length > 1) {
        return (
            <VStack maxWidth="30rem" marginBlock="space-32 space-32">
                <Alert variant="info">Deltaker har flere deltakerperioder - dette er ikke støttet enda</Alert>
            </VStack>
        );
    }

    const deltakelse = deltakelser[0];

    return (
        <Box className="pb-8 pt-8">
            <VStack gap="space-40">
                {deltakelse.søktTidspunkt === undefined ? (
                    <HStack>
                        <Alert variant="warning">Søknad om ungdomsprogramytelse er ikke mottatt fra deltaker</Alert>
                    </HStack>
                ) : null}

                <DeltakerInfo deltaker={deltaker} />

                <DeltakelsePeriodeInfo deltakelse={deltakelse} deltaker={deltaker} />

                <SlettDeltakerInfo deltakelse={deltakelse} deltaker={deltaker} />

                <DeltakelseHistorikk deltakelseId={deltakelse.id} />
            </VStack>
        </Box>
    );
};

export default DeltakerPageContent;
