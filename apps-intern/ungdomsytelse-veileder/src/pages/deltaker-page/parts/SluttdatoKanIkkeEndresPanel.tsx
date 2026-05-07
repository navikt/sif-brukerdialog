import { Alert, Bleed, BodyShort, Heading, VStack } from '@navikt/ds-react';
import InfoBox from '../../../atoms/InfoBox';
import { Deltakelse } from '../../../types/Deltakelse';
import { deltakelseKvoteErUtløpt } from '../../../utils/deltakelseUtils';

interface Props {
    deltakelse: Deltakelse;
    variant?: 'liste' | 'panel';
}
const SluttdatoKanIkkeEndresPanel = ({ deltakelse, variant }: Props) => {
    if (variant === 'liste') {
        return (
            <Bleed marginBlock="space-1">
                <VStack gap="space-8">
                    <BodyShort weight="semibold" size="large" className="capitalize">
                        Sluttdato
                    </BodyShort>
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
            </Bleed>
        );
    }

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
