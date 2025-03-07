import { Alert, Box, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import DeltakelsePeriodeInfo from './parts/DeltakelsePeriodeInfo';
import DeltakelseHandlinger from './parts/DeltakelseHandlinger';
import DeltakelseEndringerOgVarsler from './parts/DeltakelseEndringerOgVarsler';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    alleDeltakelser: Deltakelse[];
    onChange: () => void;
}
const DeltakelseContent = ({ deltakelse }: Props) => {
    return (
        <Box className="pb-8 pt-4">
            <VStack gap="8">
                {deltakelse.harSøkt === false ? (
                    <Alert variant="warning">Søknad om ungdomsytelse er ikke mottatt fra deltaker</Alert>
                ) : null}

                <DeltakelsePeriodeInfo deltakelse={deltakelse} />

                <DeltakelseHandlinger deltakelse={deltakelse} />

                <DeltakelseEndringerOgVarsler deltakelse={deltakelse} />
            </VStack>
        </Box>
    );
};

export default DeltakelseContent;
