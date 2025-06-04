import { Alert, Box, HStack, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import DeltakelsePeriodeInfo from './DeltakelsePeriodeInfo';

import DeltakerInfo from './DeltakerInfo';
import DeltakelseHistorikk from './DeltakelseHistorikk';
import SlettDeltakerInfo from './SlettDeltakerInfo';

interface Props {
    deltaker: Deltaker;
    deltakelser: Deltakelse[];
}

const DeltakerPageContent = ({ deltaker, deltakelser }: Props) => {
    if (deltakelser.length === 0) {
        return (
            <VStack maxWidth="30rem" marginBlock="8 8">
                <Alert variant="info">Deltakelse ikke funnet</Alert>
            </VStack>
        );
    }
    if (deltakelser.length > 1) {
        return (
            <VStack maxWidth="30rem" marginBlock="8 8">
                <Alert variant="info">Deltaker har flere deltakerperioder - dette er ikke støttet enda</Alert>
            </VStack>
        );
    }

    const deltakelse = deltakelser[0];

    return (
        <Box className="pb-8 pt-8">
            <VStack gap="10">
                {deltakelse.søktTidspunkt === undefined ? (
                    <HStack>
                        <Alert variant="warning">Søknad om ungdomsytelse er ikke mottatt fra deltaker</Alert>
                    </HStack>
                ) : null}

                {/* <HStack gap="2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                            logError({
                                name: 'feiltype1',
                                message: 'Dette er en test-feil',
                                stack: 'stacktrace her',
                            } as Error);
                        }}>
                        Trigger feil
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                            logInfo(['Hva er dette?', { data: { navn: 'test' } }]);
                        }}>
                        Trigger info
                    </Button>
                </HStack> */}

                <DeltakerInfo deltaker={deltaker} />

                <DeltakelsePeriodeInfo deltakelse={deltakelse} deltaker={deltaker} />

                <SlettDeltakerInfo deltakelse={deltakelse} deltaker={deltaker} />

                <DeltakelseHistorikk deltakelseId={deltakelse.id} søktTidspunkt={deltakelse.søktTidspunkt} />
            </VStack>
        </Box>
    );
};

export default DeltakerPageContent;
