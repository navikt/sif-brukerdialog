import { Bleed, BodyLong, BodyShort, Box, Button, VStack } from '@navikt/ds-react';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import { useState } from 'react';
import UtvidKvoteModal from '../../../components/utvid-kvote-modal/UtvidKvoteModal';
import { dateFormatter } from '@navikt/sif-common-utils';
import { getDeltakelseHandlinger } from '../../../utils/deltakelseUtils';

interface DatoBoksProps {
    deltaker: Deltaker;
    deltakelse: Deltakelse;

    onDeltakelseChanged: (deltakelse: Deltakelse) => void;
}

const TildeltKvotePanel = ({ deltaker, deltakelse, onDeltakelseChanged }: DatoBoksProps) => {
    const [visDialog, setVisDialog] = useState(false);

    const { harUtvidetKvote, kvoteMaksDato, tilOgMed } = deltakelse;
    const { kanUtvideKvote } = getDeltakelseHandlinger(deltakelse);

    return (
        <>
            <Bleed marginBlock="space-1">
                <VStack gap="space-8" maxWidth="40rem">
                    <BodyShort weight="semibold" size="large">
                        {harUtvidetKvote ? '260 + 40' : '260'} dager
                    </BodyShort>
                    {tilOgMed ? (
                        <BodyLong>
                            Deltaker er meldt ut med siste dag <strong>{dateFormatter.dayCompactDate(tilOgMed)}</strong>
                            .
                        </BodyLong>
                    ) : (
                        <BodyLong>
                            Maksdato: <strong>{dateFormatter.dayCompactDate(kvoteMaksDato)}</strong>.
                        </BodyLong>
                    )}

                    {kanUtvideKvote && (
                        <Box paddingBlock="space-8 space-0">
                            <Button variant="secondary" size="small" onClick={() => setVisDialog(true)}>
                                Registrer forlenget periode
                            </Button>
                        </Box>
                    )}
                </VStack>
            </Bleed>

            {visDialog ? (
                <UtvidKvoteModal
                    onClose={() => setVisDialog(false)}
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    onDeltakelseChanged={(d) => {
                        setVisDialog(false);
                        onDeltakelseChanged(d);
                    }}
                />
            ) : null}
        </>
    );
};

export default TildeltKvotePanel;
