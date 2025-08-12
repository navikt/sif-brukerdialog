import { BodyShort, Box, Button, Heading, HGrid, Hide, HStack, VStack } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import PersonNøytral from '../../atoms/PersonNøytral';
import { Deltaker } from '../../types/Deltaker';

interface Props {
    deltaker: Deltaker;
    onLukkDeltaker: () => void;
}

const DeltakerHeader = ({
    deltaker: {
        navn: { fornavn, etternavn },
    },
    onLukkDeltaker,
}: Props) => {
    return (
        <HGrid columns="1fr auto">
            <HStack align="center" gap="4" className="nowrap">
                <Hide below="md">
                    <PersonNøytral width="3.5rem" height="3.5rem" aria-hidden="true" />
                </Hide>
                <VStack gap="0">
                    <BodyShort size="small">Deltaker</BodyShort>
                    <Heading level="1" size="medium">
                        {fornavn} {etternavn}
                    </Heading>
                </VStack>
            </HStack>
            <Box>
                <Button
                    variant="tertiary-neutral"
                    onClick={onLukkDeltaker}
                    iconPosition="right"
                    icon={<XMarkIcon aria-hidden={true} />}>
                    Lukk deltaker
                </Button>
            </Box>
        </HGrid>
    );
};

export default DeltakerHeader;
