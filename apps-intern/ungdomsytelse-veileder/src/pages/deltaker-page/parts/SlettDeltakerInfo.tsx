import { BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import SlettDeltakerModal from '../../../components/slett-deltaker-modal/SlettDeltakerModal';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import { kanSletteDeltakelse } from '../../../utils/deltakelseUtils';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const SlettDeltakerInfo = ({ deltakelse, deltaker }: Props) => {
    const [visSlettDeltakerModal, setVisSlettDeltakerModal] = useState(false);

    if (!kanSletteDeltakelse(deltakelse)) {
        return null;
    }

    return (
        <VStack gap="space-16">
            <VStack gap="space-8">
                <Heading level="2" size="small">
                    Slett deltaker
                </Heading>
                <BodyShort>
                    Frem til deltaker har sendt inn søknad, kan du slette deltakeren hvis du har registrert hen ved en
                    feil.
                </BodyShort>
            </VStack>
            <Box>
                <Button variant="secondary" size="small" onClick={() => setVisSlettDeltakerModal(true)}>
                    Gå til slett deltaker
                </Button>
            </Box>
            {visSlettDeltakerModal && (
                <SlettDeltakerModal deltaker={deltaker} onCancel={() => setVisSlettDeltakerModal(false)} />
            )}
        </VStack>
    );
};

export default SlettDeltakerInfo;
