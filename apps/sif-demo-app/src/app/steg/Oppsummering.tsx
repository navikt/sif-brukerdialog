import { Alert, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { SøknadFooter } from '@rammeverk/components';
import { useStegNavigasjon } from '@rammeverk/state';

import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useMellomlagring } from '../hooks/useMellomlagring';
import { useStegStatus } from '../hooks/useStegStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';

export const Oppsummering = () => {
    const stegId = StegId.OPPSUMMERING;
    const appState = useSøknadStore((s) => s.søknadState);
    const resetSøknadsdata = useSøknadStore((s) => s.resetSøknad);
    const setCurrentSteg = useSøknadStore((s) => s.setCurrentSteg);
    const avbrytSøknad = useAvbrytSøknad();
    const { slettMellomlagring } = useMellomlagring();

    const stegStatus = useStegStatus();
    const navigate = useNavigate();

    const { gåTilForrige, kanGåTilForrige } = useStegNavigasjon({
        stegConfig,
        stegRekkefølge,
        stegStatus,
        setCurrentSteg,
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
                            <strong>Navn:</strong> {appState?.søknadsdata[StegId.PERSONALIA]?.navn}
                        </p>
                        <p>
                            <strong>E-post:</strong> {appState?.søknadsdata[StegId.KONTAKT]?.epost}
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
