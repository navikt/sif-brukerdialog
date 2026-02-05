import { BodyShort, Heading, List, VStack } from '@navikt/ds-react';
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

<<<<<<< HEAD
                <List>
                    <List.Item>Hvis flere perioder; lage accordion for hver periode</List.Item>
                    <List.Item>En periode kan være lang. Perioder kuttes til innenfor gyldig tidsrom</List.Item>
                    <List.Item>
                        Innenfor én periode: vise alle dager som en har søkt for. Kan være mange eller få dager.
                    </List.Item>
                    <List.Item>Kalender eller liste?</List.Item>
                </List>

                <OmsorgstilbudForm
                    goBack={goBack}
                    søknadsperioder={sak.søknadsperioder}
                    perioderMedTilsynsordning={sak.tilsynsordning.perioderMedTilsynsordning}
                />
=======
                {sak.søknadsperioder.map((periode) => (
                    <div key={periode.from.toDateString()}>{dateRangeFormatter.getDateRangeText(periode, 'nb')}</div>
                ))}
                <OmsorgstilbudForm goBack={goBack} />
>>>>>>> e49837d99043368ebf64b6ae7644c24b806f5606
            </VStack>
        </SøknadStep>
    );
};

export default OmsorgstilbudStep;
// aha
