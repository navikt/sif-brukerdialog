import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';

import { useStepConfig } from '../../../hooks/useStepConfig';
import { AppText } from '../../../i18n';
import { StepId } from '../../config/StepId';
import SøknadStep from '../../SøknadStep';
import OmsorgstilbudForm from './OmsorgstilbudForm';

const OmsorgstilbudStep = () => {
    const stepId = StepId.OMSORGSTILBUD;

    const { goBack, stepConfig } = useStepConfig(stepId);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <FormLayout.Guide>
                <Heading level="2" size="xsmall" spacing={true}>
                    <AppText id="omsorgstilbudStep.title" />
                </Heading>
                <BodyShort>
                    <AppText id="omsorgstilbudStep.info.1" />
                </BodyShort>
            </FormLayout.Guide>
            <VStack gap="space-32">
                <OmsorgstilbudForm goBack={goBack} />
            </VStack>
        </SøknadStep>
    );
};

export default OmsorgstilbudStep;
