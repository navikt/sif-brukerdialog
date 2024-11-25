import { BodyShort, Box, Button, HStack } from '@navikt/ds-react';
import PersonNøytral from '../illustrasjoner/PersonNøytral';
import { Deltaker } from '../types/Deltaker';
import Fødselsnummer from './Fødselsnummer';

interface Props {
    deltaker: Deltaker;
    onByttDeltaker: () => void;
}

const DeltaksleHeader = ({ deltaker, onByttDeltaker }: Props) => {
    return (
        <Box className="bg-gray-300">
            <Box className="p-3 bg-gray-100 border-b-2 border-b-gray-500  w-full">
                <HStack gap="6" align="center">
                    <HStack align={'center'} gap="4">
                        <PersonNøytral width="2rem" height={'2rem'} />
                        <BodyShort size="medium" weight="semibold">
                            {deltaker.fornavn} {deltaker.etternavn}
                        </BodyShort>
                        <Fødselsnummer fnr={deltaker.fødselsnummer} />
                    </HStack>
                    {deltaker.deltakelser && deltaker.deltakelser?.length > 1 ? (
                        <>
                            |<BodyShort>Deltakelser: {deltaker.deltakelser.length}</BodyShort>
                        </>
                    ) : null}
                    |
                    <Button variant="tertiary" size="xsmall" onClick={onByttDeltaker}>
                        Lukk deltakelse
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
};

export default DeltaksleHeader;
