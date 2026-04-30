import { Bleed, BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import InfoBox from '../../../atoms/InfoBox';

interface Props {
    tilOgMed: Date;
    variant?: 'liste' | 'panel';
    kanEndreSluttdato: boolean;
    onClickEndreSluttdato: () => void;
}

const EndreSluttdatoPanel = ({ variant, tilOgMed, kanEndreSluttdato, onClickEndreSluttdato }: Props) => {
    if (variant === 'liste') {
        return (
            <Bleed marginBlock="space-1">
                <VStack gap="space-8">
                    <BodyShort weight="semibold" size="large" className="capitalize">
                        {dateFormatter.dayCompactDate(tilOgMed)}
                    </BodyShort>
                    {kanEndreSluttdato ? (
                        <Box paddingBlock="space-8 space-0">
                            <Button variant="secondary" size="small" onClick={onClickEndreSluttdato}>
                                Endre sluttdato
                            </Button>
                        </Box>
                    ) : (
                        <>Sluttdato kan ikke endres</>
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
                        Sluttdato
                    </Heading>
                    <BodyShort size="large" weight="semibold" className="capitalize" style={{ fontSize: '1.5rem' }}>
                        {dateFormatter.dayCompactDate(tilOgMed)}
                    </BodyShort>
                </div>

                <div>
                    {kanEndreSluttdato ? (
                        <Box paddingBlock="space-8 space-0">
                            <Button variant="primary" size="small" onClick={onClickEndreSluttdato}>
                                Endre sluttdato
                            </Button>
                        </Box>
                    ) : (
                        <>Sluttdato kan ikke endres</>
                    )}
                </div>
            </VStack>
        </InfoBox>
    );
};

export default EndreSluttdatoPanel;
