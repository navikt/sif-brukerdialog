import { Alert, Bleed, BodyShort, Heading, VStack } from '@navikt/ds-react';
import InfoBox from '../../../atoms/InfoBox';
import { Deltakelse } from '../../../types/Deltakelse';
import { deltakelseKvoteErUtløpt } from '../../../utils/deltakelseUtils';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    deltakelse: Deltakelse;
    variant?: 'liste' | 'panel';
}
const SluttdatoKanIkkeEndresPanel = ({ deltakelse, variant }: Props) => {
    if (variant === 'liste') {
        return (
            <Bleed marginBlock="space-1">
                {deltakelseKvoteErUtløpt(deltakelse) ? (
                    <VStack gap="space-8">
                        <BodyShort weight="semibold" size="large" className="capitalize">
                            {dateFormatter.dayCompactDate(deltakelse.kvoteMaksDato)}
                        </BodyShort>
                        <Alert variant="info" inline>
                            Deltakelse er avsluttet.
                        </Alert>
                    </VStack>
                ) : (
                    <Alert variant="info" inline>
                        Sluttdato kan foreløpig ikke settes.
                    </Alert>
                )}
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
