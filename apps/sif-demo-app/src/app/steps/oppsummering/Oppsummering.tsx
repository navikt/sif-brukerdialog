import { Alert, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { useStepNavigation } from '@rammeverk/state';
import { useNavigate } from 'react-router-dom';

import { StepFooter } from '../../../rammeverk';
import { søknadStepConfig as stepConfig, SøknadStepId } from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../../hooks/useSøknadMellomlagring';
import { useSøknadStore } from '../../hooks/useSøknadStore';

export const Oppsummering = () => {
    const stepId = SøknadStepId.OPPSUMMERING;
    const søknadState = useSøknadStore((s) => s.søknadState);
    const resetSøknadsdata = useSøknadStore((s) => s.resetSøknad);
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const { slettMellomlagring } = useSøknadMellomlagring();
    const avbrytSøknad = useAvbrytSøknad();

    const navigate = useNavigate();

    const { navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig,
        getIncludedSteps: () => useSøknadStore.getState().includedSteps,
        setCurrentStep,
    });

    const handleSubmit = (evt: React.SubmitEvent<HTMLFormElement>) => {
        evt.preventDefault();
        resetSøknadsdata();
        slettMellomlagring().catch(() => {});
        navigate('/kvittering');
    };

    return (
        <VStack gap="space-24">
            <VStack gap="space-16">
                <Heading size="large">Oppsummering</Heading>
                <Alert variant="info">
                    <VStack gap="space-2">
                        <p>
                            <strong>Navn:</strong> {søknadState?.søknadsdata[SøknadStepId.PERSONALIA]?.navn}
                        </p>
                        <p>
                            <strong>E-post:</strong> {søknadState?.søknadsdata[SøknadStepId.KONTAKT]?.epost}
                        </p>
                    </VStack>
                </Alert>
                <form onSubmit={handleSubmit}>
                    <HStack gap="space-16" justify="start">
                        {canGoPrevious(stepId) && (
                            <Button type="button" variant="secondary" onClick={() => navigateToPreviousStep(stepId)}>
                                Forrige
                            </Button>
                        )}
                        <Button type="submit">Send inn søknad</Button>
                    </HStack>
                </form>
            </VStack>
            <StepFooter onAbort={avbrytSøknad} />
        </VStack>
    );
};
