import { Alert, BodyShort, VStack } from '@navikt/ds-react';
import InfoBox from '../../../atoms/InfoBox';

const SluttdatoKanIkkeEndresPanel = () => (
    <InfoBox>
        <VStack gap="6">
            <VStack gap="2">
                <BodyShort size="large" weight="semibold" className="text-2xl">
                    Sluttdato:
                </BodyShort>
                <BodyShort size="large" weight="semibold" className="text-2xl capitalize">
                    -
                </BodyShort>
                <Alert variant="info" inline>
                    Sluttdato kan ikke foreløpig ikke settes.
                </Alert>
            </VStack>
        </VStack>
    </InfoBox>
);

export default SluttdatoKanIkkeEndresPanel;
