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
    const aktiveDeltakelser = deltakelser;

    if (!deltaker) {
        return null;
    }

    if (aktiveDeltakelser && aktiveDeltakelser.length > 1) {
        return (
            <VStack maxWidth={'30rem'}>
                <Alert variant="warning">Deltaker har flere aktive perioder</Alert>
            </VStack>
        );
    }

    if (!deltakelser) {
        return <Box>Ingen deltakelser funnet</Box>;
    }

    if (deltakelser.length === 0) {
        return <Box>Ingen deltakelse funnet</Box>;
    }
    if (deltakelser.length > 1) {
        return <Box>Kun en deltakelse støttes</Box>;
    }

    const deltakelse = deltakelser[0];

    return (
        <Box className="pb-8 pt-8">
            <VStack gap="10">
                {deltakelse.harSøkt === false ? (
                    <HStack>
                        <Alert variant="info">Søknad om ungdomsytelse er ikke mottatt fra deltaker</Alert>
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
