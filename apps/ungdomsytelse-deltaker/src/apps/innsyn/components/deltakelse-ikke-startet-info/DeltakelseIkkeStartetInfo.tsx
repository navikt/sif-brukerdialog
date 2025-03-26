import { Alert, VStack } from '@navikt/ds-react';

const DeltakelseIkkeStartetInfo = () => {
    return (
        <VStack gap="8">
            <Alert variant="info">Informasjon når deltakelse ikke er startet</Alert>
        </VStack>
    );
};

export default DeltakelseIkkeStartetInfo;
