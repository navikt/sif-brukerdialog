import { Box, VStack } from '@navikt/ds-react';
import { useDeltaker } from '../context/DeltakerContext';
import { dateFormatter } from '@navikt/sif-common-utils';

const DeltakelserMeny = () => {
    const { deltakelser = [] } = useDeltaker();

    return (
        <VStack gap="4" minWidth={'10rem'}>
            {deltakelser.map((deltakelse) => (
                <Box key={deltakelse.id}>{dateFormatter.compact(deltakelse.fraOgMed)}</Box>
            ))}
        </VStack>
    );
};

export default DeltakelserMeny;
