import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { dateRangeFormatter } from '@navikt/sif-common-utils';

import { useSøknadContext } from '../../../hooks';
import { useStepConfig } from '../../../hooks/useStepConfig';
import { AppText } from '../../../i18n';
import { StepId } from '../../config/StepId';
import SøknadStep from '../../SøknadStep';
import OmsorgstilbudForm from './OmsorgstilbudForm';

const OmsorgstilbudStep = () => {
    const stepId = StepId.OMSORGSTILBUD;

    const {
        state: { sak },
    } = useSøknadContext();

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
                <Heading level="2" size="small">
                    Perioder
                </Heading>

                {sak.søknadsperioder.map((periode) => (
                    <div key={periode.from.toDateString()}>{dateRangeFormatter.getDateRangeText(periode, 'nb')}</div>
                ))}
                <OmsorgstilbudForm goBack={goBack} />
            </VStack>
        </SøknadStep>
    );
};

export default OmsorgstilbudStep;
