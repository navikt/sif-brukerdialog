import { Bleed, BodyShort, Box, Button, InlineMessage, VStack } from '@navikt/ds-react';
import { PencilFillIcon } from '@navikt/aksel-icons';
import InfoBox from '../../../atoms/InfoBox';

interface Props {
    variant?: 'liste' | 'panel';
    onClickMeldUtButton: () => void;
}

const MeldUtDeltakerPanel = ({ variant, onClickMeldUtButton }: Props) => {
    if (variant === 'liste') {
        return (
            <Bleed marginBlock="space-1">
                <VStack gap="space-8" maxWidth="40rem">
                    <BodyShort size="large" weight="semibold" className="text-2xl">
                        Er deltaker meldt ut av ungdomsprogrammet?
                    </BodyShort>
                    <InlineMessage status="info">
                        Når deltaker er meldt ut av ungdomsprogrammet før alle dagene i programmet er brukt opp, må
                        sluttdatoen registreres her.
                    </InlineMessage>
                    <Box paddingBlock="space-8 space-0">
                        <Button
                            variant="secondary"
                            size="small"
                            icon={<PencilFillIcon aria-hidden="true" />}
                            onClick={onClickMeldUtButton}>
                            Registrer sluttdato
                        </Button>
                    </Box>
                </VStack>
            </Bleed>
        );
    }
    return (
        <InfoBox>
            <VStack gap="space-24">
                <VStack gap="space-8">
                    <BodyShort size="large" weight="semibold" className="text-2xl">
                        Er deltaker meldt ut av ungdomsprogrammet?
                    </BodyShort>
                    <BodyShort>
                        Når deltaker er meldt ut av ungdomsprogrammet før alle dagene i programmet er brukt opp, må
                        sluttdatoen registreres her.
                    </BodyShort>
                </VStack>
                <div>
                    <Button
                        variant="primary"
                        size="small"
                        icon={<PencilFillIcon aria-hidden="true" />}
                        onClick={onClickMeldUtButton}>
                        Registrer sluttdato
                    </Button>
                </div>
            </VStack>
        </InfoBox>
    );
};

export default MeldUtDeltakerPanel;
