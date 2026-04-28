import { BodyShort, Button, Heading, HStack, Tag, VStack } from '@navikt/ds-react';
import InfoBox from '../../../atoms/InfoBox';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import { useState } from 'react';
import UtvidTildeltPeriodeModal from '../../../components/utvid-tildelt-periode-modal/UtvidTildeltPeriodeModal';
import { dateFormatter } from '@navikt/sif-common-utils';
import { deltakelseKvoteErUtløpt } from '../../../utils/deltakelseUtils';

interface DatoBoksProps {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    kanEndreKvote: boolean;
    onDeltakelseChanged: (deltakelse: Deltakelse) => void;
}

const TildeltKvotePanel = ({ deltaker, deltakelse, kanEndreKvote, onDeltakelseChanged }: DatoBoksProps) => {
    const [visDialog, setVisDialog] = useState(false);

    const { harUtvidetKvote, maksDeltakelseDato } = deltakelse;
    const antallTildelteDager = harUtvidetKvote ? 300 : 260;
    const kvoteErUtløpt = maksDeltakelseDato ? deltakelseKvoteErUtløpt(deltakelse) : false;

    return (
        <>
            <InfoBox>
                <VStack gap="space-12">
                    <HStack gap="space-12">
                        <Heading level="3" size="xsmall">
                            Tildelte dager
                        </Heading>
                    </HStack>
                    <BodyShort size="large" weight="semibold" style={{ fontSize: '1.5rem' }}>
                        <HStack gap="space-12">{antallTildelteDager} dager</HStack>
                    </BodyShort>
                    <BodyShort>
                        {kvoteErUtløpt ? 'Utløp' : 'Utløper'}{' '}
                        <strong>{dateFormatter.dayCompactDate(maksDeltakelseDato)}</strong>.
                    </BodyShort>
                    {harUtvidetKvote ? (
                        <div>
                            <Tag size="small" data-color="warning">
                                Har utvidet vedtak
                            </Tag>
                        </div>
                    ) : (
                        <>
                            {kanEndreKvote ? (
                                <div>
                                    <Button variant="primary" size="small" onClick={() => setVisDialog(true)}>
                                        Registrert utvidet deltakelse
                                    </Button>
                                </div>
                            ) : null}
                        </>
                    )}
                </VStack>
            </InfoBox>
            {visDialog ? (
                <UtvidTildeltPeriodeModal
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
