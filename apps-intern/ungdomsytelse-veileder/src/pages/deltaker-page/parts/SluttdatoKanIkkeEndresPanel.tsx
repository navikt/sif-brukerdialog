import { Alert, Heading, VStack } from '@navikt/ds-react';
import InfoBox from '../../../atoms/InfoBox';

const SluttdatoKanIkkeEndresPanel = () => (
    <InfoBox>
        <VStack gap="space-12">
            <Heading level="3" size="xsmall" spacing>
                Sluttdato
            </Heading>
            <Alert variant="info" inline>
                Sluttdato kan foreløpig ikke settes.
            </Alert>
        </VStack>
    </InfoBox>
);

export default SluttdatoKanIkkeEndresPanel;
