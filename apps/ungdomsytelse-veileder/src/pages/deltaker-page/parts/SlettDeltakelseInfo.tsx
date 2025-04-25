import { BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import { useState } from 'react';
import { kanSletteDeltakelse } from '../../../utils/deltakelseUtils';
import SlettDeltakelseModal from '../../../components/slett-deltakelse-modal/SlettDeltakelseModal';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const SlettDeltakelseInfo = ({ deltakelse, deltaker }: Props) => {
    const [visSlettDeltakelseModal, setVisSlettDeltakelseModal] = useState(false);

    if (!kanSletteDeltakelse(deltakelse)) {
        return null;
    }

    return (
        <VStack gap="4">
            <VStack gap="2">
                <Heading level="2" size="small">
                    Slett deltakelse
                </Heading>
                <BodyShort>
                    Frem til deltaker har sendt inn søknad, kan du slette deltakelsen hvis du har registrert den ved en
                    feil.
                </BodyShort>
            </VStack>
            <Box>
                <Button variant="secondary" size="small" onClick={() => setVisSlettDeltakelseModal(true)}>
                    Gå til slett deltakelse
                </Button>
            </Box>
            {visSlettDeltakelseModal && (
                <SlettDeltakelseModal
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    onCancel={() => setVisSlettDeltakelseModal(false)}
                />
            )}
        </VStack>
    );
};

export default SlettDeltakelseInfo;
