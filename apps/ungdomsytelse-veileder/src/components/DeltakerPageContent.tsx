import { Alert, Box, HStack, Page, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useDeltaker } from '../context/DeltakerContext';
import AktivDeltakelse from './aktiv-deltakelse/AktivDeltakelse';

const DeltakerPageContent = () => {
    const { deltaker, deltakelser = [], refetchDeltakelser } = useDeltaker();
    const aktivDeltakelse = deltakelser?.find((d) => d.erAktiv);
    const aktiveDeltakelser = deltakelser?.filter((d) => d.erAktiv);

    const handleOnDeltakelseChange = () => {
        refetchDeltakelser();
    };

    if (aktiveDeltakelser && aktiveDeltakelser.length > 1) {
        return (
            <VStack maxWidth={'30rem'}>
                <Alert variant="warning">Deltaker har flere aktive perioder</Alert>
            </VStack>
        );
    }
    if (!deltaker) {
        return (
            <HStack paddingBlock={'10'} paddingInline={'6'} justify="center">
                <LoadingSpinner size="3xlarge" />
            </HStack>
        );
    }

    if (!deltakelser) {
        return <Box>Ingen deltakelser funnet</Box>;
    }

    if (aktivDeltakelse || deltakelser.length === 1) {
        return (
            <Page.Block width="xl" gutters={true}>
                <AktivDeltakelse
                    deltakelse={aktivDeltakelse || deltakelser[0]}
                    deltaker={deltaker}
                    alleDeltakelser={deltakelser}
                    onChange={handleOnDeltakelseChange}
                />
            </Page.Block>
        );
    }

    return <Box>Flere deltakelser er registrert</Box>;
};

export default DeltakerPageContent;
