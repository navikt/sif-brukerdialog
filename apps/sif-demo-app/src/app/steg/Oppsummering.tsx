import { Alert, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { SøknadFooter } from '@rammeverk/components';
import { useStepNavigation } from '@rammeverk/state';

import { SøknadStepId, søknadStepConfig, søknadStepOrder } from '../config/søknadStepConfig';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useMellomlagring } from '../hooks/useMellomlagring';
import { useSøknadStepStatus } from '../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';

export const Oppsummering = () => {
    const stegId = SøknadStepId.OPPSUMMERING;
    const appState = useSøknadStore((s) => s.søknadState);
    const resetSøknadsdata = useSøknadStore((s) => s.resetSøknad);
    const setCurrentSteg = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();
    const { slettMellomlagring } = useMellomlagring();

    const stegStatus = useSøknadStepStatus();
    const navigate = useNavigate();

    const { navigateToPreviousStep: gåTilForrige, canGoPrevious: kanGåTilForrige } = useStepNavigation({
        stepConfig: søknadStepConfig,
        stepOrder: søknadStepOrder,
        stepStatus: stegStatus,
        setCurrentStep: setCurrentSteg,
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
                            <strong>Navn:</strong> {appState?.søknadsdata[SøknadStepId.PERSONALIA]?.navn}
                        </p>
                        <p>
                            <strong>E-post:</strong> {appState?.søknadsdata[SøknadStepId.KONTAKT]?.epost}
                        </p>
                    </VStack>
                </Alert>
                <form onSubmit={handleSubmit}>
                    <HStack gap="space-16" justify={'start'}>
                        {kanGåTilForrige(stegId) && (
                            <Button type="button" variant="secondary" onClick={() => gåTilForrige(stegId)}>
                                Forrige
                            </Button>
                        )}
                        <Button type="submit">Send inn søknad</Button>
                    </HStack>
                </form>
            </VStack>
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </VStack>
    );
};
