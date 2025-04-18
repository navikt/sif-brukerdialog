import { Alert, Box, VStack } from '@navikt/ds-react';
import { useDeltakerContext } from '../../../context/DeltakerContext';
import DeltakelsePeriodeInfo from './DeltakelsePeriodeInfo';
import DeltakelseHandlinger from './DeltakelseHandlinger';
import DeltakelseEndringerOgVarsler from './DeltakelseEndringerOgVarsler';

const DeltakerPageContent = () => {
    const { deltaker, deltakelser = [] } = useDeltakerContext();
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
        <Box className="pb-8 pt-4">
            <VStack gap="8">
                {deltakelse.harSøkt === false ? (
                    <Alert variant="warning">Søknad om ungdomsytelse er ikke mottatt fra deltaker</Alert>
                ) : null}

                <DeltakelsePeriodeInfo deltakelse={deltakelse} />

                <DeltakelseHandlinger deltakelse={deltakelse} deltaker={deltaker} />

                <DeltakelseEndringerOgVarsler deltakelse={deltakelse} />
            </VStack>
        </Box>
    );
};

export default DeltakerPageContent;
