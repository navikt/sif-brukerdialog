import { BodyShort, Box, Button, HStack } from '@navikt/ds-react';
import PersonNøytral from '../illustrations/PersonNøytral';
import { Deltaker } from '../types/Deltaker';
import Fødselsnummer from './Fødselsnummer';

interface Props {
    deltaker: Deltaker;
    onLukkDeltaker: () => void;
}

const DeltakerHeader = ({
    deltaker: {
        person: { fornavn, etternavn, fødselsnummer },
        deltakelser = [],
    },
    onLukkDeltaker,
}: Props) => {
    return (
        <Box className="bg-gray-300">
            <Box className="p-3 bg-gray-100 border-b-2 border-b-gray-500  w-full">
                <HStack gap="6" align="center">
                    <HStack align={'center'} gap="4">
                        <PersonNøytral width="2rem" height={'2rem'} />
                        <BodyShort size="medium" weight="semibold">
                            {fornavn} {etternavn}
                        </BodyShort>
                        <Fødselsnummer fnr={fødselsnummer} />
                    </HStack>
                    {deltakelser && deltakelser?.length > 1 ? (
                        <>
                            |<BodyShort>Deltakelser: {deltakelser.length}</BodyShort>
                        </>
                    ) : null}
                    |
                    <Button variant="tertiary" size="xsmall" onClick={onLukkDeltaker}>
                        Lukk deltaker
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
};

export default DeltakerHeader;
