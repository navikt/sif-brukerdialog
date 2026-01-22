import { BodyLong, Box, Button, Heading, HGrid, Switch, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { Deltaker } from '../../../types/Deltaker';
import SlettAktivDeltakerModal from '../../../components/slett-aktiv-deltaker-modal/SlettAktivDeltakerModal';
import { Deltakelse } from '../../../types/Deltakelse';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const SlettAktivDeltakerInfo = ({ deltaker, deltakelse }: Props) => {
    const [ekspandert, setEkspandert] = useState(false);
    const [visDialog, setVisDialog] = useState(false);

    return (
        <>
            {deltakelse.erSlettet ? null : (
                <VStack gap="space-8">
                    <Switch checked={ekspandert} onChange={(e) => setEkspandert(e.target.checked)} size="small">
                        Vis unntakshandlinger
                    </Switch>
                    {ekspandert ? (
                        <HGrid gap="space-4" columns={{ sm: 1, md: '1fr 1fr' }}>
                            <Box
                                background="warning-moderate"
                                paddingBlock="space-6 space-8"
                                paddingInline="space-8"
                                borderRadius="16">
                                <VStack gap="space-0">
                                    <Heading level="3" size="xsmall" spacing>
                                        Registrer slettet deltakelse i ungdomsprogrammet
                                    </Heading>
                                    <BodyLong spacing>
                                        Hvis en deltaker ikke starter opp i programmet likevel, kan du registrere
                                        slettet deltakelse her.
                                    </BodyLong>
                                    <div>
                                        <Button variant="secondary" size="small" onClick={() => setVisDialog(true)}>
                                            Åpne skjema
                                        </Button>
                                    </div>
                                </VStack>
                            </Box>
                        </HGrid>
                    ) : null}
                </VStack>
            )}
            {visDialog && (
                <SlettAktivDeltakerModal
                    deltaker={deltaker}
                    deltakelse={deltakelse}
                    onCancel={() => setVisDialog(false)}
                />
            )}
        </>
    );
};

export default SlettAktivDeltakerInfo;
