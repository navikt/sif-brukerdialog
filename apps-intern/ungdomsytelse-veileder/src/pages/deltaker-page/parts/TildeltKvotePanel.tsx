import { Alert, BodyShort, Button, Heading, HStack, Tag, VStack } from '@navikt/ds-react';
import InfoBox from '../../../atoms/InfoBox';
import { Deltakelse } from '../../../types/Deltakelse';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { Deltaker } from '../../../types/Deltaker';
import { useState } from 'react';
import UtvidTildeltPeriodeModal from '../../../components/utvid-tildelt-periode-modal/UtvidTildeltPeriodeModal';

interface DatoBoksProps {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    kanEndreKvote: boolean;
    onClickEndreButton: () => void;
}

const TildeltKvotePanel = ({ deltaker, deltakelse, kanEndreKvote }: DatoBoksProps) => {
    const [visDialog, setVisDialog] = useState(false);

    const handleOnDeltakelseChanged = () => {
        console.log('changed');
        setVisDialog(false);
    };

    const { harUtvidetKvote } = deltakelse;
    const antallTildelteDager = harUtvidetKvote ? 300 : 360;
    const sisteKvoteDato = dateFormatter.dayCompactDate(
        dayjs(deltakelse.fraOgMed).add(antallTildelteDager, 'days').toDate(),
    );

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
                        Utløper <strong>{sisteKvoteDato}</strong>.
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
                            ) : (
                                <Alert variant="info" inline>
                                    Deltakelse kan ikke utvides
                                </Alert>
                            )}
                        </>
                    )}
                </VStack>
            </InfoBox>
            {visDialog ? (
                <UtvidTildeltPeriodeModal
                    onClose={() => setVisDialog(false)}
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    onDeltakelseChanged={handleOnDeltakelseChanged}
                />
            ) : null}
        </>
    );
};

export default TildeltKvotePanel;
