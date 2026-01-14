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
                                        Slett aktiv deltakelse
                                    </Heading>
                                    <BodyLong spacing>
                                        I noen unntakstilfeller kan en aktiv deltakelse slettes, men det er flere krav
                                        for at dette kan gjennomføres.
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
