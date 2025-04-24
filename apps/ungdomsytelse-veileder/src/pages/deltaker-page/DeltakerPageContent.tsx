import { Alert, Box, Heading, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import DeltakelseHandlinger from './parts/DeltakelseHandlinger';
import DeltakelsePeriodeInfo from './parts/DeltakelsePeriodeInfo';
import { kontrollerDeltakelseOgDeltaker } from '../../utils/deltakelseUtils';

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

    const stoppÅrsak = kontrollerDeltakelseOgDeltaker(deltakelse, deltaker);

    return (
        <Box className="pb-8 pt-4">
            <VStack gap="8">
                {deltakelse.harSøkt === false ? (
                    <Alert variant="warning">Søknad om ungdomsytelse er ikke mottatt fra deltaker</Alert>
                ) : null}

                {stoppÅrsak ? (
                    <Alert variant="error">
                        <Heading level="2" size="small" spacing>
                            Deltakelse kan ikke behandles
                        </Heading>
                        Årsak: {stoppÅrsak}
                    </Alert>
                ) : null}

                <DeltakelsePeriodeInfo deltakelse={deltakelse} />
                {stoppÅrsak === undefined ? <DeltakelseHandlinger deltakelse={deltakelse} deltaker={deltaker} /> : null}
            </VStack>
        </Box>
    );
};

export default DeltakerPageContent;
