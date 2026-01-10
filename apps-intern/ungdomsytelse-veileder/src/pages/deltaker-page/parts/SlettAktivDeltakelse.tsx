import { BodyLong, BoxNew, Button, Heading, HGrid, Switch, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { Deltakelse } from '../../../types/Deltakelse';
import SlettAktivDeltakelseModal from '../../../components/slett-aktiv-deltakelse-modal/SlettAktivDeltakelseModal';
import { Deltaker } from '../../../types/Deltaker';

interface Props {
    deltakelse: Deltakelse;
    deltaker: Deltaker;
}

const SlettAktivDeltakelse = ({ deltakelse, deltaker }: Props) => {
    const [ekspandert, setEkspandert] = useState(false);
    const [visDialog, setVisDialog] = useState(false);
    return (
        <VStack gap="2">
            <Switch checked={ekspandert} onChange={(e) => setEkspandert(e.target.checked)}>
                Vis unntakshandlinger
            </Switch>
            {ekspandert ? (
                <HGrid gap="4" columns={{ sm: 1, md: '1fr 1fr' }}>
                    <BoxNew background="warning-moderate" paddingBlock="7 8" paddingInline="8" borderRadius="large">
                        <VStack gap="0">
                            <Heading level="3" size="xsmall" spacing>
                                Slett aktiv deltakelse
                            </Heading>
                            <BodyLong spacing>
                                I noen unntakstilfeller kan en aktiv deltakelse slettes, men det er flere krav for at
                                dette kan gjennomføres.
                            </BodyLong>
                            <div>
                                <Button variant="secondary" size="small" onClick={() => setVisDialog(true)}>
                                    Åpne skjema for sletting
                                </Button>
                            </div>
                        </VStack>
                    </BoxNew>
                </HGrid>
            ) : null}
            {visDialog && (
                <SlettAktivDeltakelseModal
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    onClose={() => setVisDialog(false)}
                />
            )}
        </VStack>
    );
};

export default SlettAktivDeltakelse;
