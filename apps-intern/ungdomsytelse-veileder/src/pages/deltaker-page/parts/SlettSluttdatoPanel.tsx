import { BodyLong, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { Deltaker } from '../../../types/Deltaker';
import { Deltakelse } from '../../../types/Deltakelse';
import SlettSluttdatoModal from '../../../components/slett-sluttdato-modal/SlettSluttdatoModal';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const SlettSluttdatoPanel = ({ deltaker, deltakelse }: Props) => {
    const [visDialog, setVisDialog] = useState(false);

    return (
        <>
            <Box background="warning-moderate" padding="space-24" borderRadius="16">
                <VStack gap="space-0">
                    <Heading level="3" size="xsmall" spacing>
                        Slett sluttdato
                    </Heading>
                    <BodyLong spacing>Hvis sluttdatoen er satt ved en feil kan denne nullstilles.</BodyLong>
                    <div>
                        <Button variant="secondary" size="small" onClick={() => setVisDialog(true)}>
                            Åpne skjema
                        </Button>
                    </div>
                </VStack>
            </Box>

            {visDialog && (
                <SlettSluttdatoModal deltaker={deltaker} deltakelse={deltakelse} onCancel={() => setVisDialog(false)} />
            )}
        </>
    );
};

export default SlettSluttdatoPanel;
