import { Alert, Bleed, BodyShort, VStack } from '@navikt/ds-react';
import { Deltakelse } from '../../../types/Deltakelse';
import { deltakelseKvoteErUtløpt } from '../../../utils/deltakelseUtils';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    deltakelse: Deltakelse;
}
const SluttdatoKanIkkeEndresPanel = ({ deltakelse }: Props) => {
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
};

export default SluttdatoKanIkkeEndresPanel;
