import { BodyShort, Box, Button, HStack } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Deltaker } from '@navikt/ung-common';
import PersonNøytral from '../../atoms/PersonNøytral';

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
        <Box className="p-3 bg-deepblue-100 w-full rounded-md rounded-b-none  border-b-2 border-gray-700">
            <HStack gap="6" align="center" justify={'space-between'}>
                <HStack align={'center'} gap="4" className="nowrap">
                    <PersonNøytral width="2.5rem" height={'2.5rem'} />
                    <BodyShort size="large" weight="semibold">
                        {fornavn} {etternavn}
                    </BodyShort>
                </HStack>
                <Button
                    variant="tertiary-neutral"
                    onClick={onLukkDeltaker}
                    iconPosition="right"
                    icon={<XMarkIcon aria-hidden={true} />}>
                    Lukk deltaker
                </Button>
            </HStack>
        </Box>
    );
};

export default DeltakerHeader;
