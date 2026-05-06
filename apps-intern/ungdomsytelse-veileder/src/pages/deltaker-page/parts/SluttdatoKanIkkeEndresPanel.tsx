import { Alert, Heading, VStack } from '@navikt/ds-react';
import InfoBox from '../../../atoms/InfoBox';
import { Deltakelse } from '../../../types/Deltakelse';
import { deltakelseKvoteErUtløpt } from '../../../utils/deltakelseUtils';

interface Props {
    deltakelse: Deltakelse;
}
const SluttdatoKanIkkeEndresPanel = ({ deltakelse }: Props) => {
    return (
        <InfoBox>
            <VStack gap="space-12">
                <Heading level="3" size="xsmall" spacing>
                    Sluttdato
                </Heading>
                {deltakelseKvoteErUtløpt(deltakelse) ? (
                    <Alert variant="info" inline>
                        Deltakelse er avsluttet
                    </Alert>
                ) : (
                    <Alert variant="info" inline>
                        Sluttdato kan foreløpig ikke settes.
                    </Alert>
                )}
            </VStack>
        </InfoBox>
    );
};

export default SluttdatoKanIkkeEndresPanel;
