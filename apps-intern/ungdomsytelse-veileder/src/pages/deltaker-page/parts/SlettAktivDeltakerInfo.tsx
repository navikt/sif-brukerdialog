import { BodyLong, BoxNew, Button, Heading, HGrid, Switch, VStack } from '@navikt/ds-react';
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
                <VStack gap="2">
                    <Switch checked={ekspandert} onChange={(e) => setEkspandert(e.target.checked)} size="small">
                        Vis unntakshandlinger
                    </Switch>
                    {ekspandert ? (
                        <HGrid gap="4" columns={{ sm: 1, md: '1fr 1fr' }}>
                            <BoxNew
                                background="warning-moderate"
                                paddingBlock="7 8"
                                paddingInline="8"
                                borderRadius="large">
                                <VStack gap="0">
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
                            </BoxNew>
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
