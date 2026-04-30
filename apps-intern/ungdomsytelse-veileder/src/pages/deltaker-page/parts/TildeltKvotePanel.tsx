import { Bleed, BodyShort, Box, Button, Heading, HStack, InlineMessage, Tag, VStack } from '@navikt/ds-react';
import InfoBox from '../../../atoms/InfoBox';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import { useState } from 'react';
import UtvidKvoteModal from '../../../components/utvid-kvote-modal/UtvidKvoteModal';
import { dateFormatter } from '@navikt/sif-common-utils';
import { deltakelseKvoteErUtløpt, deltakelseKanUtvides } from '../../../utils/deltakelseUtils';

interface DatoBoksProps {
    deltaker: Deltaker;
    deltakelse: Deltakelse;

    variant?: 'liste' | 'panel';

    onDeltakelseChanged: (deltakelse: Deltakelse) => void;
}

const TildeltKvotePanel = ({ variant = 'panel', deltaker, deltakelse, onDeltakelseChanged }: DatoBoksProps) => {
    const [visDialog, setVisDialog] = useState(false);

    const { harUtvidetKvote, kvoteMaksDato, tilOgMed } = deltakelse;
    const antallTildelteDager = harUtvidetKvote ? 300 : 260;
    const kvoteErUtløpt = kvoteMaksDato ? deltakelseKvoteErUtløpt(deltakelse) : false;
    const kanEndreKvote = deltakelseKanUtvides(deltakelse);

    return (
        <>
            {variant === 'liste' ? (
                <Bleed marginBlock="space-1">
                    <VStack gap="space-8" maxWidth="40rem">
                        <BodyShort weight="semibold" size="large">
                            {antallTildelteDager} dager
                        </BodyShort>
                        {tilOgMed ? (
                            <InlineMessage status="info">
                                Deltaker er meldt ut med siste dag{' '}
                                <strong>{dateFormatter.dayCompactDate(tilOgMed)}</strong>.
                            </InlineMessage>
                        ) : (
                            <InlineMessage status="info">
                                {kvoteErUtløpt ? 'Utløp' : 'Utløper'}{' '}
                                <strong>{dateFormatter.dayCompactDate(kvoteMaksDato)}</strong>.
                            </InlineMessage>
                        )}
                        {harUtvidetKvote && <InlineMessage status="info">Har utvidet kvote</InlineMessage>}
                        {kanEndreKvote && (
                            <Box paddingBlock="space-8 space-0">
                                <Button variant="secondary" size="small" onClick={() => setVisDialog(true)}>
                                    Registrert utvidet deltakelse
                                </Button>
                            </Box>
                        )}
                    </VStack>
                </Bleed>
            ) : (
                <InfoBox>
                    <VStack gap="space-12">
                        <HStack gap="space-12">
                            <Heading level="3" size="xsmall">
                                Tildelte dager
                            </Heading>
                        </HStack>
                        <BodyShort size="large" weight="semibold" style={{ fontSize: '1.5rem' }}>
                            {antallTildelteDager} dager
                        </BodyShort>

                        <>
                            {tilOgMed ? (
                                <BodyShort>
                                    Deltaker er meldt ut med siste dag{' '}
                                    <strong>{dateFormatter.dayCompactDate(tilOgMed)}</strong>.
                                </BodyShort>
                            ) : (
                                <BodyShort>
                                    {kvoteErUtløpt ? 'Utløp' : 'Utløper'}{' '}
                                    <strong>{dateFormatter.dayCompactDate(kvoteMaksDato)}</strong>.
                                </BodyShort>
                            )}
                            {harUtvidetKvote && (
                                <div>
                                    <Tag size="small" data-color="warning">
                                        Har utvidet vedtak
                                    </Tag>
                                </div>
                            )}
                            {kanEndreKvote && (
                                <div>
                                    <Button variant="primary" size="small" onClick={() => setVisDialog(true)}>
                                        Registrert utvidet deltakelse
                                    </Button>
                                </div>
                            )}
                        </>
                    </VStack>
                </InfoBox>
            )}
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
