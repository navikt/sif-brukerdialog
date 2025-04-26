import { Alert, Box, HStack, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import DeltakelsePeriodeInfo from './parts/DeltakelsePeriodeInfo';
import SlettDeltakelseInfo from './parts/SlettDeltakelseInfo';
import DeltakerInfo from './parts/DeltakerInfo';

interface Props {
    deltaker: Deltaker;
    deltakelser: Deltakelse[];
}

const DeltakerPageContent = ({ deltaker, deltakelser = [] }: Props) => {
    if (deltakelser.length === 0) {
        return (
            <VStack maxWidth="30rem pb-8 pt-8">
                <Alert variant="info">Ingen deltakelser funnet</Alert>
            </VStack>
        );
    }
    if (deltakelser.length > 1) {
        <VStack maxWidth="30rem pb-8 pt-8">
            <Alert variant="info">Deltaker har flere deltakerperioder - dette er ikke støttet enda</Alert>
        </VStack>;
    }

    const deltakelse = deltakelser[0];

    return (
        <Box className="pb-8 pt-8">
            <VStack gap="10">
                {deltakelse.harSøkt === false ? (
                    <HStack>
                        <Alert variant="warning">Søknad om ungdomsytelse er ikke mottatt fra deltaker</Alert>
                    </HStack>
                ) : null}

                <DeltakerInfo deltaker={deltaker} />

                <DeltakelsePeriodeInfo deltakelse={deltakelse} deltaker={deltaker} />

                <SlettDeltakelseInfo deltakelse={deltakelse} deltaker={deltaker} />
            </VStack>
        </Box>
    );
};

export default DeltakerPageContent;
