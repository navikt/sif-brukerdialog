import { Box, Heading, VStack } from '@navikt/ds-react';
import { stepTitles, SøknadStepId } from '../config/søknadStepConfig';
import { SøknadStepGuard } from './SøknadStepGuard';

interface Props {
    stepId: SøknadStepId;
    children: React.ReactNode;
}

const SøknadStep = ({ stepId, children }: Props) => {
    return (
        <VStack gap="space-24">
            <SøknadStepGuard stepId={stepId} />
            <Heading level="1" size="large">
                {stepTitles[stepId]}
            </Heading>
            <Box>{children}</Box>
        </VStack>
    );
};

export default SøknadStep;
