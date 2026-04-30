import { Alert, Bleed, BodyLong, BodyShort, Box, Button, Heading, InlineMessage, VStack } from '@navikt/ds-react';
import { PencilFillIcon } from '@navikt/aksel-icons';
import { dateFormatter } from '@navikt/sif-common-utils';
import InfoBox from '../../../atoms/InfoBox';

interface DatoBoksProps {
    dato: Date;
    variant?: 'liste' | 'panel';
    kanEndreStartdato: boolean;
    onClickEndreButton: () => void;
}

const EndreStartdatoPanel = ({ dato, variant = 'panel', kanEndreStartdato, onClickEndreButton }: DatoBoksProps) => {
    if (variant === 'liste') {
        return (
            <Bleed marginBlock="space-1">
                <VStack gap="space-8" maxWidth="40rem">
                    <BodyShort weight="semibold" size="large" className="capitalize">
                        {dato ? dateFormatter.dayCompactDate(dato) : '-'}
                    </BodyShort>
                    {kanEndreStartdato ? (
                        <>
                            <InlineMessage status="info">
                                Startdato kan endres innenfor de første X månedene etter opprinnelig startdato.
                            </InlineMessage>
                            <Box paddingBlock="space-8 space-0">
                                <Button
                                    variant="secondary"
                                    size="small"
                                    icon={<PencilFillIcon aria-hidden="true" />}
                                    onClick={onClickEndreButton}>
                                    Endre startdato
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Alert variant="info" inline>
                            Startdato kan ikke endres
                        </Alert>
                    )}
                </VStack>
            </Bleed>
        );
    }
    return (
        <InfoBox>
            <VStack gap="space-12">
                <div>
                    <Heading level="3" size="xsmall" spacing>
                        Startdato
                    </Heading>
                    <BodyShort size="large" weight="semibold" className="capitalize" style={{ fontSize: '1.5rem' }}>
                        {dato ? dateFormatter.dayCompactDate(dato) : '-'}
                    </BodyShort>
                </div>
                {kanEndreStartdato ? (
                    <>
                        <BodyLong>
                            Startdato kan endres innenfor de første X månedene etter opprinnelig startdato.
                        </BodyLong>
                        <Box paddingBlock="space-8 space-0">
                            <Button
                                variant="primary"
                                size="small"
                                icon={<PencilFillIcon aria-hidden="true" />}
                                onClick={onClickEndreButton}>
                                Endre startdato
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Alert variant="info" inline>
                        Startdato kan ikke endres
                    </Alert>
                )}
            </VStack>
        </InfoBox>
    );
};

export default EndreStartdatoPanel;
