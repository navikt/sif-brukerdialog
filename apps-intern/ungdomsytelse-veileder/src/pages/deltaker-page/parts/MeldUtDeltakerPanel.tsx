import { BodyShort, Button, VStack } from '@navikt/ds-react';
import { PencilFillIcon } from '@navikt/aksel-icons';
import InfoBox from '../../../atoms/InfoBox';

interface Props {
    onClickMeldUtButton: () => void;
}

const MeldUtDeltakerPanel = ({ onClickMeldUtButton }: Props) => (
    <InfoBox>
        <VStack gap="6">
            <VStack gap="2">
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
                    variant="secondary"
                    size="small"
                    icon={<PencilFillIcon aria-hidden="true" />}
                    onClick={onClickMeldUtButton}>
                    Registrer sluttdato
                </Button>
            </div>
        </VStack>
    </InfoBox>
);

export default MeldUtDeltakerPanel;
