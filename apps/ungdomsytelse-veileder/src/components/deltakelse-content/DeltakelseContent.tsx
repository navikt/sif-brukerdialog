import { Alert, Box, VStack } from '@navikt/ds-react';
import DeltakelsePeriodeInfo from './parts/DeltakelsePeriodeInfo';
import DeltakelseHandlinger from './parts/DeltakelseHandlinger';
import DeltakelseEndringerOgVarsler from './parts/DeltakelseEndringerOgVarsler';
import { useDeltakelse } from '../../context/DeltakelseContext';
import { useVeileder } from '../../context/VeilederContext';

const DeltakelseContent = () => {
    const { deltakelse, deltaker, onDeltakelseChanged: onDeltakelseChange } = useDeltakelse();
    const { veileder } = useVeileder();
    return (
        <Box className="pb-8 pt-4">
            <VStack gap="8">
                {deltakelse.harSøkt === false ? (
                    <Alert variant="warning">Søknad om ungdomsytelse er ikke mottatt fra deltaker</Alert>
                ) : null}

                <DeltakelsePeriodeInfo deltakelse={deltakelse} />

                <DeltakelseHandlinger
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    veileder={veileder}
                    onDeltakelseChanged={onDeltakelseChange}
                />

                <DeltakelseEndringerOgVarsler deltakelse={deltakelse} />
            </VStack>
        </Box>
    );
};

export default DeltakelseContent;
